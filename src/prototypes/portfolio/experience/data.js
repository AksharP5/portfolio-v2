import { experience } from "../../../data";

const detailsByRole = {
  "Data Analyst": {
    summary: "Analysis, reporting, and workflow improvements that make information easier to act on.",
    focus: ["Data analysis", "Reporting", "Automation"],
  },
  "Desktop Support Assistant": {
    summary: "Technical support for the devices, software, and access issues used across campus.",
    focus: ["Device support", "Troubleshooting", "Campus IT"],
  },
  "Peer Tutor": {
    summary: "Individual and small-group support for students working through computer science coursework.",
    focus: ["Computer science", "Peer learning", "Coursework"],
  },
  "B.S. Computer Science": {
    summary: "Computer science study spanning software development, systems, and applied problem solving.",
    focus: ["Software", "Systems", "Problem solving"],
  },
};

export const experienceRecords = experience.map((item) => ({
  ...item,
  ...detailsByRole[item.role],
  current: item.period.includes("Present"),
}));
