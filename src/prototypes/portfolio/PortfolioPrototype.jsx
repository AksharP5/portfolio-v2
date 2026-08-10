import PropTypes from "prop-types";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
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

function SectionTitle({ children, id }) {
  return <h2 className="section-title" id={id}>{children}</h2>;
}

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default function PortfolioPrototype({ colorMode, onToggleColorMode }) {
  return (
    <div className="prototype-shell">
      <main id="home" className="prototype-page">
        <header className="profile-intro">
          <div className="profile-heading">
            <div className="profile-heading-copy">
              <h1>{profile.name}</h1>
              <p className="profile-role">Data Analyst at Dow Jones</p>
            </div>
            <PrototypeTools colorMode={colorMode} onToggleColorMode={onToggleColorMode} />
          </div>
        </header>

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
          <div className="project-list">
            {projects.map((project) => (
              <ProjectLink className="project-card" key={project.id} project={project}>
                <div className="project-copy">
                  <div className="project-title-row">
                    <h3>{project.title}</h3>
                    <FaArrowUpRightFromSquare aria-hidden="true" />
                  </div>
                  <p>{project.description}</p>
                  <span>{project.stack.join(", ")}</span>
                </div>
              </ProjectLink>
            ))}
          </div>
        </section>

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
      </main>
    </div>
  );
}

PortfolioPrototype.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleColorMode: PropTypes.func.isRequired,
};
