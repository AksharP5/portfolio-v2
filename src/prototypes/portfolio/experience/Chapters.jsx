import { Period } from "../content";
import { experienceRecords } from "./data";

export default function Chapters() {
  return (
    <section id="experience" className="prototype-section experience-chapters" aria-labelledby="experience-title">
      <h2 id="experience-title">Work Experience</h2>
      <div className="chapter-list">
        {experienceRecords.map((item) => (
          <article key={`${item.role}-${item.company}`}>
            <div className="chapter-title">
              <h3>{item.role}</h3>
              <time><Period>{item.period}</Period></time>
            </div>
            <p className="chapter-company">{item.company}</p>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
