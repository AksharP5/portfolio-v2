import PropTypes from "prop-types";
import portrait from "../../../assets/images/logo-portrait.webp";
import { experience, profile, projects, skills } from "../../../data";
import { Period, ProjectLink, PrototypeTools } from "../content";

export default function Coral({ colorMode, onToggleColorMode }) {
  return (
    <article className="prototype-page coral-prototype">
      <header className="coral-hero">
        <div className="prototype-topline">
          <span>Developer portfolio</span>
          <PrototypeTools colorMode={colorMode} onToggleColorMode={onToggleColorMode} />
        </div>

        <div className="coral-hero-grid">
          <div>
            <p className="coral-role">{profile.roles.join(" / ")}</p>
            <h1>{profile.name}</h1>
            <p className="coral-intro">{profile.intro}</p>
          </div>
          <img src={portrait} alt="Illustrated portrait of Akshar" />
        </div>
      </header>

      <main>
        <section className="coral-section" aria-labelledby="coral-projects">
          <h2 id="coral-projects">Things I have built</h2>
          <div className="coral-project-grid">
            {projects.map((project) => (
              <ProjectLink className="coral-project" key={project.id} project={project}>
                <span className="prototype-meta">{project.stack.join(" / ")}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </ProjectLink>
            ))}
          </div>
        </section>

        <section className="coral-section" aria-labelledby="coral-experience">
          <h2 id="coral-experience">Where I have worked</h2>
          <div className="coral-experience">
            {experience.map((item) => (
              <article key={`${item.role}-${item.company}`}>
                <p><strong>{item.role}</strong><br />{item.company}</p>
                <span className="prototype-meta"><Period>{item.period}</Period></span>
              </article>
            ))}
          </div>
        </section>

        <section className="coral-skills" aria-labelledby="coral-skills">
          <h2 id="coral-skills">Tools I use</h2>
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
