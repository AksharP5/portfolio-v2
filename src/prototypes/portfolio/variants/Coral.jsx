import PropTypes from "prop-types";
import portrait from "../../../assets/images/logo-portrait.webp";
import workbench from "../../../assets/images/workbench.webp";
import { experience, profile, projects, skills } from "../../../data";
import { Period, ProjectLink, PrototypeTools } from "../content";

export default function Coral({ colorMode, onToggleColorMode }) {
  return (
    <article className="prototype-page terminal-prototype">
      <header className="terminal-hero">
        <div className="prototype-topline">
          <span>akshar.dev</span>
          <PrototypeTools colorMode={colorMode} onToggleColorMode={onToggleColorMode} />
        </div>

        <div className="terminal-intro">
          <img src={portrait} alt="Illustrated portrait of Akshar" />
          <div>
            <h1>{profile.name}</h1>
            <p>{profile.intro}</p>
          </div>
        </div>

        <img
          className="terminal-workbench"
          src={workbench}
          alt="A basketball, notebook, laptop, and headphones on a desk"
        />
      </header>

      <main>
        <section className="terminal-section" aria-labelledby="terminal-projects">
          <h2 id="terminal-projects">$ projects</h2>
          <div className="terminal-project-list">
            {projects.map((project) => (
              <ProjectLink className="terminal-project" key={project.id} project={project}>
                <div>
                  <h3>{project.title}</h3>
                  <span className="prototype-meta">{project.stack.join(" / ")}</span>
                </div>
                <p>{project.description}</p>
              </ProjectLink>
            ))}
          </div>
        </section>

        <section className="terminal-section" aria-labelledby="terminal-experience">
          <h2 id="terminal-experience">$ experience</h2>
          <div className="terminal-experience">
            {experience.map((item) => (
              <article key={`${item.role}-${item.company}`}>
                <span className="prototype-meta"><Period>{item.period}</Period></span>
                <p><strong>{item.role}</strong><br />{item.company}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="terminal-section terminal-skills" aria-labelledby="terminal-skills">
          <h2 id="terminal-skills">$ skills</h2>
          <p>{skills.join(" / ")}</p>
        </section>
      </main>
    </article>
  );
}

Coral.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleColorMode: PropTypes.func.isRequired,
};
