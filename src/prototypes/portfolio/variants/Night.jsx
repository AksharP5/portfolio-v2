import PropTypes from "prop-types";
import workbench from "../../../assets/images/workbench.webp";
import { experience, profile, projects, skills } from "../../../data";
import { Period, ProjectLink, PrototypeTools } from "../content";

export default function Night({ colorMode, onToggleColorMode }) {
  return (
    <article className="prototype-page gallery-prototype">
      <header className="gallery-hero">
        <div className="prototype-topline">
          <span>{profile.roles.join(" / ")}</span>
          <PrototypeTools colorMode={colorMode} onToggleColorMode={onToggleColorMode} />
        </div>
        <div className="gallery-intro">
          <h1>{profile.name}</h1>
          <p>{profile.intro}</p>
        </div>
        <img
          src={workbench}
          alt="A basketball, notebook, laptop, and headphones on a desk"
        />
      </header>

      <main>
        <section className="gallery-section" aria-labelledby="gallery-projects">
          <h2 id="gallery-projects">Work</h2>
          <div className="gallery-project-list">
            {projects.map((project) => (
              <ProjectLink className="gallery-project" key={project.id} project={project}>
                <h3>{project.title}</h3>
                <div>
                  <p>{project.description}</p>
                  <span className="prototype-meta">{project.stack.join(" / ")}</span>
                </div>
              </ProjectLink>
            ))}
          </div>
        </section>

        <section className="gallery-section" aria-labelledby="gallery-experience">
          <h2 id="gallery-experience">Experience</h2>
          <div className="gallery-experience">
            {experience.map((item) => (
              <article key={`${item.role}-${item.company}`}>
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                </div>
                <span className="prototype-meta"><Period>{item.period}</Period></span>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery-section gallery-skills" aria-labelledby="gallery-skills">
          <h2 id="gallery-skills">Skills</h2>
          <p>{skills.join(" / ")}</p>
        </section>
      </main>
    </article>
  );
}

Night.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleColorMode: PropTypes.func.isRequired,
};
