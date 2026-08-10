import { Period } from "../content";
import { experienceRecords } from "./data";

export default function Timeline() {
  return (
    <section id="experience" className="prototype-section experience-timeline" aria-labelledby="experience-title">
      <h2 className="experience-concept-title" id="experience-title">Work Experience</h2>
      <ol className="timeline-list">
        {experienceRecords.map((item) => (
          <li
            className={item.current ? "is-current" : "is-previous"}
            key={`${item.role}-${item.company}`}
          >
            <div className="timeline-meta">
              <time><Period>{item.period}</Period></time>
              <span className="timeline-status">{item.current ? "Active" : "Previous"}</span>
            </div>
            <div className="timeline-copy">
              <h3>{item.role}</h3>
              <p className="timeline-company">{item.company}</p>
              <p>{item.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
