import PropTypes from "prop-types";
import {
  FaMoon,
  FaSun,
  FaVolumeHigh,
  FaVolumeXmark,
} from "react-icons/fa6";
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

export function SoundToggle({ enabled, onToggle }) {
  const Icon = enabled ? FaVolumeHigh : FaVolumeXmark;
  const label = enabled ? "Mute click sounds" : "Enable click sounds";

  return (
    <button
      className="prototype-sound-toggle"
      type="button"
      aria-label={label}
      aria-pressed={enabled}
      title={label}
      onClick={onToggle}
    >
      <Icon aria-hidden="true" />
    </button>
  );
}

SoundToggle.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export function PrototypeTools({
  colorMode,
  onToggleColorMode,
  onToggleSound,
  soundEnabled,
}) {
  return (
    <div className="prototype-tools">
      <ViewCount className="prototype-view-count" />
      <SoundToggle enabled={soundEnabled} onToggle={onToggleSound} />
      <ThemeToggle colorMode={colorMode} onToggle={onToggleColorMode} />
    </div>
  );
}

PrototypeTools.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleColorMode: PropTypes.func.isRequired,
  onToggleSound: PropTypes.func.isRequired,
  soundEnabled: PropTypes.bool.isRequired,
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
