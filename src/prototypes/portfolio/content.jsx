import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  FaArrowUpRightFromSquare,
  FaMoon,
  FaRegEye,
  FaSun,
} from "react-icons/fa6";
import { profile } from "../../data";

const viewCountFormatter = new Intl.NumberFormat("en-US");
let viewCountRequest;

function loadViewCount() {
  if (viewCountRequest) return viewCountRequest;

  viewCountRequest = fetch("/api/views", {
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
      viewCountRequest = undefined;
      throw error;
    });

  return viewCountRequest;
}

export function ViewCount() {
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
    ? `${viewCountFormatter.format(views)} lifetime views`
    : views === undefined
      ? "Loading lifetime views"
      : "View count unavailable";

  return (
    <span
      className="prototype-view-count"
      role="status"
      aria-live="polite"
      aria-label={label}
      title={label}
    >
      <FaRegEye aria-hidden="true" />
      <span className="prototype-view-count-number" aria-hidden="true">
        {available ? viewCountFormatter.format(views) : views === undefined ? "..." : "--"}
      </span>
    </span>
  );
}

export function ThemeToggle({ colorMode, onToggle }) {
  const nextMode = colorMode === "dark" ? "light" : "dark";
  const Icon = colorMode === "dark" ? FaSun : FaMoon;

  return (
    <button
      className="prototype-theme-toggle"
      type="button"
      aria-label={`Switch to ${nextMode} mode`}
      title={`Switch to ${nextMode} mode`}
      onClick={onToggle}
    >
      <Icon aria-hidden="true" />
    </button>
  );
}

ThemeToggle.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export function PortfolioIdentity({ colorMode, onToggleColorMode }) {
  return (
    <div className="prototype-identity">
      <div>
        <h1 className="prototype-signature">{profile.name}</h1>
        <p className="prototype-role">{profile.roles.join(" / ")}</p>
      </div>
      <div className="prototype-identity-tools">
        <ViewCount />
        <ThemeToggle colorMode={colorMode} onToggle={onToggleColorMode} />
      </div>
    </div>
  );
}

PortfolioIdentity.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleColorMode: PropTypes.func.isRequired,
};

export function ProjectLink({ children, className, project }) {
  const href = project.detail ?? project.demo ?? project.source;
  const destination = project.detail
    ? "Project notes"
    : project.demo
      ? "Live project"
      : "Source code";
  const isExternal = href.startsWith("http");

  return (
    <a
      className={`project-link ${className}`}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      aria-label={`${project.title}: ${destination}`}
    >
      <div className="project-link-content">{children}</div>
      <span className="project-link-destination">
        {destination}
        <FaArrowUpRightFromSquare aria-hidden="true" />
      </span>
    </a>
  );
}

ProjectLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  project: PropTypes.shape({
    detail: PropTypes.string,
    demo: PropTypes.string,
    source: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export function Period({ children }) {
  return String(children).replaceAll("—", "-").replaceAll("–", "-");
}

Period.propTypes = {
  children: PropTypes.node.isRequired,
};
