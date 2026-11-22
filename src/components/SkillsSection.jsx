import React, { useEffect, useRef } from 'react';
import { skillCategories } from '../data/skills';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SkillsSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const visibleCategories = skillCategories.filter((c) => c.visible !== false);

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

      const columns = sectionRef.current?.querySelectorAll('.skill-column');
      if (columns && columns.length > 0) {
        gsap.fromTo(
          columns,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.1,
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
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="editorial-section relative py-16 sm:py-20 bg-[#090A0D]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div ref={headingRef} className="mb-8 sm:mb-10">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#FF7900] tracking-widest uppercase mb-2">
            <span className="w-4 h-[2px] bg-[#FF7900] inline-block" />
            <span>SKILLS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
            My technical toolkit<span className="text-[#FF7900]">.</span>
          </h2>

          <p className="mt-2 text-sm sm:text-base text-content-secondary max-w-2xl font-body leading-relaxed">
            Technologies and tools I use to build, test, and deploy applications.
          </p>

          <div className="w-full h-px bg-white/10 my-6 sm:my-8" />
        </div>

        {/* 4 Grouped Lists Matching Visual Reference Screenshot */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {visibleCategories.map((category) => (
            <div key={category.id} className="skill-column">
              <h3 className="text-sm font-bold font-display text-[#FF7900] tracking-wide mb-4">
                {category.title}
              </h3>

              <ul className="space-y-3 font-body">
                {category.skills.map((skill, sIdx) => (
                  <li
                    key={sIdx}
                    className="flex items-center text-sm text-content-main hover:text-white transition-colors"
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-[1px] bg-[#FF7900] mr-2.5 inline-block shrink-0" 
                      aria-hidden="true"
                    />
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
