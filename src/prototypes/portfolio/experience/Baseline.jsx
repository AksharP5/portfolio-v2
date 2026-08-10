import { Period } from "../content";
import { experienceRecords } from "./data";

export default function Baseline() {
  return (
    <section id="experience" className="prototype-section" aria-labelledby="experience-title">
      <h2 className="section-title" id="experience-title">Work Experience</h2>
      <div className="experience-list">
        {experienceRecords.map((item, index) => (
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
  );
}
