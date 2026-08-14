import { experience } from "../../../data";

const detailsByRole = {
  "Data Analyst": {
    summary: "Automating VOC classification, Snowflake self-service analytics, dbt reporting workflows, and AWS-to-Snowflake data pipelines.",
    focus: ["Snowflake", "dbt", "Automation"],
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
    summary: "B.S. in Computer Science with a 3.99 GPA.",
    focus: ["Software", "Systems", "Problem solving"],
  },
};

export const experienceRecords = experience.map((item) => ({
  ...item,
  ...detailsByRole[item.role],
  current: item.period.includes("Present"),
}));
