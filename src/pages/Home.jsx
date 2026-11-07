import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { TrainingSection } from '../components/TrainingSection';
import { ProjectSection } from '../components/ProjectSection';
import { SkillsSection } from '../components/SkillsSection';
import { EducationSection } from '../components/EducationSection';
import { VictorySection } from '../components/VictorySection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { initEditorialReveals } from '../animations/scrollTimeline';
import { initSectionTransitions } from '../animations/sectionTransitions';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  useEffect(() => {
    initSectionTransitions();
    initEditorialReveals(document.body);

    // Refresh ScrollTrigger calculations after initial mount and layout settlement
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#090A0D] text-[#F5F5F5] overflow-x-hidden selection:bg-[#FF7900] selection:text-black">
      {/* Subtle cinematic grain overlay */}
      <div className="film-grain" />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Story & Experience flow */}
      <main>
        {/* SCENE 01: Hero & Scroll-controlled Cinematic Video */}
        <HeroSection />

        {/* SCENE 02: Professional Commercial Experience */}
        <ExperienceSection />

        {/* SCENE 03: Training & Development */}
        <TrainingSection />

        {/* SCENE 04: Featured Projects */}
        <ProjectSection />

        {/* SCENE 05: Technical Skills */}
        <SkillsSection />

        {/* SCENE 06: Education */}
        <EducationSection />

        {/* SCENE 07: The Victory */}
        <VictorySection />

        {/* SCENE 08: Contact & Profiles */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

