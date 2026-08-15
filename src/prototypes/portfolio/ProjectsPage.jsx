import PropTypes from "prop-types";
import { useState } from "react";
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
  closed: "Closed",
  merged: "Merged",
  open: "Open",
};

const stateOptions = [
  ["all", "All"],
  ["open", "Open"],
  ["merged", "Merged"],
  ["closed", "Closed"],
];

const contributionCount = contributionGroups.reduce(
  (total, group) => total + group.contributions.length,
  0,
);

const contributionStateCounts = contributionGroups
  .flatMap((group) => group.contributions)
  .reduce((counts, contribution) => ({
    ...counts,
    [contribution.state]: (counts[contribution.state] ?? 0) + 1,
  }), { all: contributionCount });

export default function ProjectsPage({ colorMode, onToggleColorMode }) {
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [openRepositories, setOpenRepositories] = useState(
    () => new Set([contributionGroups[0].repository]),
  );
  const normalizedQuery = query.trim().toLowerCase();
  const isFiltering = normalizedQuery !== "" || stateFilter !== "all";
  const filteredGroups = contributionGroups
    .map((group) => ({
      ...group,
      contributions: group.contributions.filter((contribution) => {
        const matchesState = stateFilter === "all"
          || contribution.state === stateFilter;
        const matchesQuery = normalizedQuery === ""
          || [
            group.name,
            group.repository,
            contribution.title,
            contribution.description,
            String(contribution.number),
          ].some((value) => value.toLowerCase().includes(normalizedQuery));

        return matchesState && matchesQuery;
      }),
    }))
    .filter((group) => group.contributions.length > 0);
  const visibleContributionCount = filteredGroups.reduce(
    (total, group) => total + group.contributions.length,
    0,
  );

  const updateOpenRepositories = (repository, isOpen) => {
    if (isFiltering) return;

    setOpenRepositories((current) => {
      const next = new Set(current);
      if (isOpen) next.add(repository);
      else next.delete(repository);
      return next;
    });
  };

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

          <div className="contribution-controls">
            <label className="contribution-search">
              <span>Search contributions</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder="Title, repository, or pull request"
              />
            </label>

            <div className="contribution-state-filter" aria-label="Filter by state">
              {stateOptions.map(([value, label]) => (
                <button
                  type="button"
                  aria-pressed={stateFilter === value}
                  onClick={() => setStateFilter(value)}
                  key={value}
                >
                  <span>{label}</span>
                  <span>{contributionStateCounts[value]}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="contribution-results" role="status" aria-live="polite">
            {visibleContributionCount} of {contributionCount} pull requests
          </p>

          <div className="contribution-groups">
            {filteredGroups.map((group) => (
              <details
                className="contribution-group"
                open={isFiltering || openRepositories.has(group.repository)}
                onToggle={(event) => updateOpenRepositories(
                  group.repository,
                  event.currentTarget.open,
                )}
                key={group.repository}
              >
                <summary className="contribution-group-summary">
                  <span className="contribution-group-copy">
                    <strong>{group.name}</strong>
                    <span>{group.repository}</span>
                  </span>
                  <span className="contribution-group-count">
                    {group.contributions.length} {group.contributions.length === 1 ? "PR" : "PRs"}
                  </span>
                  <FaChevronDown className="contribution-group-chevron" aria-hidden="true" />
                </summary>

                <div className="contribution-group-content">
                  <a
                    className="contribution-repository-link"
                    href={group.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Open repository</span>
                    <FaArrowUpRightFromSquare aria-hidden="true" />
                  </a>

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
                </div>
              </details>
            ))}

            {filteredGroups.length === 0 ? (
              <p className="contribution-empty">No pull requests match this filter.</p>
            ) : null}
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
