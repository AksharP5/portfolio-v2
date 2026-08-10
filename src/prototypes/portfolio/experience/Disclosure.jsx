import { useState } from "react";
import { Period } from "../content";
import { experienceRecords } from "./data";

export default function Disclosure() {
  const [expanded, setExpanded] = useState(0);

  return (
    <section id="experience" className="prototype-section experience-disclosure" aria-labelledby="experience-title">
      <h2 className="experience-concept-title" id="experience-title">Work Experience</h2>
      <div className="disclosure-list">
        {experienceRecords.map((item, index) => {
          const isExpanded = expanded === index;

          return (
            <article className={isExpanded ? "is-expanded" : undefined} key={`${item.role}-${item.company}`}>
              <button
                className="disclosure-trigger"
                type="button"
                aria-expanded={isExpanded}
                aria-controls={`experience-detail-${index}`}
                onClick={() => setExpanded(isExpanded ? -1 : index)}
              >
                <span className="disclosure-role">
                  <strong>{item.role}</strong>
                  <span>{item.company}</span>
                </span>
                <time><Period>{item.period}</Period></time>
                <span className="disclosure-action" aria-hidden="true">
                  {isExpanded ? "Hide" : "View"}
                </span>
              </button>
              <div className="disclosure-detail" id={`experience-detail-${index}`} hidden={!isExpanded}>
                <p>{item.summary}</p>
                <ul>
                  {item.focus.map((area) => <li key={area}>{area}</li>)}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
