import React, { useRef, useEffect, useState } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { Layers, ArrowRight, ArrowLeft, MoveRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProjectSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const visibleProjects = projects.filter((p) => p.visible !== false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Large Screens (>= 1024px): Pinned Horizontal Scrolling
      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        // Dynamic calculation of horizontal travel distance
        const calculateDistance = () => {
          return track.scrollWidth - window.innerWidth + 120;
        };

        const tween = gsap.to(track, {
          x: () => -calculateDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1.1, // Smooth cinematic scrub
            start: "top top",
            end: () => `+=${calculateDistance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const currentProgress = self.progress;
              setProgress(currentProgress);
              
              // Calculate which project is in focus
              const totalItems = visibleProjects.length;
              if (totalItems > 0) {
                const idx = Math.min(
                  totalItems - 1,
                  Math.floor(currentProgress * totalItems)
                );
                setActiveProjectIndex(idx);
              }
            }
          }
        });

        return () => {
          if (tween.scrollTrigger) tween.scrollTrigger.kill();
          tween.kill();
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [visibleProjects.length]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="editorial-section relative bg-[#090A0D] overflow-hidden select-none"
    >
      {/* DESKTOP PINNED HORIZONTAL VIEW (>= 1024px) */}
      <div className="hidden lg:flex flex-col justify-between w-full h-screen py-10 px-8 xl:px-12 relative overflow-hidden">
        
        {/* Top Sticky Editorial Header & Progress Bar */}
        <div className="w-full flex items-center justify-between border-b border-white/10 pb-4 relative z-20">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent tracking-widest uppercase">
              <Layers className="w-4 h-4" />
              <span>SCENE 04 // APPLIED ENGINEERING SHOWCASE</span>
            </div>
            <h2 className="text-3xl xl:text-4xl font-extrabold font-display text-white tracking-tight mt-1">
              Featured <span className="text-gradient-orange">Projects.</span>
            </h2>
          </div>

          {/* Project Counter & Horizontal Scrub Bar */}
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <span className="text-xs font-mono text-content-muted block">SHOWCASE NAVIGATION</span>
              <div className="text-sm font-mono text-white">
                <span className="text-accent font-bold">
                  {String(activeProjectIndex + 1).padStart(2, '0')}
                </span>
                <span className="mx-1 text-white/30">/</span>
                <span>{String(visibleProjects.length).padStart(2, '0')}</span>
              </div>
            </div>

            <div className="w-40 xl:w-56 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
              <div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-accent to-[#FFAA32] rounded-full transition-all duration-75"
                style={{ width: `${Math.min(100, Math.max(5, progress * 100))}%` }}
              />
            </div>

            <div className="flex items-center space-x-1 text-xs font-mono text-content-secondary bg-[#151820] px-3 py-1.5 rounded-lg border border-white/10">
              <span>Scroll Down to Pan</span>
              <MoveRight className="w-3.5 h-3.5 text-accent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Dynamic Horizontal Scrolling Track */}
        <div className="relative w-full flex-1 flex items-center overflow-hidden my-auto">
          <div
            ref={trackRef}
            className="flex items-center space-x-12 pl-4 pr-32 will-change-transform"
          >
            {/* Gallery Introductory Milestone Card */}
            <div className="w-[380px] xl:w-[420px] shrink-0 p-8 rounded-2xl bg-[#111319] border border-white/10 flex flex-col justify-between h-[480px]">
              <div>
                <span className="text-xs font-mono text-[#FFAA32] uppercase tracking-widest block mb-2">
                  CASE STUDIES // 2026
                </span>
                <h3 className="text-2xl xl:text-3xl font-extrabold font-display text-white tracking-tight leading-snug">
                  Full Stack &amp; Intelligent System Deployments.
                </h3>
                <p className="text-sm text-content-secondary font-body leading-relaxed mt-4">
                  Each project represents end-to-end software architecture combining Java microservices, Spring Boot backends, PostgreSQL, and contextual Gemini API integrations.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-content-muted">
                <span>{visibleProjects.length} Verified Case Studies</span>
                <span className="text-accent flex items-center space-x-1">
                  <span>Scroll to Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Dynamic Project Cards */}
            {visibleProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                isHorizontal={true}
              />
            ))}

            {/* Ending Transition Pill (Seamlessly leads into Skills) */}
            <div className="w-[320px] shrink-0 p-8 rounded-2xl bg-gradient-to-br from-[#151820] to-[#090A0D] border border-accent/30 flex flex-col justify-between h-[480px] shadow-glow-sm">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">
                  NEXT SECTION
                </span>
                <h4 className="text-2xl font-bold font-display text-white tracking-tight leading-snug">
                  Technical Stack &amp; Core Disciplines.
                </h4>
                <p className="text-xs text-content-secondary mt-3 leading-relaxed">
                  Continue scrolling down to explore languages, backend frameworks, relational databases, and developer tooling.
                </p>
              </div>

              <a
                href="#skills"
                className="inline-flex items-center justify-between w-full p-3 rounded-lg bg-accent hover:bg-[#FFAA32] text-black text-xs font-bold font-display uppercase tracking-wider transition-colors"
              >
                <span>View Skills Matrix</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Ambient Vignette & Status */}
        <div className="w-full flex items-center justify-between text-[11px] font-mono text-content-muted pt-2 border-t border-white/5 relative z-20">
          <span>Horizontal Gallery Controller Active</span>
          <span className="text-[#FFAA32]">GSAP ScrollTrigger Pinned Showcase</span>
        </div>
      </div>

      {/* TABLET & MOBILE RESPONSIVE VIEW (< 1024px) */}
      {/* Uses native accessible vertical flow / touch carousel with zero scroll hijacking */}
      <div className="lg:hidden py-16 px-4 sm:px-6">
        
        {/* Mobile Header */}
        <div className="mb-10 border-b border-white/10 pb-6">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent mb-2 tracking-widest uppercase">
            <Layers className="w-4 h-4" />
            <span>SCENE 04 // APPLIED ENGINEERING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Featured <span className="text-gradient-orange">Projects.</span>
          </h2>
          <p className="mt-2 text-sm text-content-secondary font-body">
            Real-world systems combining Java &amp; Spring Boot microservices with generative AI models.
          </p>
        </div>

        {/* Mobile / Tablet Cards Stack */}
        <div className="space-y-10">
          {visibleProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              isHorizontal={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
