import React, { useRef, useEffect, useState } from 'react';
import { experiences } from '../data/experience';
import { ExperienceCard } from './ExperienceCard';
import { Briefcase, ChevronRight, Milestone, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const milestone1Ref = useRef(null);
  const milestone2Ref = useRef(null);
  const timelineBarRef = useRef(null);

  const [activeMilestone, setActiveMilestone] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);

  const visibleExperiences = experiences.filter((e) => e.visible !== false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP: Pin section while career timeline reveals progressively
      mm.add("(min-width: 1024px)", () => {
        const section = sectionRef.current;
        const m1 = milestone1Ref.current;
        const m2 = milestone2Ref.current;
        const bar = timelineBarRef.current;
        if (!section || !m1 || !m2) return;

        // Initial setup: Milestone 1 visible, Milestone 2 primed for reveal
        gsap.set(m1, { opacity: 1, y: 0 });
        gsap.set(m2, { opacity: 0.2, y: 32 });
        if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: "+=1100", // Smooth scroll distance before natural release
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              setTimelineProgress(p);
              setActiveMilestone(p >= 0.45 ? 1 : 0);
            }
          }
        });

        // Progressive reveal sequence
        tl.to(m1, {
          opacity: 0.85,
          scale: 0.985,
          duration: 0.4,
          ease: "power2.out"
        }, 0.1)
        .to(bar, {
          scaleX: 1,
          duration: 0.6,
          ease: "none"
        }, 0.2)
        .to(m2, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        }, 0.35);

        return () => {
          tl.kill();
        };
      });

      // MOBILE / TABLET: Natural vertical scroll with smooth reveal animations
      mm.add("(max-width: 1023px)", () => {
        const cards = [milestone1Ref.current, milestone2Ref.current].filter(Boolean);
        cards.forEach((card, idx) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              delay: idx * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [visibleExperiences.length]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      data-pinned="true"
      className="editorial-section relative bg-[#090A0D] overflow-hidden select-none"
    >
      {/* DESKTOP PINNED TIMELINE VIEW (>= 1024px) */}
      <div className="hidden lg:flex flex-col justify-between w-full h-screen pt-20 lg:pt-24 pb-8 px-6 xl:px-12 relative overflow-hidden">
        
        {/* Top Header Deck */}
        <div className="w-full flex items-center justify-between border-b border-white/10 pb-3 relative z-20 shrink-0">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent tracking-widest uppercase">
              <Briefcase className="w-4 h-4" />
              <span>SCENE 02 // CAREER TIMELINE</span>
            </div>
            <h2 className="text-2xl xl:text-3xl font-extrabold font-display text-white tracking-tight mt-1">
              Professional <span className="text-gradient-orange">Experience.</span>
            </h2>
          </div>

          {/* Timeline Milestones & Scrub Progress Indicator */}
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <span className="text-[10px] font-mono text-content-muted block uppercase">MILESTONE</span>
              <div className="text-sm font-mono text-white transition-all duration-300">
                <span className="text-accent font-bold text-base">
                  {String(activeMilestone + 1).padStart(2, '0')}
                </span>
                <span className="mx-1 text-white/30">/</span>
                <span>{String(visibleExperiences.length).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Scrub Progress Bar */}
            <div className="w-36 xl:w-48 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
              <div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-accent to-[#FFAA32] rounded-full transition-all duration-100"
                style={{ width: `${Math.min(100, Math.max(5, timelineProgress * 100))}%` }}
              />
            </div>

            {/* Status Pill */}
            <div className="flex items-center space-x-1.5 text-xs font-mono text-content-secondary bg-[#151820] px-3 py-1.5 rounded-lg border border-white/10">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>{activeMilestone === 0 ? "Production Engineering" : "Technical Specialization"}</span>
            </div>
          </div>
        </div>

        {/* Milestone Connecting Track Indicator */}
        <div className="w-full max-w-6xl mx-auto my-3 shrink-0 px-2">
          <div className="relative flex items-center justify-between">
            {/* Background Track Line */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-white/10 z-0" />
            
            {/* Animated Active Progress Line */}
            <div
              ref={timelineBarRef}
              className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-accent via-[#FFAA32] to-accent z-0"
            />

            {/* Node 1 */}
            <div className={`relative z-10 flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono border transition-all duration-300 ${
              activeMilestone === 0
                ? 'bg-[#090A0D] border-accent text-accent shadow-glow-sm'
                : 'bg-[#151820] border-white/15 text-content-secondary'
            }`}>
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Milestone 01: Invayas Technologies</span>
            </div>

            {/* Node 2 */}
            <div className={`relative z-10 flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono border transition-all duration-300 ${
              activeMilestone === 1
                ? 'bg-[#090A0D] border-accent text-[#FFAA32] shadow-glow-sm'
                : 'bg-[#151820] border-white/15 text-content-muted'
            }`}>
              <span className={`w-2 h-2 rounded-full ${activeMilestone === 1 ? 'bg-[#FFAA32]' : 'bg-white/30'}`} />
              <span>Milestone 02: KodNest Specialization</span>
            </div>
          </div>
        </div>

        {/* Progressive Milestones Grid */}
        <div className="flex-1 flex items-center justify-center max-w-6xl w-full mx-auto overflow-hidden py-1">
          <div className="grid grid-cols-2 gap-6 xl:gap-8 w-full items-stretch">
            {/* Milestone 1: Invayas Technologies */}
            <div
              ref={milestone1Ref}
              className={`transition-all duration-300 rounded-2xl flex flex-col ${
                activeMilestone === 0 ? 'ring-1 ring-accent/40 shadow-glow-sm' : 'border-white/10'
              }`}
            >
              {visibleExperiences[0] && (
                <ExperienceCard experience={visibleExperiences[0]} isTraining={false} />
              )}
            </div>

            {/* Milestone 2: KodNest Training & Internship */}
            <div
              ref={milestone2Ref}
              className={`transition-all duration-300 rounded-2xl flex flex-col ${
                activeMilestone === 1 ? 'ring-1 ring-accent/40 shadow-glow-sm' : 'border-white/10'
              }`}
            >
              {visibleExperiences[1] && (
                <ExperienceCard experience={visibleExperiences[1]} isTraining={true} />
              )}
            </div>
          </div>
        </div>

      </div>

      {/* MOBILE / TABLET NATURAL VERTICAL SCROLL (< 1024px) */}
      <div className="lg:hidden py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="mb-10 border-b border-white/10 pb-6">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent mb-2 tracking-widest uppercase">
              <Briefcase className="w-4 h-4" />
              <span>SCENE 02 // CAREER TIMELINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Professional <span className="text-gradient-orange">Experience.</span>
            </h2>
            <p className="mt-3 text-sm text-content-secondary font-body">
              Career journey spanning full-stack production engineering and enterprise Java specialization.
            </p>
          </div>

          {/* Stacked Cards */}
          <div className="space-y-6">
            {visibleExperiences.map((exp, idx) => (
              <div
                key={exp.id}
                ref={idx === 0 ? milestone1Ref : milestone2Ref}
              >
                <ExperienceCard
                  experience={exp}
                  isTraining={exp.type?.toLowerCase().includes('training')}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
