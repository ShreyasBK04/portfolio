# SBK — The Human Behind The Code
### Cinematic 3D Developer Portfolio for Shreyas B K

> *"AI is powerful. But creativity, engineering and human direction turn it into something meaningful."*

A production-ready, dark editorial developer portfolio built around an approved 10-second cinematic 3D AI battle video. The experience synchronizes HTML5 video playback with GSAP ScrollTrigger to narrate the journey of an engineer mastering code and intelligent systems against autonomous titans.

---

## ⚡ Key Highlights

- **Scroll-Controlled Storytelling**: Scrub forward and reverse through the cinematic fight scene with smooth lerped `requestAnimationFrame` seeking and pinned viewport transitions.
- **Audio & Playback Controls**: Includes an interactive Play Reel button and Audio Unmute/Mute toggle allowing visitors to hear the background score and SFX.
- **Strictly Decoupled Content Layer**: All personal achievements, experience, projects, education, and links live exclusively inside `src/data/`. Zero personal data is hardcoded inside UI components.
- **Clear Distinction Between Employment & Training**: Professional internship at **Invayas Technologies Pvt. Ltd.** is displayed distinctly from structured technical training at **KodNest**.
- **Responsive & Accessible**: Optimized for 4K desktop, laptops, tablets, and mobile smartphones with fluid typography and zero layout overflow.
- **Modern Performance Stack**: React 19 / Vite 6 / GSAP 3 (ScrollTrigger) / Tailwind CSS / Lucide Icons.

---

## 📁 Project Architecture

