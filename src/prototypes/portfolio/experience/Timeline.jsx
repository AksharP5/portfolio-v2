import PropTypes from "prop-types";
import { useId, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Period } from "../content";
import { experienceRecords } from "./data";

const experienceItemProp = PropTypes.shape({
  company: PropTypes.string.isRequired,
  current: PropTypes.bool.isRequired,
  details: PropTypes.arrayOf(PropTypes.shape({
    emphasis: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  period: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
});

function DetailText({ detail }) {
  if (detail.emphasis.length === 0) return detail.text;

  const emphasis = new Set(detail.emphasis);
  const pattern = detail.emphasis
    .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");

  return detail.text.split(new RegExp(`(${pattern})`, "g")).map((part, index) => (
    emphasis.has(part) ? <strong key={`${part}-${index}`}>{part}</strong> : part
  ));
}

DetailText.propTypes = {
  detail: PropTypes.shape({
    emphasis: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

function TimelineItem({ defaultOpen, item }) {
  const [open, setOpen] = useState(defaultOpen);
  const disclosureId = useId();
  const triggerId = `${disclosureId}-trigger`;
  const panelId = `${disclosureId}-panel`;

  return (
    <li
      className={item.current ? "is-current" : "is-previous"}
      data-expanded={open ? "true" : "false"}
    >
      <button
        id={triggerId}
        className="timeline-summary"
        type="button"
        aria-controls={panelId}
        aria-expanded={open}
        onClick={() => setOpen((expanded) => !expanded)}
      >
        <span className="timeline-summary-copy">
          <span className="timeline-role">{item.role}</span>
          <span className="timeline-company">{item.company}</span>
        </span>
        <span className="timeline-summary-meta">
          <time><Period>{item.period}</Period></time>
          <span className="timeline-status">{item.current ? "Active" : "Previous"}</span>
        </span>
        <FaChevronDown className="timeline-chevron" aria-hidden="true" />
      </button>

      {open ? (
        <div
          id={panelId}
          className="timeline-description"
          role="region"
          aria-labelledby={triggerId}
        >
          <ul className="timeline-bullets">
            {item.details.map((detail) => (
              <li key={detail.text}><DetailText detail={detail} /></li>
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

TimelineItem.propTypes = {
  defaultOpen: PropTypes.bool.isRequired,
  item: experienceItemProp.isRequired,
};

export default function Timeline() {
  return (
    <section id="experience" className="prototype-section experience-timeline" aria-labelledby="experience-title">
      <h2 className="experience-concept-title" id="experience-title">Work Experience</h2>
      <ol className="timeline-list">
        {experienceRecords.map((item, index) => (
          <TimelineItem
            defaultOpen={index === 0}
            item={item}
            key={`${item.role}-${item.company}`}
          />
        ))}
      </ol>
    </section>
  );
}
