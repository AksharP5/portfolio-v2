import PropTypes from "prop-types";
import { profile } from "../../data";
import aemLogo from "../../assets/skills/aem-design.png";
import dockerLogo from "../../assets/skills/docker.png";
import flaskLogo from "../../assets/skills/flask.png";
import gitLogo from "../../assets/skills/git.png";
import goLogo from "../../assets/skills/gopher-shirt.png";
import htmlCssLogo from "../../assets/skills/htmlcss.png";
import javaLogo from "../../assets/skills/java.png";
import javascriptLogo from "../../assets/skills/js.png";
import pythonLogo from "../../assets/skills/py.png";
import rabbitMqLogo from "../../assets/skills/rabbitmq-logo.png";
import sqlLogo from "../../assets/skills/sql.png";
import typescriptLogo from "../../assets/skills/tslogo.png";

const skillArtwork = [
  { name: "Python", src: pythonLogo },
  { name: "Java", src: javaLogo },
  { name: "JavaScript", src: javascriptLogo },
  { name: "TypeScript", src: typescriptLogo },
  { name: "Go", src: goLogo },
  { name: "HTML/CSS", src: htmlCssLogo },
  { name: "Docker", src: dockerLogo },
  { name: "Flask", src: flaskLogo },
  { name: "RabbitMQ", src: rabbitMqLogo },
  { name: "SQL", src: sqlLogo },
  { name: "Git", src: gitLogo },
  { name: "Adobe Experience Manager", src: aemLogo },
];

export function ProjectLinks({ project }) {
  return (
    <span className="proto-project-links">
      <a href={project.source} target="_blank" rel="noreferrer">Source</a>
      {project.demo ? <a href={project.demo} target="_blank" rel="noreferrer">Demo</a> : null}
    </span>
  );
}

ProjectLinks.propTypes = {
  project: PropTypes.shape({
    demo: PropTypes.string,
    source: PropTypes.string.isRequired,
  }).isRequired,
};

export function SocialTextLinks({ bracketed = false }) {
  const items = [
    ["GitHub", profile.github],
    ["LinkedIn", profile.linkedin],
    ["X", profile.x],
  ];

  return (
    <nav className="proto-social-links" aria-label="Social profiles">
      {items.map(([label, href]) => (
        <a key={label} href={href} target="_blank" rel="noreferrer">
          {bracketed ? `[${label.toLowerCase()}]` : label}
        </a>
      ))}
    </nav>
  );
}

SocialTextLinks.propTypes = {
  bracketed: PropTypes.bool,
};

export function SkillArtwork({ compact = false }) {
  return (
    <div className="proto-skill-artwork" data-compact={compact ? "" : undefined}>
      {skillArtwork.map((skill) => (
        <figure key={skill.name}>
          <img src={skill.src} alt="" loading="lazy" />
          <figcaption>{skill.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

SkillArtwork.propTypes = {
  compact: PropTypes.bool,
};

export function Period({ children }) {
  return String(children).replaceAll("—", "-").replaceAll("–", "-");
}

Period.propTypes = {
  children: PropTypes.node.isRequired,
};
