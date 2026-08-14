import PropTypes from "prop-types";
import { FaArrowLeft, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { ThemeToggle } from "./content";

export default function ProjectPage({ colorMode, onToggleColorMode, project }) {
  return (
    <div className="project-page">
      <header className="contact-navigation">
        <a className="contact-back" href="/prototypes/#projects">
          <FaArrowLeft aria-hidden="true" />
          <span>Projects</span>
        </a>
        <div className="contact-navigation-title">
          <strong>Akshar</strong>
          <span>Project</span>
        </div>
        <ThemeToggle colorMode={colorMode} onToggle={onToggleColorMode} />
      </header>

      <main className="project-detail-shell">
        <header className="project-detail-hero">
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <div className="project-detail-meta">
            <span>{project.role}</span>
            <span>{project.stack.join(" / ")}</span>
          </div>
        </header>

        <img
          className="project-detail-image"
          src={`/projects/${project.id}.webp`}
          alt={`${project.title} project preview`}
        />

        <section className="project-detail-section" aria-labelledby="contributions-title">
          <h2 id="contributions-title">What I did</h2>
          <ul>
            {project.contributions.map((contribution) => (
              <li key={contribution}>{contribution}</li>
            ))}
          </ul>
        </section>

        <nav className="project-detail-links" aria-label="Project links">
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noreferrer">
              <span>View live project</span>
              <FaArrowUpRightFromSquare aria-hidden="true" />
            </a>
          ) : null}
          <a href={project.source} target="_blank" rel="noreferrer">
            <span>View source</span>
            <FaArrowUpRightFromSquare aria-hidden="true" />
          </a>
        </nav>
      </main>
    </div>
  );
}

ProjectPage.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleColorMode: PropTypes.func.isRequired,
  project: PropTypes.shape({
    contributions: PropTypes.arrayOf(PropTypes.string).isRequired,
    demo: PropTypes.string,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    stack: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
