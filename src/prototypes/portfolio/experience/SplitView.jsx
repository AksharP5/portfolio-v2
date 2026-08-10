import { useState } from "react";
import { Period } from "../content";
import { experienceRecords } from "./data";

export default function SplitView() {
  const [selected, setSelected] = useState(0);
  const active = experienceRecords[selected];

  return (
    <section id="experience" className="prototype-section experience-split" aria-labelledby="experience-title">
      <h2 className="experience-concept-title" id="experience-title">Work Experience</h2>
      <div className="split-layout">
        <div className="split-options" role="tablist" aria-label="Work experience roles">
          {experienceRecords.map((item, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={selected === index}
              aria-controls="selected-experience"
              className={selected === index ? "is-selected" : undefined}
              key={`${item.role}-${item.company}`}
              onClick={() => setSelected(index)}
            >
              <strong>{item.role}</strong>
              <span>{item.company}</span>
            </button>
          ))}
        </div>
        <article id="selected-experience" className="split-detail" role="tabpanel">
          <time><Period>{active.period}</Period></time>
          <h3>{active.role}</h3>
          <p className="split-company">{active.company}</p>
          <p>{active.summary}</p>
          <ul>
            {active.focus.map((area) => <li key={area}>{area}</li>)}
          </ul>
        </article>
      </div>
    </section>
  );
}
