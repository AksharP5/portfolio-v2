import portrait from "../../../assets/images/logo-portrait.webp";
import { experience, profile, projects, skills } from "../../../data";
import { SocialMorph } from "../../../social-preview";
import { Period, ProjectLinks } from "../content";

export default function SocialOrbit() {
  const intro = `${profile.intro.split(". ")[0]}.`;

  return (
    <div className="prototype-page social-orbit proto-enter">
      <main>
        <section className="orbit-hero">
          <p className="orbit-role">{profile.roles.join(" / ")}</p>
          <div className="orbit-portrait">
            <img src={portrait} alt="Illustrated portrait of Akshar Patel" />
          </div>
          <h1 className="proto-hand">Akshar Patel</h1>
          <p>{intro}</p>
        </section>

        <section className="orbit-project-map" aria-label="Projects">
          {projects.map((project, index) => (
            <article key={project.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <ProjectLinks project={project} />
              </div>
            </article>
          ))}
        </section>

        <section className="orbit-folds">
          <details>
            <summary>About <span aria-hidden="true">+</span></summary>
            <p>{profile.intro}</p>
          </details>
          <details>
            <summary>Experience <span aria-hidden="true">+</span></summary>
            <div>
              {experience.map((item) => (
                <p key={`${item.role}-${item.company}`}>
                  <span>{item.role}, {item.company}</span>
                  <span><Period>{item.period}</Period></span>
                </p>
              ))}
            </div>
          </details>
          <details>
            <summary>Skills <span aria-hidden="true">+</span></summary>
            <p>{skills.join(" / ")}</p>
          </details>
        </section>
      </main>

      <div className="orbit-social-dock"><SocialMorph /></div>
    </div>
  );
}
