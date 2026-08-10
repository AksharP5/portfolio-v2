import PropTypes from "prop-types";
import portrait from "../../../assets/images/logo-portrait.webp";
import workbench from "../../../assets/images/workbench.webp";
import { experience, profile, projects, skills } from "../../../data";
import { Period, ProjectLink, PrototypeTools } from "../content";

export default function Cobalt({ colorMode, onToggleColorMode }) {
  const [featured, ...projectIndex] = projects;

  return (
    <article className="prototype-page profile-prototype">
      <header className="profile-hero">
        <div className="prototype-topline">
          <span>{profile.roles.join(" / ")}</span>
          <PrototypeTools colorMode={colorMode} onToggleColorMode={onToggleColorMode} />
        </div>

        <div className="profile-identity">
          <img src={portrait} alt="Illustrated portrait of Akshar" />
          <div>
            <h1>{profile.name}</h1>
            <p>{profile.intro}</p>
          </div>
        </div>
      </header>

      <main>
        <section className="profile-section" aria-labelledby="profile-projects">
          <h2 id="profile-projects">Selected projects</h2>
          <ProjectLink className="profile-featured" project={featured}>
            <img
              src={workbench}
              alt="A basketball, notebook, laptop, and headphones on a desk"
            />
            <div className="profile-featured-copy">
              <span className="prototype-meta">{featured.stack.join(" / ")}</span>
              <h3>{featured.title}</h3>
              <p>{featured.description}</p>
            </div>
          </ProjectLink>

          <div className="profile-project-list">
            {projectIndex.map((project) => (
              <ProjectLink className="profile-project" key={project.id} project={project}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="prototype-meta">{project.stack.join(" / ")}</span>
              </ProjectLink>
            ))}
          </div>
        </section>

        <section className="profile-section" aria-labelledby="profile-experience">
          <h2 id="profile-experience">Experience</h2>
          <div className="profile-experience">
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

        <section className="profile-section profile-skills" aria-labelledby="profile-skills">
          <h2 id="profile-skills">Tools and skills</h2>
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
