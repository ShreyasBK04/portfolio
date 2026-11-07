import React, { useRef, useEffect, useState } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { Layers, ArrowRight, MoveRight } from 'lucide-react';
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

      // Desktop & Laptop Screens (>= 1024px): Pinned Horizontal Scrolling
      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        // Dynamic horizontal travel distance: spans the full width of cards, offsets, and previews
        const calculateDistance = () => {
          return track.scrollWidth - window.innerWidth + window.innerWidth * 0.14;
        };

        const tween = gsap.to(track, {
          x: () => -calculateDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1, // Smooth, cinematic response
            start: "top top",
            end: () => `+=${calculateDistance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const currentProgress = self.progress;
              setProgress(currentProgress);
              
              // Map scroll progress smoothly across project cards
              const totalItems = visibleProjects.length;
              if (totalItems > 0) {
                const segment = 1 / totalItems;
                const activeIdx = Math.min(
                  totalItems - 1,
                  Math.floor(currentProgress / segment + 0.1)
                );
                setActiveProjectIndex(activeIdx);
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
      data-pinned="true"
      className="editorial-section relative bg-[#090A0D] overflow-hidden select-none"
    >
      {/* DESKTOP PINNED HORIZONTAL SHOWCASE (>= 1024px) */}
      <div className="hidden lg:flex flex-col justify-between w-full h-screen pt-20 lg:pt-24 pb-6 px-6 xl:px-12 relative overflow-hidden">
        
        {/* Top Header & Navigation Deck — Positioned safely below the fixed navbar */}
        <div className="w-full flex items-center justify-between border-b border-white/10 pb-3 relative z-20 shrink-0">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent tracking-widest uppercase">
              <Layers className="w-4 h-4" />
              <span>SCENE 04 // APPLIED ENGINEERING SHOWCASE</span>
            </div>
            <h2 className="text-2xl xl:text-3xl font-extrabold font-display text-white tracking-tight mt-1">
              Featured <span className="text-gradient-orange">Projects.</span>
            </h2>
          </div>

          {/* Project Counter & Horizontal Progress Bar */}
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <span className="text-[10px] font-mono text-content-muted block uppercase">ACTIVE PROJECT</span>
              <div className="text-sm font-mono text-white transition-all duration-300">
                <span className="text-accent font-bold text-base">
                  {String(activeProjectIndex + 1).padStart(2, '0')}
                </span>
                <span className="mx-1 text-white/30">/</span>
                <span>{String(visibleProjects.length).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Scrub Progress Bar */}
            <div className="w-36 xl:w-48 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
              <div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-accent to-[#FFAA32] rounded-full transition-all duration-100"
                style={{ width: `${Math.min(100, Math.max(5, progress * 100))}%` }}
              />
            </div>

            {/* Scroll Indicator */}
            <div className="flex items-center space-x-1.5 text-xs font-mono text-content-secondary bg-[#151820] px-3 py-1.5 rounded-lg border border-white/10">
              <span>Scroll to Pan</span>
              <MoveRight className="w-3.5 h-3.5 text-accent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Dynamic Horizontal Scrolling Track — Vertically Centered with generous left spacing and preview on right */}
        <div className="relative w-full flex-1 flex items-center overflow-hidden my-auto py-2">
          <div
            ref={trackRef}
            className="flex items-center space-x-8 xl:space-x-12 pl-[10vw] xl:pl-[12vw] pr-[20vw] will-change-transform"
          >
            {/* Project Cards: Card 01 starts centered; Card 02 peeks on the right */}
            {visibleProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                isHorizontal={true}
                isActive={activeProjectIndex === idx}
              />
            ))}

            {/* Seamless Outro Transition into Scene 05 (Skills Section) */}
            <div className="w-[300px] xl:w-[340px] shrink-0 p-7 xl:p-8 rounded-2xl bg-gradient-to-br from-[#151820] to-[#0E1017] border border-accent/30 flex flex-col justify-between lg:h-[calc(100vh-200px)] max-h-[660px] shadow-glow-sm">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2 font-semibold">
                  NEXT CHAPTER // 05
                </span>
                <h4 className="text-xl xl:text-2xl font-bold font-display text-white tracking-tight leading-snug">
                  Technical Stack &amp; Architecture.
                </h4>
                <p className="text-xs text-content-secondary mt-3 leading-relaxed">
                  Continue scrolling to explore programming languages, enterprise backend frameworks, and relational databases.
                </p>
              </div>

              <a
                href="#skills"
                className="inline-flex items-center justify-between w-full p-3.5 rounded-lg bg-accent hover:bg-[#FFAA32] text-black text-xs font-bold font-display uppercase tracking-wider transition-colors"
              >
                <span>View Skills Matrix</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* TABLET & MOBILE RESPONSIVE VIEW (< 1024px) */}
      {/* Uses native accessible vertical flow with zero scroll hijacking */}
      <div className="lg:hidden py-16 px-4 sm:px-6">
        
        {/* Mobile Header */}
        <div className="mb-10 border-b border-white/10 pb-6 pt-6">
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
              isActive={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
