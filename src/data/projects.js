/**
 * Projects Showcase
 * Exact project specifications & implementation details for recruiters.
 */
export const projects = [
  {
    id: 1,
    title: "RankPulse – SEO Rank Tracking & Analyzer",
    tagline: "Full-Stack SEO Monitoring & Keyword Intelligence",
    category: "Full Stack & Web Architecture",
    description: "Developed a full-stack SEO rank tracking application using Java, Spring Boot, React.js, and MySQL, enabling users to manage multiple websites and monitor Google keyword rankings.",
    keyImplementation: [
      "Integrated SearchAPI.io using Spring RestClient.",
      "Implemented automated daily ranking checks with Spring Scheduling.",
      "Stored historical ranking data to track keyword position changes.",
      "Developed RESTful APIs using Spring Data JPA, DTOs, validation, and global exception handling.",
      "Built a responsive React dashboard featuring interactive ranking charts, analytics, pagination, and ranking alerts."
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "React.js",
      "MySQL",
      "REST APIs"
    ],
    image: "/images/projects/rankpulse.svg",
    githubUrl: "https://github.com/ShreyasBK04/RankPulse-SEO-Rank-Tracking-Analytics-Platform",
    liveUrl: "",
    featured: true,
    visible: true
  },
  {
    id: 2,
    title: "ContractIQ – AI-Powered Contract Risk Analyzer",
    tagline: "Legal Tech & AI Document Intelligence",
    category: "Full Stack & AI",
    description: "Developed a full-stack contract analysis application using Spring Boot and React.js to process PDF documents and assess contractual risks.",
    keyImplementation: [
      "Integrated Google Gemini API and Apache PDFBox for PDF text extraction, clause analysis, contract summarization, and risk classification.",
      "Implemented temporary document processing.",
      "Added consent validation.",
      "Implemented PDF report generation without persistent document storage."
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "React.js",
      "HTML5",
      "CSS3",
      "REST APIs",
      "Google Gemini API",
      "Apache PDFBox"
    ],
    image: "/images/projects/contractiq.svg",
    githubUrl: "https://github.com/ShreyasBK04/ContractIQ-AI_Powered_Contract-_Risk-_Analyzer",
    featured: true,
    visible: true
  }
];
