/**
 * Projects Showcase
 * Single source of truth from resume.
 * 
 * GitHub & Live Demo Action Buttons:
 * - Enter your repository URL in `githubUrl` to display the "GitHub Repository" button.
 * - Enter your live deployment URL in `liveUrl` to display the "Live Demo" button.
 * - If left empty or null, that button is automatically hidden without breaking layout.
 */
export const projects = [
  {
    id: 1,
    title: "ContractIQ – AI Powered Legal Contract Analyzer",
    tagline: "Legal Tech & AI Clause Risk Analysis",
    category: "Full Stack & AI",
    description: "Full-stack application built with React, Spring Boot and PostgreSQL, integrating Gemini API for automated legal clause risk analysis and PDF text extraction.",
    features: [
      "Integrated the Google Gemini API with a Spring Boot backend to analyze legal contract clauses and generate AI-based risk assessments.",
      "Implemented PDF text extraction and processing to prepare contract content for AI-powered analysis.",
      "Collaborated on a full-stack application built with React, Spring Boot and PostgreSQL, with authentication and role-based access control."
    ],
    technologies: [
      "Spring Boot",
      "React.js",
      "PostgreSQL",
      "Spring Security",
      "JWT",
      "Tailwind CSS",
      "Gemini API"
    ],
    image: "/images/projects/contractiq.svg",
    githubUrl: "https://github.com/ShreyasBK04/ContractIQ-AI-Powered-Contract-Risk-Analyzer",
    liveUrl: "",   // e.g. "https://contractiq-demo.vercel.app"
    featured: true,
    visible: true
  },
  {
    id: 2,
    title: "Smart AI Research Assistant – Chrome Extension",
    tagline: "In-Browser Contextual AI & Research Synthesis",
    category: "Chrome Extension & Backend",
    description: "Chrome extension with a side-panel UI to select webpage text, persist user notes, and generate instant summaries using a Spring Boot WebClient and Gemini API backend.",
    features: [
      "Built a Chrome extension with a side-panel UI to select webpage text and generate AI-powered summaries using the Gemini API.",
      "Used Chrome Extension APIs to capture selected text from the active tab and persist user notes.",
      "Developed a Spring Boot REST backend that dynamically builds prompts based on the requested operation and forwards them to the Gemini API."
    ],
    technologies: [
      "Chrome Extension (Manifest V3)",
      "JavaScript",
      "Spring Boot",
      "WebClient",
      "Gemini API"
    ],
    image: "/images/projects/research-assistant.svg",
    githubUrl: "https://github.com/ShreyasBK04/Smart-AI-Research-Assistant",
    liveUrl: "",   // e.g. "https://chrome.google.com/webstore/..."
    featured: true,
    visible: true
  }
];
