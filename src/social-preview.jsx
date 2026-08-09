import { useLayoutEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { experience, profile, projects, skills } from "./data";
import { ViewCount } from "./view-count";

const githubContributionRows = [
  "00000000000010000000001111112111100000001100100002031",
  "00000010110110100101002112112112100000000111100004230",
  "00000010110011000101001111121111000000000122100111241",
  "00000011000000000100101121121111000000000112100001141",
  "00000000100010000100111111211111000000000111100110241",
  "0000000100011100010001211111111100000000101010001021",
  "0000000000010000000011311111111100000010101100010020",
];

const githubOrganizations = [
  { login: "ratatui", avatar: "https://avatars.githubusercontent.com/u/125200832?v=4" },
  { login: "basecamp", avatar: "https://avatars.githubusercontent.com/u/13131?v=4" },
  { login: "openai", avatar: "https://avatars.githubusercontent.com/u/14957082?v=4" },
  { login: "anomalyco", avatar: "https://avatars.githubusercontent.com/u/66570915?v=4" },
  { login: "pingdotgg", avatar: "https://avatars.githubusercontent.com/u/89191727?v=4" },
  { login: "trycua", avatar: "https://avatars.githubusercontent.com/u/191107687?v=4" },
];

const githubAvatar = "https://avatars.githubusercontent.com/u/123344143?v=4";
const linkedinAvatar = "https://media.licdn.com/dms/image/v2/D4E03AQEp_I-iyCnXIQ/profile-displayphoto-shrink_800_800/B4EZZUVLsfH0Ac-/0/1745171563114?e=1787788800&v=beta&t=WPsdo3Et2D-7Y1sD6sTZcvN-Wx8yu_ksDWZAQ-KpGz8";
const xAvatar = "https://pbs.twimg.com/profile_images/2075753792411226112/nnfp9G-b_400x400.jpg";
const socialCardSize = { width: 360, height: 150 };

function GithubPreview() {
  return (
    <div className="profile-card github-card">
      <div className="github-card-header">
        <img src={githubAvatar} alt="" />
        <div>
          <strong>AksharP5</strong>
          <span><strong>2,027</strong> contributions in the last year</span>
        </div>
      </div>
      <div className="github-organizations">
        <span className="github-organizations-label">Contributed to:</span>
        <div className="github-organizations-grid" aria-label="Organizations contributed to">
          {githubOrganizations.map((organization) => (
            <span className="github-organization" key={organization.login}>
              <img src={organization.avatar} alt="" />
              <span>@{organization.login}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="github-contribution-graph" aria-label="GitHub contribution graph">
        {githubContributionRows.flatMap((row, rowIndex) =>
          Array.from(row.slice(-50), (level, columnIndex) => (
            <span
              key={`${rowIndex}-${columnIndex}`}
              data-level={level}
              style={{ gridColumn: columnIndex + 1, gridRow: rowIndex + 1 }}
            />
          )),
        )}
      </div>
    </div>
  );
}

function LinkedinPreview() {
  return (
    <div className="profile-card network-card linkedin-card">
      <div className="network-card-cover"><FaLinkedin aria-hidden="true" /></div>
      <img className="network-card-avatar" src={linkedinAvatar} alt="" />
      <div className="network-card-body">
        <div className="network-card-heading">
          <div>
            <strong>{profile.fullName} <span className="network-card-pronouns">He/Him</span></strong>
            <span>Data Analyst at Dow Jones</span>
          </div>
          <span className="network-card-action">Connect</span>
        </div>
        <p>Edison, New Jersey, United States</p>
        <p className="linkedin-card-connections">451 connections</p>
      </div>
    </div>
  );
}

function XPreview() {
  return (
    <div className="profile-card network-card x-card">
      <div className="network-card-cover"><FaXTwitter aria-hidden="true" /></div>
      <img className="network-card-avatar" src={xAvatar} alt="" />
      <div className="network-card-body">
        <div className="network-card-heading">
          <div>
            <strong>AP</strong>
            <span>@apunlisted</span>
          </div>
          <span className="network-card-action">Follow</span>
        </div>
        <p className="x-card-bio">larping dev</p>
        <p className="x-card-stats"><strong>449</strong> Following <strong>101</strong> Followers</p>
      </div>
    </div>
  );
}

const socials = [
  {
    id: "github",
    label: "GitHub",
    href: profile.github,
    icon: FaGithub,
    render: GithubPreview,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: profile.linkedin,
    icon: FaLinkedin,
    render: LinkedinPreview,
  },
  {
    id: "x",
    label: "X",
    href: profile.x,
    icon: FaXTwitter,
    render: XPreview,
  },
];

export function SocialMorph() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [panelX, setPanelX] = useState(0);
  const [positioned, setPositioned] = useState(false);
  const [motionDirection, setMotionDirection] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const triggerRefs = useRef([]);
  const social = socials[active];
  const panelWidth = Math.min(socialCardSize.width, Math.max(288, viewportWidth - 24));

  const select = (index, animate) => {
    setOpen(true);
    if (index === active) return;
    setMotionDirection(animate ? Math.sign(index - active) : 0);
    setActive(index);
  };

  useLayoutEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const trigger = triggerRefs.current[active];
    if (!root || !trigger) return;

    const rootRect = root.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const desiredLeft = triggerRect.left + triggerRect.width / 2 - panelWidth / 2;
    const boundedLeft = Math.min(
      Math.max(12, desiredLeft),
      viewportWidth - panelWidth - 12,
    );
    setPanelX(boundedLeft - rootRect.left);
    setPositioned(true);
  }, [active, panelWidth, viewportWidth]);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content || motionDirection === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    content.animate(
      [
        {
          opacity: 0.2,
          transform: `translate3d(${motionDirection * 34}px, 0, 0)`,
          filter: "blur(2px)",
        },
        { opacity: 1, transform: "translate3d(0, 0, 0)", filter: "blur(0)" },
      ],
      {
        duration: 190,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
    );
  }, [active, motionDirection]);

  const onSocialClick = (event, index) => {
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (hasFinePointer || (open && active === index)) return;

    event.preventDefault();
    select(index, true);
  };

  const Preview = social.render;

  return (
    <div
      ref={rootRef}
      className="social-morph"
      data-open={open ? "" : undefined}
      data-positioned={positioned ? "" : undefined}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <nav
        className="social-morph-triggers"
        aria-label="Social profiles"
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setOpen(false);
        }}
      >
        {socials.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              ref={(node) => { triggerRefs.current[index] = node; }}
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              aria-current={active === index ? "true" : undefined}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") select(index, true);
              }}
              onFocus={() => select(index, false)}
              onClick={(event) => onSocialClick(event, index)}
            >
              <Icon aria-hidden="true" />
              <span className="social-morph-label">[{item.label.toLowerCase()}]</span>
            </a>
          );
        })}
      </nav>

      <div
        className="social-morph-panel"
        style={{
          "--panel-width": `${panelWidth}px`,
          "--panel-height": `${socialCardSize.height}px`,
          transform: `translate3d(${panelX}px, 0, 0)`,
        }}
        aria-live="polite"
        aria-hidden={!open}
      >
        <div className="social-morph-surface">
          <a
            ref={contentRef}
            key={social.id}
            className="social-morph-content"
            style={{ width: panelWidth, height: socialCardSize.height }}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${social.label} profile`}
            tabIndex={open ? 0 : -1}
          >
            <Preview />
          </a>
        </div>
      </div>
    </div>
  );
}

export function SocialDocument() {
  const sections = [
    {
      id: "about",
      content: <p>{profile.intro}</p>,
    },
    {
      id: "projects",
      content: (
        <div className="social-document-projects">
          {projects.map((project, index) => (
            <article key={project.id}>
              <p>{String(index + 1).padStart(2, "0")}  {project.title}</p>
              <p>{project.description}</p>
              <p>{project.stack.join(", ")}</p>
              <p>
                <a href={project.source} target="_blank" rel="noreferrer">source</a>
                {project.demo ? <><span>  </span><a href={project.demo} target="_blank" rel="noreferrer">demo</a></> : null}
              </p>
            </article>
          ))}
        </div>
      ),
    },
    {
      id: "experience",
      content: (
        <div className="social-document-experience">
          {experience.map((item) => (
            <p key={`${item.role}-${item.company}`}>
              <span>{item.period}</span>
              <span>{item.role}, {item.company}</span>
            </p>
          ))}
        </div>
      ),
    },
    {
      id: "skills",
      content: <p className="social-document-skills">{skills.join(" / ")}</p>,
    },
  ];

  return (
    <div className="social-document">
      {sections.map((section, index) => (
        <details key={section.id} open={index < 2}>
          <summary>[{section.id}]</summary>
          <div className="social-document-panel">{section.content}</div>
        </details>
      ))}
    </div>
  );
}

export function SocialHeader() {
  return (
    <header className="portfolio-header">
      <p>{profile.name}</p>
      <div className="portfolio-header-meta">
        <p>{profile.roles.join(" / ")}</p>
        <ViewCount className="portfolio-view-count" />
      </div>
    </header>
  );
}
