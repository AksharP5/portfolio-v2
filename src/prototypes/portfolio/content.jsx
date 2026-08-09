import PropTypes from "prop-types";
import {
  FaArrowUpRightFromSquare,
  FaMoon,
  FaSun,
} from "react-icons/fa6";
import { profile } from "../../data";
import { ViewCount } from "../../view-count";

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
        <ViewCount className="prototype-view-count" />
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
