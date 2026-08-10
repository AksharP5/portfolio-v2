import PropTypes from "prop-types";
import workbench from "../../../assets/images/workbench.webp";
import { experience, profile, projects, skills } from "../../../data";
import { Period, ProjectLink, PrototypeTools } from "../content";

export default function Volt({ colorMode, onToggleColorMode }) {
  return (
    <article className="prototype-page volt-prototype">
      <header className="volt-hero">
        <div className="prototype-topline">
          <span>Portfolio</span>
          <PrototypeTools colorMode={colorMode} onToggleColorMode={onToggleColorMode} />
        </div>
        <div className="volt-hero-grid">
          <div>
            <h1>{profile.name}</h1>
            <p className="volt-role">{profile.roles.join(" / ")}</p>
            <p>{profile.intro}</p>
          </div>
          <img
            src={workbench}
            alt="A basketball, notebook, laptop, and headphones on a desk"
          />
        </div>
      </header>

      <main>
        <section className="volt-section" aria-labelledby="volt-projects">
          <h2 id="volt-projects">Projects</h2>
          <div className="volt-project-grid">
            {projects.map((project) => (
              <ProjectLink className="volt-project" key={project.id} project={project}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="prototype-meta">{project.stack.join(" / ")}</span>
              </ProjectLink>
            ))}
          </div>
        </section>

        <section className="volt-section" aria-labelledby="volt-experience">
          <h2 id="volt-experience">Experience</h2>
          <div className="volt-experience">
            {experience.map((item) => (
              <article key={`${item.role}-${item.company}`}>
                <h3>{item.role}</h3>
                <p>{item.company}</p>
                <span className="prototype-meta"><Period>{item.period}</Period></span>
              </article>
            ))}
          </div>
        </section>

        <section className="volt-section volt-skills" aria-labelledby="volt-skills">
          <h2 id="volt-skills">Skills</h2>
          <p>{skills.join(" / ")}</p>
        </section>
      </main>
    </article>
  );
}

Volt.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleColorMode: PropTypes.func.isRequired,
};
