import { Period } from "../content";
import { experienceRecords } from "./data";

export default function Ledger() {
  return (
    <section id="experience" className="prototype-section experience-ledger" aria-labelledby="experience-title">
      <div className="ledger-heading">
        <h2 id="experience-title">Experience Ledger</h2>
        <span>{experienceRecords.length} entries</span>
      </div>
      <div className="ledger-table" role="table" aria-label="Work experience">
        <div className="ledger-row ledger-labels" role="row">
          <span role="columnheader">Period</span>
          <span role="columnheader">Organization</span>
          <span role="columnheader">Role</span>
        </div>
        {experienceRecords.map((item) => (
          <div className="ledger-row" role="row" key={`${item.role}-${item.company}`}>
            <time role="cell"><Period>{item.period}</Period></time>
            <span role="cell">{item.company}</span>
            <strong role="cell">{item.role}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
