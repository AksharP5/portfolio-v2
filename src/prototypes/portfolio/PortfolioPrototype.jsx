import PropTypes from "prop-types";
import { FaArrowRightLong } from "react-icons/fa6";
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
import { profile, projects } from "../../data";
import { PrototypeTools } from "./content";
import ExperienceExplorer from "./experience/ExperienceExplorer";
import ProjectBrowser from "./ProjectBrowser";

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

const featuredProjectIds = ["opencode", "blippy", "patchline", "packaged-resume"];
const featuredProjects = featuredProjectIds.map((id) => (
  projects.find((project) => project.id === id)
));

function SectionTitle({ children, id }) {
  return <h2 className="section-title" id={id}>{children}</h2>;
}

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default function PortfolioPrototype({
  colorMode,
  onReplayOpening,
  onToggleColorMode,
  onToggleSound,
  soundEnabled,
}) {
  return (
    <div className="prototype-shell">
      <main id="home" className="prototype-page">
        <header className="profile-intro">
          <div className="profile-heading">
            <h1>{profile.name}</h1>
            <PrototypeTools
              colorMode={colorMode}
              onToggleColorMode={onToggleColorMode}
              onToggleSound={onToggleSound}
              soundEnabled={soundEnabled}
            />
          </div>
        </header>

        <ExperienceExplorer
          onReplayOpening={onReplayOpening}
          soundEnabled={soundEnabled}
        />

        <section id="projects" className="prototype-section" aria-labelledby="projects-title">
          <div className="section-heading-row">
            <SectionTitle id="projects-title">Projects</SectionTitle>
            <a className="section-view-all" href="/prototypes/projects/">
              <span>View all</span>
              <FaArrowRightLong aria-hidden="true" />
            </a>
          </div>
          <ProjectBrowser projects={featuredProjects} />
        </section>

        <section id="skills" className="prototype-section" aria-labelledby="skills-title">
          <SectionTitle id="skills-title">Skills</SectionTitle>
          <div className="skill-grid">
            {skillIcons.map(([name, icon]) => (
              <div className="skill-item" key={name}>
                <img src={icon} alt="" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </section>

        <aside className="contact-invite" aria-label="Contact">
          <div>
            <strong>Have something in mind?</strong>
            <span>I&apos;m always open to a good conversation.</span>
          </div>
          <a className="contact-cta" href="/prototypes/contact/">
            <span>Let&apos;s talk</span>
            <span className="contact-cta-arrow">
              <FaArrowRightLong aria-hidden="true" />
            </span>
          </a>
        </aside>
      </main>
    </div>
  );
}

PortfolioPrototype.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]).isRequired,
  onReplayOpening: PropTypes.func.isRequired,
  onToggleColorMode: PropTypes.func.isRequired,
  onToggleSound: PropTypes.func.isRequired,
  soundEnabled: PropTypes.bool.isRequired,
};
