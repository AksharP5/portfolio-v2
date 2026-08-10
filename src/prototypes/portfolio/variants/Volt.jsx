import PropTypes from "prop-types";
import portrait from "../../../assets/images/logo-portrait.webp";
import workbench from "../../../assets/images/workbench.webp";
import { experience, profile, projects, skills } from "../../../data";
import { Period, ProjectLink, PrototypeTools } from "../content";

export default function Volt({ colorMode, onToggleColorMode }) {
  return (
    <article className="prototype-page resume-prototype">
      <header className="resume-hero">
        <div className="prototype-topline">
          <span>{profile.roles.join(" / ")}</span>
          <PrototypeTools colorMode={colorMode} onToggleColorMode={onToggleColorMode} />
        </div>

        <div className="resume-identity">
          <div>
            <h1>{profile.name}</h1>
            <p>{profile.intro}</p>
          </div>
          <img src={portrait} alt="Illustrated portrait of Akshar" />
        </div>
      </header>

      <main>
        <section className="resume-section" aria-labelledby="resume-projects">
          <h2 id="resume-projects">Projects</h2>
          <div className="resume-project-list">
            {projects.map((project) => (
              <ProjectLink className="resume-project" key={project.id} project={project}>
                <div>
                  <h3>{project.title}</h3>
                  <span className="prototype-meta">{project.stack.join(" / ")}</span>
                </div>
                <p>{project.description}</p>
              </ProjectLink>
            ))}
          </div>
        </section>

        <section className="resume-section" aria-labelledby="resume-experience">
          <h2 id="resume-experience">Experience</h2>
          <div className="resume-experience">
            {experience.map((item) => (
              <article key={`${item.role}-${item.company}`}>
                <span className="prototype-meta"><Period>{item.period}</Period></span>
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section resume-skills" aria-labelledby="resume-skills">
          <h2 id="resume-skills">Skills</h2>
          <p>{skills.join(" / ")}</p>
        </section>

        <img
          className="resume-workbench"
          src={workbench}
          alt="A basketball, notebook, laptop, and headphones on a desk"
        />
      </main>
    </article>
  );
}

Volt.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleColorMode: PropTypes.func.isRequired,
};
