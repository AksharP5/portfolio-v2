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
    details: [
      "Provided technical support by answering phone calls and remotely accessing users' devices to troubleshoot and resolve issues efficiently.",
      "Assisted users in person, addressing walk-in inquiries and delivering prompt solutions to technical challenges.",
      "Re-imaged devices to maintain system integrity and improve performance, facilitating a smooth user experience.",
      "Set up labs, classrooms, and faculty workstations, ensuring all equipment was operational and ready for use.",
    ],
    focus: ["Device support", "Troubleshooting", "Campus IT"],
  },
  "Peer Tutor": {
    details: [
      "Adapted teaching methods to accommodate diverse learning styles and ensure comprehension of challenging subjects.",
      "Developed supplementary materials and resources to reinforce learning and address specific student needs.",
      "Facilitated one-on-one tutoring sessions, helping students grasp complex computer science concepts and improve their academic performance.",
      "Assisted peers in understanding programming languages and algorithms through tailored explanations and practical examples.",
    ],
    focus: ["Computer science", "Peer learning", "Coursework"],
  },
  "B.S. Computer Science": {
    details: [
      "Bachelor of Science in Computer Science.",
      "Graduated with a 3.99 GPA.",
      "Relevant coursework included Software Engineering, Parallel Computing, Programming Languages, Data Structures, Design and Analysis of Algorithms, Software Development, Software Design, Advanced Discrete Mathematics, Database Management Systems, Image Processing, Theory of Computation, and Foundations of Human-Computer Interaction.",
    ],
    focus: ["Software", "Systems", "Problem solving"],
  },
};

export const experienceRecords = experience.map((item) => ({
  ...item,
  ...detailsByRole[item.role],
  current: item.period.includes("Present"),
}));
