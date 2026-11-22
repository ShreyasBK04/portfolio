import React, { useEffect, useRef } from 'react';
import { experiences } from '../data/experience';
import { ExperienceCard } from './ExperienceCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const visibleExperiences = experiences.filter((e) => e.visible !== false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Subtle header reveal
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

      // Subtle content fade-in
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="editorial-section relative py-16 sm:py-20 bg-[#090A0D]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div ref={headingRef}>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#FF7900] tracking-widest uppercase mb-2">
            <span className="w-4 h-[2px] bg-[#FF7900] inline-block" />
            <span>EXPERIENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
            A little about my work<span className="text-[#FF7900]">.</span>
          </h2>

          <p className="mt-2 text-sm sm:text-base text-content-secondary max-w-2xl font-body leading-relaxed">
            My experience in software development and technical training.
          </p>

          {/* Thin Neutral Divider Line */}
          <div className="w-full h-px bg-white/10 my-6 sm:my-8" />
        </div>

        {/* Experience Timeline Container */}
        <div ref={contentRef} className="space-y-8">
          {visibleExperiences.map((exp) => (
            <div key={exp.id} className="experience-item">
              <ExperienceCard experience={exp} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
