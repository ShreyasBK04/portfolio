/**
 * Technical Skills Inventory
 * Categorized technology lists without fake percentage bars.
 * Edit categories or skills as your toolkit expands.
 */
export const skillCategories = [
  {
    id: "languages",
    title: "Programming Languages",
    subtitle: "Core languages for systems, logic, and dynamic client/server apps",
    skills: [
      { name: "Java", level: "Primary", highlight: true },
      { name: "JavaScript", level: "Primary", highlight: true },
      { name: "Python", level: "Proficient", highlight: false },
      { name: "C", level: "Foundational", highlight: false }
    ],
    visible: true
  },
  {
    id: "backend",
    title: "Backend & Architecture",
    subtitle: "Enterprise-grade microservices, ORM, and secure API gateways",
    skills: [
      { name: "Spring Boot", level: "Enterprise", highlight: true },
      { name: "Spring Security", level: "Security", highlight: true },
      { name: "REST APIs", level: "Architecture", highlight: true },
      { name: "Hibernate", level: "ORM", highlight: false },
      { name: "JPA", level: "Persistence", highlight: false }
    ],
    visible: true
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    subtitle: "Modern, responsive, component-driven user interfaces",
    skills: [
      { name: "React.js", level: "SPA Framework", highlight: true },
      { name: "HTML5", level: "Semantic Markup", highlight: false },
      { name: "CSS3", level: "Styling & Flex/Grid", highlight: false },
      { name: "Tailwind CSS", level: "Modern Utility", highlight: true }
    ],
    visible: true
  },
  {
    id: "database",
    title: "Databases & Storage",
    subtitle: "Relational schema design, normalization, and performant querying",
    skills: [
      { name: "MySQL", level: "Relational", highlight: true },
      { name: "PostgreSQL", level: "Object-Relational", highlight: true }
    ],
    visible: true
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    subtitle: "Developer workflows, version control, and containerization",
    skills: [
      { name: "Git", level: "Version Control", highlight: true },
      { name: "GitHub", level: "Collaboration & CI", highlight: true },
      { name: "Docker", level: "Containers", highlight: true },
      { name: "Postman", level: "API Testing", highlight: false },
      { name: "IntelliJ IDEA", level: "Java IDE", highlight: false },
      { name: "VS Code", level: "Editor", highlight: false }
    ],
    visible: true
  }
];

