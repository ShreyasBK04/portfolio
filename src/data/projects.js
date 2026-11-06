/**
 * Projects Showcase
 * Add or edit projects here.
 * Set githubUrl or liveUrl to null or empty string if not available yet;
 * the UI will automatically omit the button without breaking.
 */
export const projects = [
  {
    id: 1,
    title: "ContractIQ — AI Powered Legal Contract Analyzer",
    tagline: "Enterprise Legal Tech & Clause Risk Intelligence",
    category: "Full Stack & AI",
    description: "An intelligent legal document analysis platform that ingests complex PDF contracts, extracts clauses, detects potential legal liabilities, and delivers instant AI risk assessments with comprehensive reporting.",
    features: [
      "AI-powered deep contract clause analysis and risk breakdown",
      "Fast PDF text extraction and document parsing pipeline",
      "Automated legal clause classification and ambiguity detection",
      "AI-generated risk assessments with actionable mitigation advice",
      "Role-based authentication, JWT security, and protected Spring Boot REST APIs"
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "React.js",
      "PostgreSQL",
      "Spring Security",
      "JWT",
      "Gemini API",
      "Tailwind CSS"
    ],
    image: "/images/projects/contractiq.svg",
    // Replace with your actual GitHub or live links. If null/empty, the button is omitted.
    githubUrl: null,
    liveUrl: null,
    featured: true,
    visible: true
  },
  {
    id: 2,
    title: "Smart AI Research Assistant — Chrome Extension",
    tagline: "In-Browser Contextual Intelligence & Knowledge Synthesis",
    category: "Browser Extension & Backend",
    description: "A productivity Chrome Extension operating directly in the browser side-panel. Allows users to highlight dense webpage text, generate instant AI summaries, take structured research notes, and synchronize with a reactive Spring Boot microservice.",
    features: [
      "Native Chrome Extension Manifest V3 side-panel user interface",
      "Seamless webpage text selection and instant AI-powered summarization",
      "Local and cloud note-taking with quick reference tags",
      "High-performance Spring Boot REST backend utilizing WebClient",
      "Dynamic prompt engineering with Google's Gemini API for precision answers"
    ],
    technologies: [
      "Chrome Extension (Manifest V3)",
      "JavaScript",
      "Spring Boot",
      "WebClient",
      "Gemini API"
    ],
    image: "/images/projects/research-assistant.svg",
    // Replace with your actual GitHub or live links. If null/empty, the button is omitted.
    githubUrl: null,
    liveUrl: null,
    featured: true,
    visible: true
  }
];
