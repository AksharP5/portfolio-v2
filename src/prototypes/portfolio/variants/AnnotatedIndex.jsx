import portrait from "../../../assets/images/logo-portrait.webp";
import { experience, profile, projects, skills } from "../../../data";
import { Period, ProjectLinks, SocialTextLinks } from "../content";

export default function AnnotatedIndex() {
  return (
    <div className="prototype-page annotated-index proto-enter">
      <header className="annotated-header">
        <img src={portrait} alt="Illustrated portrait of Akshar Patel" />
        <div>
          <p className="proto-hand annotated-hello">Hello, I&apos;m Akshar.</p>
          <h1>{profile.roles.join(" / ")}</h1>
        </div>
        <SocialTextLinks bracketed />
      </header>

      <div className="annotated-layout">
        <aside aria-label="Margin notes">
          <p className="proto-hand">A small index of what I have made and where I have been.</p>
          <span>Click any section to fold it.</span>
        </aside>

        <main>
          <details open>
            <summary><span>About</span><span aria-hidden="true">+</span></summary>
            <div className="annotated-copy"><p>{profile.intro}</p></div>
          </details>

          <details open>
            <summary><span>Selected projects</span><span aria-hidden="true">+</span></summary>
            <div className="annotated-projects">
              {projects.map((project) => (
                <article key={project.id}>
                  <div>
                    <h2>{project.title}</h2>
                    <p>{project.stack.join(" / ")}</p>
                  </div>
                  <p>{project.description}</p>
                  <ProjectLinks project={project} />
                </article>
              ))}
            </div>
          </details>

          <details>
            <summary><span>Experience</span><span aria-hidden="true">+</span></summary>
            <div className="annotated-experience">
              {experience.map((item) => (
                <p key={`${item.role}-${item.company}`}>
                  <span><Period>{item.period}</Period></span>
                  <span>{item.role}<br />{item.company}</span>
                </p>
              ))}
            </div>
          </details>

          <details>
            <summary><span>Skills</span><span aria-hidden="true">+</span></summary>
            <p className="annotated-skills">{skills.join(" / ")}</p>
          </details>
        </main>
      </div>
    </div>
  );
}
