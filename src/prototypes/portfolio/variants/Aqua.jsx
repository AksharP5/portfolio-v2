import PropTypes from "prop-types";
import portrait from "../../../assets/images/logo-portrait.webp";
import workbench from "../../../assets/images/workbench.webp";
import { experience, profile, projects, skills } from "../../../data";
import { Period, ProjectLink, PrototypeTools } from "../content";

export default function Aqua({ colorMode, onToggleColorMode }) {
  const featured = projects.slice(0, 2);
  const index = projects.slice(2);

  return (
    <article className="prototype-page scrapbook-prototype">
      <header className="scrapbook-hero">
        <div className="prototype-topline">
          <span>Developer, analyst, builder</span>
          <PrototypeTools colorMode={colorMode} onToggleColorMode={onToggleColorMode} />
        </div>

        <div className="scrapbook-hero-grid">
          <div>
            <h1>{profile.name}</h1>
            <p>{profile.intro}</p>
          </div>
          <figure>
            <img
              src={workbench}
              alt="A basketball, notebook, laptop, and headphones on a desk"
            />
            <img className="scrapbook-portrait" src={portrait} alt="Illustrated portrait of Akshar" />
          </figure>
        </div>
      </header>

      <main>
        <section className="scrapbook-section" aria-labelledby="scrapbook-projects">
          <h2 id="scrapbook-projects">Recent projects</h2>
          <div className="scrapbook-featured">
            {featured.map((project) => (
              <ProjectLink className="scrapbook-feature" key={project.id} project={project}>
                <span className="prototype-meta">{project.stack.join(" / ")}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </ProjectLink>
            ))}
          </div>
          <div className="scrapbook-project-index">
            {index.map((project) => (
              <ProjectLink className="scrapbook-project" key={project.id} project={project}>
                <div>
                  <h3>{project.title}</h3>
                  <span className="prototype-meta">{project.stack.join(" / ")}</span>
                </div>
                <p>{project.description}</p>
              </ProjectLink>
            ))}
          </div>
        </section>

        <section className="scrapbook-section scrapbook-bottom" aria-labelledby="scrapbook-experience">
          <div>
            <h2 id="scrapbook-experience">Experience</h2>
            <div className="scrapbook-experience">
              {experience.map((item) => (
                <article key={`${item.role}-${item.company}`}>
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                  <span className="prototype-meta"><Period>{item.period}</Period></span>
                </article>
              ))}
            </div>
          </div>
          <div className="scrapbook-skills">
            <h2>What I use</h2>
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