```
Protfolio/
├── public/
│   ├── videos/
│   │   └── hero-battle.mp4           # Approved 1080p 10-second AI battle video
│   ├── images/
│   │   └── projects/
│   │       ├── contractiq.svg        # ContractIQ UI mockup
│   │       └── research-assistant.svg# Chrome extension UI mockup
│   ├── resume/
│   │   └── resume.pdf                # Downloadable resume PDF
│   └── icons/
├── src/
│   ├── animations/
│   │   ├── scrollTimeline.js         # Editorial entrance animations
│   │   ├── sectionTransitions.js     # Section fade/scrub transitions
│   │   └── videoScrubbing.js         # Scrubber timecode and milestone math
│   ├── components/
│   │   ├── Navbar.jsx                # Responsive glass navigation bar
│   │   ├── CinematicVideo.jsx        # Pinned video scroll controller & overlays
│   │   ├── HeroSection.jsx           # Hero scene coordinator
│   │   ├── ExperienceSection.jsx     # Commercial employment records
│   │   ├── ExperienceCard.jsx        # Reusable editorial card component
│   │   ├── TrainingSection.jsx       # Technical training programs
│   │   ├── ProjectSection.jsx        # Applied engineering showcase
│   │   ├── ProjectCard.jsx           # Project card with conditional links
│   │   ├── SkillsSection.jsx         # Categorized skills matrix (no fake bars)
│   │   ├── EducationSection.jsx      # Academic foundation & CGPA
│   │   ├── VictorySection.jsx        # Emotional high point & brand pillars
│   │   ├── ContactSection.jsx        # Professional links, email copy & socials
│   │   ├── Footer.jsx                # Editorial footer & return to top
│   │   └── Icons.jsx                 # Custom SVG icons (GitHub, LinkedIn, LeetCode)
│   ├── data/
│   │   ├── portfolioData.js          # Brand identity, intro, philosophy, victory
│   │   ├── experience.js             # Work experience & KodNest training
│   │   ├── projects.js               # ContractIQ, Chrome Extension, etc.
│   │   ├── skills.js                 # Categorized programming & tooling stack
│   │   ├── education.js              # Canara Engineering College & CGPA (8.16)
│   │   ├── certificates.js           # Verified credentials
│   │   └── socialLinks.js            # Email, LinkedIn, GitHub, LeetCode
│   ├── hooks/
│   │   └── useScrollVideo.js         # GSAP ScrollTrigger video binder
│   ├── pages/
│   │   └── Home.jsx                  # Main single-page application
│   ├── styles/
│   │   ├── global.css                # Base Tailwind imports & grain styling
│   │   ├── typography.css            # Space Grotesk / Inter typography
│   │   └── animations.css            # Subtle glowing borders and keyframes
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🛠️ Getting Started Locally

### 1. Requirements
- Node.js (v18.0.0 or higher recommended; developed and verified on v24.11.0)
- npm (v9.0.0 or higher)

### 2. Installation
Open your terminal in the project directory:
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized production bundle inside the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📖 Managing & Editing Content (Step-by-Step)

All personal data is isolated inside `src/data/`. You never need to touch React UI components to update your information.

### 1. How to Replace or Update the Portfolio Video
1. Place your new video file inside `public/videos/hero-battle.mp4`.
2. Keep the filename as `hero-battle.mp4` or update the path in `src/data/portfolioData.js`:
   ```javascript
   assets: {
     heroVideo: "/videos/hero-battle.mp4",
     resumePdf: "/resume/resume.pdf"
   }
   ```

### 2. How to Add a New Work Experience
Open `src/data/experience.js` and append to the `experiences` array:
```javascript
export const experiences = [
  // Existing experiences...
  {
    id: 2,
    company: "NextGen Software Corp",
    role: "Backend Engineer",
    type: "Full-Time",
    duration: "Jul 2026 – Present",
    location: "Bengaluru, India",
    description: "Architecting high-concurrency microservices and distributed event queues.",
    responsibilities: [
      "Designed event-driven services using Apache Kafka and Spring Boot.",
      "Optimized PostgreSQL queries, reducing p99 latency by 45%."
    ],
    technologies: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Docker"],
    featured: true,
    visible: true // Set to false to hide without deleting
  }
];
```

### 3. How to Remove or Hide an Experience
To remove an experience, delete its object from `src/data/experience.js`, or simply toggle `visible: false`:
```javascript
{
  id: 1,
  company: "Invayas Technologies Pvt. Ltd.",
  visible: false // Hidden from the website immediately
}
```

### 4. How to Add a New Project
Open `src/data/projects.js` and add an entry:
```javascript
{
  id: 3,
  title: "CloudPulse — Distributed Health Monitoring System",
  tagline: "Real-time Metrics & Anomaly Detection",
  category: "Distributed Systems & Cloud",
  description: "A lightweight distributed telemetry monitor analyzing microservice heartbeat pings.",
  features: [
    "Sub-millisecond WebSocket data broadcasting",
    "Automated latency threshold alerting via email",
    "PostgreSQL time-series database partitioning"
  ],
  technologies: ["Java", "Spring Boot", "React.js", "Docker", "PostgreSQL"],
  image: "/images/projects/cloudpulse.png", // Or .svg
  githubUrl: "https://github.com/shreyasbk/cloudpulse", // If null or empty, button is omitted
  liveUrl: "https://cloudpulse-demo.com",
  featured: true,
  visible: true
}
```
> **Rule**: If `githubUrl` or `liveUrl` is `null` or `""`, the button is automatically excluded to prevent broken or fake links.

### 5. How to Change Project Screenshots
1. Save your project image or SVG into `public/images/projects/` (e.g. `public/images/projects/my-screenshot.png`).
2. Update the `image` field in `src/data/projects.js`:
   ```javascript
   image: "/images/projects/my-screenshot.png"
   ```

### 6. How to Add or Modify Technical Skills
Open `src/data/skills.js`. You can add new items to existing categories or define a new category:
```javascript
{
  id: "languages",
  title: "Programming Languages",
  subtitle: "Core languages for systems and logic",
  skills: [
    { name: "Java", level: "Primary", highlight: true },
    { name: "JavaScript", level: "Primary", highlight: true },
    { name: "TypeScript", level: "Proficient", highlight: true }, // Newly added
    { name: "Python", level: "Proficient", highlight: false },
    { name: "C", level: "Foundational", highlight: false }
  ],
  visible: true
}
```

### 7. How to Update Social Links & Contact Info
Open `src/data/socialLinks.js` to change your profiles:
```javascript
export const socialLinks = [
  {
    name: "LinkedIn",
    label: "LinkedIn Profile",
    url: "https://www.linkedin.com/in/YOUR_ACTUAL_USERNAME",
    handle: "linkedin.com/in/YOUR_ACTUAL_USERNAME",
    icon: "Linkedin",
    visible: true
  },
  // ...
];
```

To change your primary email or contact heading, open `src/data/portfolioData.js`:
```javascript
contact: {
  heading: "Have an idea? Let's build something meaningful.",
  subheading: "Whether you have an exciting project or a job opportunity, I'd love to connect.",
  email: "your.actual.email@gmail.com",
}
```

### 8. How to Replace Your Resume PDF
1. Replace `public/resume/resume.pdf` with your updated resume file.
2. Keep the filename as `resume.pdf`. The download buttons in the Navbar, Hero, and Contact sections will automatically serve your latest file.

---

## 🚀 Deployment Guide

### Deploy to Vercel
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Vercel will automatically detect **Vite**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

### Deploy to Netlify
1. Connect your repository on [netlify.com](https://netlify.com).
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Click **Deploy Site**.

---

## 🎨 Color System & Aesthetics

- **Primary Background**: `#090A0D`
- **Secondary Background**: `#111319`
- **Card Background**: `#151820`
- **Primary Accent**: `#FF7900` (Energetic Neon Orange)
- **Secondary Accent**: `#FFAA32` (Warm Amber Glow)
- **Main Text**: `#F5F5F5`
- **Secondary Text**: `#A5A9B2`
- **Fonts**: Space Grotesk (Editorial Headings & Brand) / Inter (Body & Data)

---

## 🏆 Checklist of Completed Specifications

- [x] Approved 1080p final video copied to `public/videos/hero-battle.mp4`
- [x] Character appearance, fighting choreography, and audio preserved
- [x] ScrollTrigger video scrub with reverse playback and play/pause/audio toggles
- [x] Scene 01: Hero with Introduction, CTA buttons ("Explore My Work", "Download Resume")
- [x] Scene 02: Invayas Technologies Pvt. Ltd. Full Stack Developer Intern (Feb 2026 – May 2026)
- [x] Scene 03: KodNest Full Stack Developer Training (Clearly distinguished from commercial employment)
- [x] Scene 04: ContractIQ (AI Legal Contract Analyzer) & Smart AI Research Assistant Chrome Extension
- [x] Scene 05: Categorized Technical Skills (Languages, Frontend, Backend, Database, Tools - no fake percentage bars)
- [x] Scene 06: Canara Engineering College, B.E. Computer Science, CGPA: 8.16
- [x] Scene 07: Emotional High Point — "Still Learning. Always Building."
- [x] Scene 08: Clean Contact Section with copy-to-clipboard, Email, LinkedIn, GitHub, LeetCode, and Resume Download
- [x] Full responsive design from mobile to desktop
- [x] Decoupled content management in `src/data/` with `visible: true/false` flags
- [x] Complete test build verification (`npm run build` passed)
