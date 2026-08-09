import { useState } from "react";
import workbench from "../../../assets/images/workbench.webp";
import { profile, projects } from "../../../data";
import { ProjectLinks, SkillArtwork, SocialTextLinks } from "../content";

export default function VisualShelf() {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  const intro = `${profile.intro.split(". ")[0]}.`;

  return (
    <div className="prototype-page visual-shelf proto-enter">
      <header className="shelf-header">
        <p className="proto-hand">Akshar Patel</p>
        <SocialTextLinks />
      </header>

      <main>
        <section className="shelf-hero">
          <div className="shelf-intro">
            <h1>
              <span>{profile.roles[1]}</span>
              <span>{profile.roles[0]}</span>
            </h1>
            <p>{intro}</p>
          </div>
          <img src={workbench} alt="Laptop, notebook, headphones, and basketball on a workbench" />
        </section>

        <section className="shelf-work" aria-label="Project browser">
          <div className="shelf-project-tabs" role="tablist" aria-label="Projects">
            {projects.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected === index}
                aria-controls="selected-project"
                onClick={() => setSelected(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.title}
              </button>
            ))}
          </div>

          <article id="selected-project" key={project.id} className="shelf-selected-project proto-swap" role="tabpanel">
            <p className="proto-hand">{project.title}</p>
            <h2>{project.description}</h2>
            <footer>
              <span>{project.stack.join(" / ")}</span>
              <ProjectLinks project={project} />
            </footer>
          </article>
        </section>

        <section className="shelf-tools">
          <h2 className="proto-hand">The shelf</h2>
          <SkillArtwork compact />
        </section>
      </main>
    </div>
  );
}
