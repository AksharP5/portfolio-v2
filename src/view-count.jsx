import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaRegEye } from "react-icons/fa6";
import "./view-count.css";

const formatter = new Intl.NumberFormat("en-US");
let request;

function loadViewCount() {
  if (request) return request;

  request = fetch("/api/views", {
    method: "POST",
    credentials: "same-origin",
    cache: "no-store",
  })
    .then(async (response) => {
      if (!response.ok) throw new Error("View count request failed");

      const data = await response.json();
      if (!Number.isSafeInteger(data.views) || data.views < 0) {
        throw new Error("View count response was invalid");
      }

      return data.views;
    })
    .catch((error) => {
      request = undefined;
      throw error;
    });

  return request;
}

export function ViewCount({ className = "" }) {
  const [views, setViews] = useState();

  useEffect(() => {
    let active = true;

    loadViewCount()
      .then((count) => {
        if (active) setViews(count);
      })
      .catch(() => {
        if (active) setViews(null);
      });

    return () => { active = false; };
  }, []);

  const available = Number.isSafeInteger(views);
  const label = available
    ? `${formatter.format(views)} views`
    : views === undefined
      ? "Loading views"
      : "View count unavailable";

  return (
    <span
      className={`view-count ${className}`.trim()}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <FaRegEye aria-hidden="true" />
      <span className="view-count-number" aria-hidden="true">
        {available ? formatter.format(views) : views === undefined ? "..." : "--"}
      </span>
    </span>
  );
}

ViewCount.propTypes = {
  className: PropTypes.string,
};
