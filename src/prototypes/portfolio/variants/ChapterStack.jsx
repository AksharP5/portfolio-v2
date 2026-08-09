import { experience, profile, projects } from "../../../data";
import { Period, ProjectLinks, SkillArtwork, SocialTextLinks } from "../content";

export default function ChapterStack() {
  return (
    <div className="prototype-page chapter-stack proto-enter">
      <header className="chapter-header">
        <p className="proto-hand">Hello, I&apos;m Akshar.</p>
        <SocialTextLinks bracketed />
      </header>

      <main>
        <details className="chapter" open>
          <summary>
            <span className="proto-hand">About</span>
            <span aria-hidden="true">+</span>
          </summary>
          <div className="chapter-body chapter-about">
            <h1>{profile.roles.join(" / ")}</h1>
            <p>{profile.intro}</p>
          </div>
        </details>

        <details className="chapter" open>
          <summary>
            <span className="proto-hand">Work</span>
            <span aria-hidden="true">+</span>
          </summary>
          <div className="chapter-body chapter-projects">
            {projects.map((project) => (
              <article key={project.id}>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <footer>
                  <span>{project.stack.join(", ")}</span>
                  <ProjectLinks project={project} />
                </footer>
              </article>
            ))}
          </div>
        </details>

        <details className="chapter">
          <summary>
            <span className="proto-hand">Experience</span>
            <span aria-hidden="true">+</span>
          </summary>
          <div className="chapter-body chapter-experience">
            {experience.map((item) => (
              <article key={`${item.role}-${item.company}`}>
                <h2>{item.role}</h2>
                <p>{item.company}</p>
                <p><Period>{item.period}</Period></p>
              </article>
            ))}
          </div>
        </details>

        <details className="chapter">
          <summary>
            <span className="proto-hand">Skills</span>
            <span aria-hidden="true">+</span>
          </summary>
          <div className="chapter-body chapter-skills"><SkillArtwork /></div>
        </details>
      </main>
    </div>
  );
}
