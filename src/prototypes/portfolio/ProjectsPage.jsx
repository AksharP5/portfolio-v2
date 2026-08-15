import PropTypes from "prop-types";
import {
  FaArrowLeft,
  FaArrowUpRightFromSquare,
  FaChevronDown,
  FaCodePullRequest,
} from "react-icons/fa6";
import { projects } from "../../data";
import { ThemeToggle } from "./content";
import { contributionGroups } from "./contributions";
import ProjectBrowser from "./ProjectBrowser";

const stateLabels = {
  merged: "Merged",
  open: "Open",
};

export default function ProjectsPage({ colorMode, onToggleColorMode }) {
  return (
    <div className="projects-page">
      <header className="contact-navigation">
        <a className="contact-back" href="/prototypes/#projects">
          <FaArrowLeft aria-hidden="true" />
          <span>Portfolio</span>
        </a>
        <div className="contact-navigation-title">
          <strong>Akshar</strong>
          <span>Projects</span>
        </div>
        <ThemeToggle colorMode={colorMode} onToggle={onToggleColorMode} />
      </header>

      <main className="projects-index-shell">
        <header className="projects-index-intro">
          <h1>Projects</h1>
          <p>Select a project to read what I built and how.</p>
        </header>

        <section className="projects-index-list" aria-label="All projects">
          <ProjectBrowser projects={projects} />
        </section>

        <section
          className="contributions-section"
          aria-labelledby="contributions-heading"
        >
          <div className="contributions-heading">
            <FaCodePullRequest aria-hidden="true" />
            <h2 id="contributions-heading">Open source contributions</h2>
          </div>

          <div className="contribution-groups">
            {contributionGroups.map((group) => (
              <article className="contribution-group" key={group.repository}>
                <header>
                  <h3>{group.name}</h3>
                  <a href={group.url} target="_blank" rel="noreferrer">
                    <span>{group.repository}</span>
                    <FaArrowUpRightFromSquare aria-hidden="true" />
                  </a>
                </header>

                <div className="contribution-list">
                  {group.contributions.map((contribution) => (
                    <details
                      className="contribution-item"
                      key={`${group.repository}-${contribution.number}`}
                    >
                      <summary>
                        <FaCodePullRequest
                          className="contribution-state-icon"
                          data-state={contribution.state}
                          aria-hidden="true"
                        />
                        <span className="contribution-title">{contribution.title}</span>
                        <span
                          className="contribution-state"
                          data-state={contribution.state}
                        >
                          {stateLabels[contribution.state]}
                        </span>
                        <span className="contribution-number">#{contribution.number}</span>
                        <FaChevronDown className="contribution-chevron" aria-hidden="true" />
                      </summary>
                      <div className="contribution-description">
                        <p>{contribution.description}</p>
                        <a href={contribution.url} target="_blank" rel="noreferrer">
                          <span>View pull request</span>
                          <FaArrowUpRightFromSquare aria-hidden="true" />
                        </a>
                      </div>
                    </details>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

ProjectsPage.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleColorMode: PropTypes.func.isRequired,
};
