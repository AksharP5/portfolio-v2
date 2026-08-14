import { experience } from "../../../data";

const detailsByRole = {
  "Data Analyst": {
    details: [
      "Automated the end-to-end VOC detail-classification workflow using text embeddings and retrieval-augmented generation (RAG), eliminating manual processing by 30+ hours per week.",
      "Built a VOC Snowflake agent for stakeholders to query data in natural language, improving self-service access to business data.",
      "Developed an automated dbt save-tracker pipeline, reducing daily manual effort by 80%, saving 10+ hours per week, and increasing reporting accuracy.",
      "Led the AWS-to-Snowflake migration by designing dbt models and transformation workflows that standardized data pipelines, improved query performance, and increased reliability for downstream reporting.",
    ],
    focus: ["Snowflake", "dbt", "Automation"],
  },
  "Desktop Support Assistant": {
    details: ["Technical support for the devices, software, and access issues used across campus."],
    focus: ["Device support", "Troubleshooting", "Campus IT"],
  },
  "Peer Tutor": {
    details: ["Individual and small-group support for students working through computer science coursework."],
    focus: ["Computer science", "Peer learning", "Coursework"],
  },
  "B.S. Computer Science": {
    details: ["B.S. in Computer Science with a 3.99 GPA."],
    focus: ["Software", "Systems", "Problem solving"],
  },
};

export const experienceRecords = experience.map((item) => ({
  ...item,
  ...detailsByRole[item.role],
  current: item.period.includes("Present"),
}));
