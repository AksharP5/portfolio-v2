import PropTypes from "prop-types";
import workbench from "../../../assets/images/workbench.webp";
import { experience, profile, projects, skills } from "../../../data";
import { Period, ProjectLink, PrototypeTools } from "../content";

export default function Aqua({ colorMode, onToggleColorMode }) {
  const featured = projects.slice(0, 2);
  const index = projects.slice(2);

  return (
    <article className="prototype-page aqua-prototype">
      <header className="aqua-hero">
        <div className="prototype-topline">
          <span>{profile.roles.join(" / ")}</span>
          <PrototypeTools colorMode={colorMode} onToggleColorMode={onToggleColorMode} />
        </div>
        <h1>{profile.name}</h1>
        <p>{profile.intro}</p>
        <img
          src={workbench}
          alt="A basketball, notebook, laptop, and headphones on a desk"
        />
      </header>

      <main>
        <section className="aqua-section" aria-labelledby="aqua-projects">
          <h2 id="aqua-projects">Projects</h2>
          <div className="aqua-featured">
            {featured.map((project) => (
              <ProjectLink className="aqua-feature" key={project.id} project={project}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="prototype-meta">{project.stack.join(" / ")}</span>
              </ProjectLink>
            ))}
          </div>
          <div className="aqua-project-index">
            {index.map((project) => (
              <ProjectLink className="aqua-project" key={project.id} project={project}>
                <div>
                  <h3>{project.title}</h3>
                  <span className="prototype-meta">{project.stack.join(" / ")}</span>
                </div>
                <p>{project.description}</p>
              </ProjectLink>
            ))}
          </div>
        </section>

        <section className="aqua-section aqua-bottom" aria-labelledby="aqua-experience">
          <div>
            <h2 id="aqua-experience">Experience</h2>
            <div className="aqua-experience">
              {experience.map((item) => (
                <article key={`${item.role}-${item.company}`}>
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                  <span className="prototype-meta"><Period>{item.period}</Period></span>
                </article>
              ))}
            </div>
          </div>
          <div className="aqua-skills">
            <h2>Skills</h2>
            <p>{skills.join(" / ")}</p>
          </div>
        </section>
      </main>
    </article>
  );
}

Aqua.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleColorMode: PropTypes.func.isRequired,
};
