import PropTypes from "prop-types";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import portrait from "../../assets/images/logo-portrait.webp";
import fakeFriendsCover from "../../assets/images/find-fake-friends.webp";
import patchlineCover from "../../assets/images/patchline-cover.webp";
import workbenchCover from "../../assets/images/workbench.webp";
import aemIcon from "../../assets/skills/aem-design.png";
import dockerIcon from "../../assets/skills/docker.png";
import flaskIcon from "../../assets/skills/flask.png";
import gitIcon from "../../assets/skills/git.png";
import goIcon from "../../assets/skills/gopher-shirt.png";
import htmlIcon from "../../assets/skills/htmlcss.png";
import javaIcon from "../../assets/skills/java.png";
import jsIcon from "../../assets/skills/js.png";
import pythonIcon from "../../assets/skills/py.png";
import rabbitIcon from "../../assets/skills/rabbitmq-logo.png";
import sqlIcon from "../../assets/skills/sql.png";
import tsIcon from "../../assets/skills/tslogo.png";
import { experience, profile, projects } from "../../data";
import { Period, ProjectLink, PrototypeTools } from "./content";

const skillIcons = [
  ["Python", pythonIcon],
  ["Java", javaIcon],
  ["JavaScript", jsIcon],
  ["TypeScript", tsIcon],
  ["Go", goIcon],
  ["HTML / CSS", htmlIcon],
  ["Docker", dockerIcon],
  ["Flask", flaskIcon],
  ["RabbitMQ", rabbitIcon],
  ["SQL", sqlIcon],
  ["Git", gitIcon],
  ["AEM", aemIcon],
];

const featuredProjectIds = ["patchline", "packaged-resume", "find-fake-friends"];
const projectCovers = {
  "find-fake-friends": fakeFriendsCover,
  "packaged-resume": workbenchCover,
  patchline: patchlineCover,
};

function SectionTitle({ children, id }) {
  return <h2 className="section-title" id={id}>{children}</h2>;
}

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default function PortfolioPrototype({ colorMode, onToggleColorMode }) {
  const featuredProjects = featuredProjectIds.map((id) => (
    projects.find((project) => project.id === id)
  ));
  const otherProjects = projects.filter((project) => !featuredProjectIds.includes(project.id));

  return (
    <div className="prototype-shell">
      <nav className="prototype-nav" aria-label="Portfolio navigation">
        <a className="prototype-wordmark" href="#home" aria-label="Akshar, back to top">AP</a>
        <div className="prototype-nav-links">
          <a href="#home">Home</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
        </div>
        <PrototypeTools colorMode={colorMode} onToggleColorMode={onToggleColorMode} />
      </nav>

      <main id="home" className="prototype-page">
        <header className="profile-intro">
          <div className="profile-heading">
            <img src={portrait} alt="Illustrated portrait of Akshar" />
            <div className="profile-heading-copy">
              <p className="profile-kicker">Hello, I&apos;m</p>
              <h1>{profile.name}</h1>
              <a href={profile.github} target="_blank" rel="noreferrer">@AksharP5</a>
              <p className="profile-role">Data Analyst at Dow Jones</p>
            </div>
          </div>

          <ul className="profile-summary">
            <li>Data Analyst with a background in Computer Science.</li>
            <li>Interested in automation, software, and building useful tools.</li>
            <li>Away from the screen, I follow basketball and football and listen to music.</li>
          </ul>

          <div className="profile-facts">
            <div>
              <span>Currently</span>
              <strong>Data Analyst</strong>
              <p>Dow Jones</p>
            </div>
            <div>
              <span>Education</span>
              <strong>B.S. Computer Science</strong>
              <p>Western New England University</p>
            </div>
          </div>
        </header>

        <section id="skills" className="prototype-section" aria-labelledby="skills-title">
          <SectionTitle id="skills-title">My Skills</SectionTitle>
          <div className="skill-grid">
            {skillIcons.map(([name, icon]) => (
              <div className="skill-item" key={name}>
                <img src={icon} alt="" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="prototype-section" aria-labelledby="experience-title">
          <SectionTitle id="experience-title">Work Experience</SectionTitle>
          <div className="experience-list">
            {experience.map((item, index) => (
              <article key={`${item.role}-${item.company}`}>
                <span className="experience-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                </div>
                <time><Period>{item.period}</Period></time>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="prototype-section" aria-labelledby="projects-title">
          <SectionTitle id="projects-title">My Projects</SectionTitle>
          <div className="featured-projects">
            {featuredProjects.map((project) => (
              <ProjectLink className="featured-project" key={project.id} project={project}>
                <div className="project-visual">
                  <img
                    src={projectCovers[project.id]}
                    alt={project.id === "find-fake-friends"
                      ? "Find Fake Friends web app interface"
                      : project.id === "patchline"
                        ? "Laptop displaying an abstract command line interface"
                        : "Laptop and notebook on a workbench"}
                    loading="lazy"
                  />
                </div>
                <div className="project-copy">
                  <div className="project-title-row">
                    <h3>{project.title}</h3>
                    <FaArrowUpRightFromSquare aria-hidden="true" />
                  </div>
                  <p>{project.description}</p>
                  <span>{project.stack.join(" · ")}</span>
                </div>
              </ProjectLink>
            ))}
          </div>

          <div className="other-projects">
            {otherProjects.map((project) => (
              <ProjectLink className="other-project" key={project.id} project={project}>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <span>{project.stack.join(" · ")}</span>
                <FaArrowUpRightFromSquare aria-hidden="true" />
              </ProjectLink>
            ))}
          </div>
        </section>

        <footer className="prototype-footer">
          <span>Akshar</span>
          <p>Data, software, and useful tools.</p>
        </footer>
      </main>
    </div>
  );
}

PortfolioPrototype.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleColorMode: PropTypes.func.isRequired,
};
