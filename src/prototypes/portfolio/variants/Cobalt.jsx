import PropTypes from "prop-types";
import workbench from "../../../assets/images/workbench.webp";
import { experience, profile, projects, skills } from "../../../data";
import { Period, ProjectLink, PrototypeTools } from "../content";

export default function Cobalt({ colorMode, onToggleColorMode }) {
  return (
    <article className="prototype-page cobalt-prototype">
      <header className="cobalt-hero">
        <div className="prototype-topline">
          <span>{profile.roles.join(" / ")}</span>
          <PrototypeTools colorMode={colorMode} onToggleColorMode={onToggleColorMode} />
        </div>

        <div className="cobalt-intro">
          <h1>{profile.name}</h1>
          <p>{profile.intro}</p>
        </div>

        <img
          className="cobalt-workbench"
          src={workbench}
          alt="A basketball, notebook, laptop, and headphones on a desk"
        />
      </header>

      <main>
        <section className="cobalt-section" aria-labelledby="cobalt-projects">
          <h2 id="cobalt-projects">Selected work</h2>
          <div className="cobalt-project-list">
            {projects.map((project) => (
              <ProjectLink className="cobalt-project" key={project.id} project={project}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="prototype-meta">{project.stack.join(" / ")}</span>
              </ProjectLink>
            ))}
          </div>
        </section>

        <section className="cobalt-section" aria-labelledby="cobalt-experience">
          <h2 id="cobalt-experience">Experience</h2>
          <div className="cobalt-experience">
            {experience.map((item) => (
              <article key={`${item.role}-${item.company}`}>
                <h3>{item.role}</h3>
                <p>{item.company}</p>
                <span className="prototype-meta"><Period>{item.period}</Period></span>
              </article>
            ))}
          </div>
        </section>

        <section className="cobalt-section cobalt-skills" aria-labelledby="cobalt-skills">
          <h2 id="cobalt-skills">Skills</h2>
          <p>{skills.join(" / ")}</p>
        </section>
      </main>
    </article>
  );
}

Cobalt.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleColorMode: PropTypes.func.isRequired,
};
