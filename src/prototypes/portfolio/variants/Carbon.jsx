import PropTypes from "prop-types";
import { experience, profile, projects, skills } from "../../../data";
import { Period, PortfolioIdentity, ProjectLink } from "../content";

export default function Carbon({ colorMode, onToggleColorMode }) {
  return (
    <div className="minimal-prototype carbon-prototype">
      <header className="carbon-hero">
        <PortfolioIdentity colorMode={colorMode} onToggleColorMode={onToggleColorMode} />
        <p>{profile.intro}</p>
      </header>

      <main>
        <section className="prototype-section" aria-labelledby="carbon-projects">
          <h2 id="carbon-projects">Projects</h2>
          <div className="carbon-projects">
            {projects.map((project) => (
              <ProjectLink className="carbon-project" key={project.id} project={project}>
                <div className="project-heading">
                  <h3>{project.title}</h3>
                  <span className="minimal-meta">{project.stack.join(" / ")}</span>
                </div>
                <p>{project.description}</p>
              </ProjectLink>
            ))}
          </div>
        </section>

        <section className="prototype-section" aria-labelledby="carbon-experience">
          <h2 id="carbon-experience">Experience</h2>
          <div className="carbon-experience">
            {experience.map((item) => (
              <p key={`${item.role}-${item.company}`}>
                <span>{item.role}, {item.company}</span>
                <span className="minimal-meta"><Period>{item.period}</Period></span>
              </p>
            ))}
          </div>
        </section>

        <section className="prototype-section" aria-labelledby="carbon-skills">
          <h2 id="carbon-skills">Skills</h2>
          <p className="minimal-meta skills-copy">{skills.join(" / ")}</p>
        </section>
      </main>
    </div>
  );
}

Carbon.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleColorMode: PropTypes.func.isRequired,
};
