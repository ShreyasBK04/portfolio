import React, { useEffect, useRef } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProjectSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const visibleProjects = projects.filter((p) => p.visible !== false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      const cards = sectionRef.current?.querySelectorAll('.project-card-item');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [visibleProjects.length]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="editorial-section relative py-16 sm:py-20 bg-[#090A0D]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div ref={headingRef} className="mb-8 sm:mb-10">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#FF7900] tracking-widest uppercase mb-2">
            <span className="w-4 h-[2px] bg-[#FF7900] inline-block" />
            <span>PROJECTS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
            Things I've built<span className="text-[#FF7900]">.</span>
          </h2>

          <p className="mt-2 text-sm sm:text-base text-content-secondary max-w-2xl font-body leading-relaxed">
            A collection of projects that showcase my skills in full-stack development and AI integration.
          </p>

          <div className="w-full h-px bg-white/10 my-6 sm:my-8" />
        </div>

        {/* Project Cards List */}
        <div className="space-y-6 sm:space-y-8">
          {visibleProjects.map((project) => (
            <div key={project.id} className="project-card-item">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
