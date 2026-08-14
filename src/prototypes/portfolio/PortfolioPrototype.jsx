import PropTypes from "prop-types";
import { useState } from "react";
import { FaArrowRightLong, FaArrowUpRightFromSquare } from "react-icons/fa6";
import aemIcon from "../../assets/skills/aem-design.png";
import dockerIcon from "../../assets/skills/docker.png";
import flaskIcon from "../../assets/skills/flask.png";
import gitIcon from "../../assets/skills/git.png";
import goIcon from "../../assets/skills/gopher-shirt.png";
import htmlIcon from "../../assets/skills/htmlcss.png";
import javaIcon from "../../assets/skills/java.png";
import jsIcon from "../../assets/skills/js.png";
import pythonIcon from "../../assets/skills/py.png";
import rabbitIcon from "../../assets/skills/rabbitmq-logo.png";
import sqlIcon from "../../assets/skills/sql.png";
import tsIcon from "../../assets/skills/tslogo.png";
import { profile, projects } from "../../data";
import { ProjectLink, PrototypeTools } from "./content";
import ExperienceExplorer from "./experience/ExperienceExplorer";

const skillIcons = [
  ["Python", pythonIcon],
  ["Java", javaIcon],
  ["JavaScript", jsIcon],
  ["TypeScript", tsIcon],
  ["Go", goIcon],
  ["HTML / CSS", htmlIcon],
  ["Docker", dockerIcon],
  ["Flask", flaskIcon],
  ["RabbitMQ", rabbitIcon],
  ["SQL", sqlIcon],
  ["Git", gitIcon],
  ["AEM", aemIcon],
];

function SectionTitle({ children, id }) {
  return <h2 className="section-title" id={id}>{children}</h2>;
}

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default function PortfolioPrototype({
  colorMode,
  onReplayOpening,
  onToggleColorMode,
  onToggleSound,
  soundEnabled,
}) {
  const [projectPreview, setProjectPreview] = useState(null);
  const activeProjectId = projectPreview?.id;
  const activeProject = projects.find((project) => project.id === activeProjectId);

  const showProjectPreview = (id, element) => {
    const rect = element.getBoundingClientRect();
    const viewportPadding = 16;
    const gap = 14;
    const availableWidth = window.innerWidth - rect.right - gap - viewportPadding;
    const width = Math.max(220, Math.min(320, availableWidth));
    const height = width * 0.6 + 24;
    const maxTop = Math.max(viewportPadding, window.innerHeight - height - viewportPadding);

    setProjectPreview({
      animatePosition: projectPreview !== null,
      id,
      left: rect.right + gap,
      top: Math.min(Math.max(viewportPadding, rect.top), maxTop),
      width,
    });
  };

  return (
    <div className="prototype-shell">
      <main id="home" className="prototype-page">
        <header className="profile-intro">
          <div className="profile-heading">
            <h1>{profile.name}</h1>
            <PrototypeTools
              colorMode={colorMode}
              onToggleColorMode={onToggleColorMode}
              onToggleSound={onToggleSound}
              soundEnabled={soundEnabled}
            />
          </div>
        </header>

        <ExperienceExplorer
          onReplayOpening={onReplayOpening}
          soundEnabled={soundEnabled}
        />

        <section id="projects" className="prototype-section" aria-labelledby="projects-title">
          <SectionTitle id="projects-title">My Projects</SectionTitle>
          <div className="project-browser">
            <ol
              className="project-list"
              onPointerLeave={() => setProjectPreview(null)}
            >
              {projects.map((project) => (
                <li
                  data-active={project.id === activeProjectId ? "true" : "false"}
                  key={project.id}
                >
                  <ProjectLink
                    className="project-row"
                    project={project}
                    onBlur={() => setProjectPreview(null)}
                    onFocus={(event) => showProjectPreview(project.id, event.currentTarget)}
                    onPointerEnter={(event) => showProjectPreview(project.id, event.currentTarget)}
                  >
                    <div className="project-row-copy">
                      <div className="project-title-row">
                        <h3>{project.title}</h3>
                        <span>{project.stack.slice(0, 2).join(" / ")}</span>
                      </div>
                      <p>{project.description}</p>
                    </div>
                    <FaArrowUpRightFromSquare aria-hidden="true" />
                  </ProjectLink>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="skills" className="prototype-section" aria-labelledby="skills-title">
          <SectionTitle id="skills-title">My Skills</SectionTitle>
          <div className="skill-grid">
            {skillIcons.map(([name, icon]) => (
              <div className="skill-item" key={name}>
                <img src={icon} alt="" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </section>

        <aside className="contact-invite" aria-label="Contact">
          <div>
            <strong>Have something in mind?</strong>
            <span>I&apos;m always open to a good conversation.</span>
          </div>
          <a className="contact-cta" href="/prototypes/contact/">
            <span>Let&apos;s talk</span>
            <span className="contact-cta-arrow">
              <FaArrowRightLong aria-hidden="true" />
            </span>
          </a>
        </aside>
      </main>

      <div
        className="project-preview-positioner"
        data-moving={projectPreview?.animatePosition ? "true" : undefined}
        style={projectPreview ? {
          left: projectPreview.left,
          transform: `translate3d(0, ${projectPreview.top}px, 0)`,
          width: projectPreview.width,
        } : undefined}
        aria-hidden="true"
      >
        <figure
          className="project-preview"
          data-visible={activeProject ? "true" : "false"}
        >
          <div className="project-preview-frame">
            {projects.map((project, index) => (
              <img
                className={project.id === activeProjectId ? "is-active" : undefined}
                src={`/projects/${project.id}.webp`}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
                key={project.id}
              />
            ))}
          </div>
          <figcaption>
            <span>{activeProject?.title ?? ""}</span>
            <span>{activeProject ? "Read project" : ""}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

PortfolioPrototype.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]).isRequired,
  onReplayOpening: PropTypes.func.isRequired,
  onToggleColorMode: PropTypes.func.isRequired,
  onToggleSound: PropTypes.func.isRequired,
  soundEnabled: PropTypes.bool.isRequired,
};
