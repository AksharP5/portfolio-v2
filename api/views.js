const VIEW_COUNT_KEY = "portfolio:views:lifetime";
const COUNTED_COOKIE = "portfolio-view-counted";

function json(data, init = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(data), { ...init, headers });
}

function hasCountedCookie(request) {
  return request.headers
    .get("cookie")
    ?.split(";")
    .some((cookie) => cookie.trim().startsWith(`${COUNTED_COOKIE}=`));
}

async function runRedisCommand(command) {
  const redisUrl = (
    process.env.UPSTASH_REDIS_REST_KV_REST_API_URL
    ?? process.env.UPSTASH_REDIS_REST_URL
  )?.replace(/\/$/, "");
  const redisToken = process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN
    ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    throw new Error("View counter storage is not configured");
  }

  const response = await fetch(redisUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error("View counter storage request failed");
  }

  const views = Number(data.result ?? 0);
  if (!Number.isSafeInteger(views) || views < 0) {
    throw new Error("View counter storage returned an invalid value");
  }

  return views;
}

export default {
  async fetch(request) {
    if (request.method !== "GET" && request.method !== "POST") {
      return json(
        { error: "Method not allowed" },
        { status: 405, headers: { Allow: "GET, POST" } },
      );
    }

    const shouldIncrement = request.method === "POST" && !hasCountedCookie(request);

    try {
      const views = await runRedisCommand([
        shouldIncrement ? "INCR" : "GET",
        VIEW_COUNT_KEY,
      ]);
      const headers = new Headers();

      if (shouldIncrement) {
        const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
        headers.set(
          "Set-Cookie",
          `${COUNTED_COOKIE}=1; Path=/; HttpOnly; SameSite=Lax${secure}`,
        );
      }

      return json({ views }, { headers });
    } catch (error) {
      console.error("View counter failed", error);
      return json({ error: "View count unavailable" }, { status: 503 });
    }
  },
};
