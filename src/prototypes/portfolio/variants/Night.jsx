import PropTypes from "prop-types";
import portrait from "../../../assets/images/logo-portrait.webp";
import { experience, profile, projects, skills } from "../../../data";
import { Period, ProjectLink, PrototypeTools } from "../content";

export default function Night({ colorMode, onToggleColorMode }) {
  return (
    <article className="prototype-page night-prototype">
      <header className="night-hero">
        <div className="prototype-topline">
          <span>{profile.roles.join(" / ")}</span>
          <PrototypeTools colorMode={colorMode} onToggleColorMode={onToggleColorMode} />
        </div>
        <div className="night-identity">
          <img src={portrait} alt="Illustrated portrait of Akshar" />
          <div>
            <h1>{profile.name}</h1>
            <p>{profile.intro}</p>
          </div>
        </div>
      </header>

      <main>
        <section className="night-section" aria-labelledby="night-projects">
          <h2 id="night-projects">Work</h2>
          <div className="night-project-list">
            {projects.map((project) => (
              <ProjectLink className="night-project" key={project.id} project={project}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="prototype-meta">{project.stack.join(" / ")}</span>
              </ProjectLink>
            ))}
          </div>
        </section>

        <section className="night-section" aria-labelledby="night-experience">
          <h2 id="night-experience">Experience</h2>
          <div className="night-experience">
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

        <section className="night-section night-skills" aria-labelledby="night-skills">
          <h2 id="night-skills">Skills</h2>
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
