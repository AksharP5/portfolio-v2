import { experience } from "../../../data";

const detailsByRole = {
  "Data Analyst": {
    details: [
      {
        text: "Automated the end-to-end VOC detail-classification workflow using text embeddings and retrieval-augmented generation (RAG), eliminating manual processing by 30+ hours per week.",
        emphasis: [
          "VOC detail-classification workflow",
          "text embeddings",
          "retrieval-augmented generation (RAG)",
          "30+ hours per week",
        ],
      },
      {
        text: "Built a VOC Snowflake agent for stakeholders to query data in natural language, improving self-service access to business data.",
        emphasis: ["Snowflake agent"],
      },
      {
        text: "Developed an automated dbt save-tracker pipeline, reducing daily manual effort by 80%, saving 10+ hours per week, and increasing reporting accuracy.",
        emphasis: ["dbt", "80%", "10+ hours per week"],
      },
      {
        text: "Led the AWS-to-Snowflake migration by designing dbt models and transformation workflows that standardized data pipelines, improved query performance, and increased reliability for downstream reporting.",
        emphasis: ["AWS", "Snowflake"],
      },
    ],
    focus: ["Snowflake", "dbt", "Automation"],
  },
  "Desktop Support Assistant": {
    details: [
      { text: "Provided technical support by answering phone calls and remotely accessing users' devices to troubleshoot and resolve issues efficiently.", emphasis: [] },
      { text: "Assisted users in person, addressing walk-in inquiries and delivering prompt solutions to technical challenges.", emphasis: [] },
      { text: "Re-imaged devices to maintain system integrity and improve performance, facilitating a smooth user experience.", emphasis: [] },
      { text: "Set up labs, classrooms, and faculty workstations, ensuring all equipment was operational and ready for use.", emphasis: [] },
    ],
    focus: ["Device support", "Troubleshooting", "Campus IT"],
  },
  "Peer Tutor": {
    details: [
      { text: "Adapted teaching methods to accommodate diverse learning styles and ensure comprehension of challenging subjects.", emphasis: [] },
      { text: "Developed supplementary materials and resources to reinforce learning and address specific student needs.", emphasis: [] },
      { text: "Facilitated one-on-one tutoring sessions, helping students grasp complex computer science concepts and improve their academic performance.", emphasis: [] },
      { text: "Assisted peers in understanding programming languages and algorithms through tailored explanations and practical examples.", emphasis: [] },
    ],
    focus: ["Computer science", "Peer learning", "Coursework"],
  },
  "B.S. Computer Science": {
    details: [
      { text: "Bachelor of Science in Computer Science.", emphasis: [] },
      { text: "Graduated with a 3.99 GPA.", emphasis: [] },
      { text: "Relevant coursework included Software Engineering, Parallel Computing, Programming Languages, Data Structures, Design and Analysis of Algorithms, Software Development, Software Design, Advanced Discrete Mathematics, Database Management Systems, Image Processing, Theory of Computation, and Foundations of Human-Computer Interaction.", emphasis: [] },
    ],
    focus: ["Software", "Systems", "Problem solving"],
  },
};

export const experienceRecords = experience.map((item) => ({
  ...item,
  ...detailsByRole[item.role],
  current: item.period.includes("Present"),
}));
