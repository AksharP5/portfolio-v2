import portrait from "../../../assets/images/logo-portrait.webp";
import { experience, profile, projects } from "../../../data";
import { Period, ProjectLinks, SkillArtwork, SocialTextLinks } from "../content";

export default function SplitLedger() {
  return (
    <div className="prototype-page split-ledger proto-enter">
      <aside className="ledger-identity">
        <div className="ledger-name">
          <p className="proto-hand">Akshar Patel</p>
          <span>{profile.roles.join(" / ")}</span>
        </div>
        <img src={portrait} alt="Illustrated portrait of Akshar Patel" />
        <p>{profile.intro}</p>
        <SocialTextLinks />
      </aside>

      <main className="ledger-record">
        <header>
          <p>Work</p>
          <p>{String(projects.length).padStart(2, "0")} projects</p>
        </header>

        <section className="ledger-projects" aria-label="Projects">
          {projects.map((project, index) => (
            <article key={project.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h1>{project.title}</h1>
                <p>{project.description}</p>
              </div>
              <div className="ledger-project-meta">
                <p>{project.stack.join(", ")}</p>
                <ProjectLinks project={project} />
              </div>
            </article>
          ))}
        </section>

        <section className="ledger-history">
          <h2 className="proto-hand">Experience</h2>
          {experience.map((item) => (
            <article key={`${item.role}-${item.company}`}>
              <p>{item.role}</p>
              <p>{item.company}</p>
              <p><Period>{item.period}</Period></p>
            </article>
          ))}
        </section>

        <section className="ledger-skills">
          <h2 className="proto-hand">Tools I use</h2>
          <SkillArtwork compact />
        </section>
      </main>
    </div>
  );
}
