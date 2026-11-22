/**
 * Technical Skills Inventory
 * Sourced directly from visual reference screenshot & resume.
 */
export const skillCategories = [
  {
    id: "languages",
    title: "Languages",
    skills: [
      { name: "Java", priority: true },
      { name: "C", priority: false },
      { name: "JavaScript", priority: false },
      { name: "Python", priority: false }
    ],
    visible: true
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Spring Boot", priority: true },
      { name: "Hibernate (JPA)", priority: false },
      { name: "REST APIs", priority: false }
    ],
    visible: true
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React.js", priority: false },
      { name: "HTML", priority: false },
      { name: "CSS", priority: false },
    ],
    visible: true
  },
  {
    id: "tools",
    title: "Database & Tools",
    skills: [
      { name: "MySQL", priority: false },
      { name: "Postman", priority: false },
      { name: "Git & GitHub", priority: false },
      { name: "Docker", priority: false },
      { name: "Maven", priority: false }
    ],
    visible: true
  }
];
