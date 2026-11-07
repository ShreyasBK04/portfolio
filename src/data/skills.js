/**
 * Technical Skills Inventory
 * Sourced directly from resume.
 * Categorized technology lists without fake percentage bars.
 */
export const skillCategories = [
  {
    id: "languages",
    title: "Languages",
    subtitle: "Core programming and scripting languages",
    skills: [
      { name: "Java", level: "Primary", highlight: true },
      { name: "JavaScript", level: "Primary", highlight: true },
      { name: "Python", level: "Proficient", highlight: true }
    ],
    visible: true
  },
  {
    id: "backend",
    title: "Backend & Database",
    subtitle: "Enterprise backend frameworks, ORM, APIs, and relational databases",
    skills: [
      { name: "Spring Boot", level: "Framework", highlight: true },
      { name: "Hibernate", level: "ORM", highlight: true },
      { name: "REST APIs", level: "Architecture", highlight: true },
      { name: "MySQL", level: "Relational DB", highlight: true }
    ],
    visible: true
  },
  {
    id: "frontend",
    title: "Frontend",
    subtitle: "Modern, responsive web client technologies",
    skills: [
      { name: "React.js", level: "UI Library", highlight: true },
      { name: "HTML5", level: "Markup", highlight: false },
      { name: "CSS3", level: "Styling", highlight: false }
    ],
    visible: true
  },
  {
    id: "tools",
    title: "Testing & Tools",
    subtitle: "Testing frameworks, API development, and version control",
    skills: [
      { name: "JUnit 5", level: "Testing", highlight: true },
      { name: "Postman", level: "API Testing", highlight: true },
      { name: "Git", level: "Version Control", highlight: true },
      { name: "GitHub", level: "Collaboration", highlight: true }
    ],
    visible: true
  }
];
