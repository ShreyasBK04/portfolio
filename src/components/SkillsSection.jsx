import React, { useRef, useEffect, useState } from 'react';
import { skillCategories } from '../data/skills';
import { Terminal, Database, Layout, Wrench, Code2, Cpu, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categoryIcons = {
  languages: Code2,
  backend: Cpu,
  frontend: Layout,
  tools: Wrench
};

export const SkillsSection = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const visibleCategories = skillCategories.filter((cat) => cat.visible !== false);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP: Brief cinematic pin while 4 categories reveal progressively
      mm.add("(min-width: 1024px)", () => {
        const section = sectionRef.current;
        const cards = cardRefs.current;
        if (!section || cards.length === 0) return;

        // Initial state: first 2 categories lightly visible, next 2 primed
        gsap.set(cards.slice(0, 2), { opacity: 0.85, y: 0 });
        gsap.set(cards.slice(2), { opacity: 0.2, y: 24 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: "+=850", // Brief, comfortable pinning distance
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              setScrollProgress(p);
              // Calculate active category
              const idx = Math.min(cards.length - 1, Math.floor(p * cards.length));
              setActiveCategoryIndex(idx);
            }
          }
        });

        // Staggered progressive reveal
        tl.to(cards.slice(0, 2), {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        }, 0)
        .to(cards[2], {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out"
        }, 0.25)
        .to(cards[3], {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out"
        }, 0.45);

        return () => {
          tl.kill();
        };
      });

      // MOBILE / TABLET: Natural vertical scrolling with individual entrance reveals
      mm.add("(max-width: 1023px)", () => {
        const cards = cardRefs.current;
        cards.forEach((card, idx) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: (idx % 2) * 0.1,
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
  }, [visibleCategories.length]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      data-pinned="true"
      className="editorial-section relative bg-[#111319] overflow-hidden select-none"
    >
      {/* DESKTOP PINNED VIEW (>= 1024px) */}
      <div className="hidden lg:flex flex-col justify-between w-full h-screen pt-20 lg:pt-24 pb-8 px-6 xl:px-12 relative overflow-hidden">
        
        {/* Header Deck */}
        <div className="w-full flex items-center justify-between border-b border-white/10 pb-3 relative z-20 shrink-0">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent tracking-widest uppercase">
              <Terminal className="w-4 h-4" />
              <span>SCENE 05 // SYSTEM CAPABILITIES</span>
            </div>
            <h2 className="text-2xl xl:text-3xl font-extrabold font-display text-white tracking-tight mt-1">
              Technical <span className="text-gradient-orange">Skills.</span>
            </h2>
          </div>

          {/* Category Counter & Progress */}
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <span className="text-[10px] font-mono text-content-muted block uppercase">DOMAIN</span>
              <div className="text-sm font-mono text-white transition-all duration-300">
                <span className="text-accent font-bold text-base">
                  {String(activeCategoryIndex + 1).padStart(2, '0')}
                </span>
                <span className="mx-1 text-white/30">/</span>
                <span>{String(visibleCategories.length).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Scrub Progress Bar */}
            <div className="w-36 xl:w-48 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
              <div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-accent to-[#FFAA32] rounded-full transition-all duration-100"
                style={{ width: `${Math.min(100, Math.max(5, scrollProgress * 100))}%` }}
              />
            </div>

            {/* Active Domain Pill */}
            <div className="flex items-center space-x-1.5 text-xs font-mono text-content-secondary bg-[#151820] px-3 py-1.5 rounded-lg border border-white/10">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>{visibleCategories[activeCategoryIndex]?.title || "Full Stack Inventory"}</span>
            </div>
          </div>
        </div>

        {/* 4-Category Cards Grid */}
        <div className="flex-1 flex items-center justify-center max-w-7xl w-full mx-auto overflow-hidden py-2">
          <div className="grid grid-cols-2 gap-5 xl:gap-7 w-full items-stretch">
            {visibleCategories.map((category, idx) => {
              const IconComponent = categoryIcons[category.id] || Terminal;
              const isCurrent = activeCategoryIndex === idx;

              return (
                <div
                  key={category.id}
                  ref={addToRefs}
                  className={`bg-bg-card rounded-2xl p-5 xl:p-6 border transition-all duration-300 flex flex-col justify-between group hover:shadow-glow-sm ${
                    isCurrent
                      ? 'border-accent/50 shadow-glow-sm ring-1 ring-accent/20'
                      : 'border-white/10 hover:border-accent/30'
                  }`}
                >
                  <div>
                    {/* Category Title Header */}
                    <div className="flex items-center space-x-3 mb-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#090A0D] border border-white/10 flex items-center justify-center text-accent group-hover:border-accent/50 group-hover:text-[#FFAA32] transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base xl:text-lg font-bold font-display text-white tracking-tight">
                          {category.title}
                        </h3>
                        <p className="text-[11px] text-content-secondary line-clamp-1">
                          {category.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {category.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className={`p-2 rounded-lg border transition-all duration-200 flex flex-col justify-center ${
                            skill.highlight
                              ? 'bg-[#090A0D] border-accent/25 text-white shadow-sm'
                              : 'bg-[#090A0D]/60 border-white/5 text-content-secondary hover:text-white hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-semibold font-display tracking-wide">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono text-accent/80 mt-0.5">
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-content-muted">
                    <span className="uppercase">STACK // {category.id}</span>
                    <span className="text-accent">{category.skills.length} Technologies</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* MOBILE / TABLET NATURAL VERTICAL SCROLL (< 1024px) */}
      <div className="lg:hidden py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10 border-b border-white/10 pb-6">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent mb-2 tracking-widest uppercase">
              <Terminal className="w-4 h-4" />
              <span>SCENE 05 // SYSTEM CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Technical <span className="text-gradient-orange">Skills.</span>
            </h2>
            <p className="mt-3 text-sm text-content-secondary font-body">
              Categorized technical stack focused on scalable backend architectures, relational databases, and responsive clients.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleCategories.map((category) => {
              const IconComponent = categoryIcons[category.id] || Terminal;

              return (
                <div
                  key={category.id}
                  ref={addToRefs}
                  className="bg-bg-card rounded-2xl p-6 border border-white/10 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-glow-sm"
                >
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#090A0D] border border-white/10 flex items-center justify-center text-accent group-hover:border-accent/50 group-hover:text-[#FFAA32] transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-display text-white tracking-tight">
                          {category.title}
                        </h3>
                        <p className="text-xs text-content-secondary line-clamp-1">
                          {category.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-5">
                      {category.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className={`p-2.5 rounded-lg border transition-all duration-200 flex flex-col justify-center ${
                            skill.highlight
                              ? 'bg-[#090A0D] border-accent/30 text-white shadow-sm'
                              : 'bg-[#090A0D]/60 border-white/5 text-content-secondary hover:text-white hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-semibold font-display tracking-wide">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono text-accent/80 mt-0.5">
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-content-muted">
                    <span>Category {category.id.toUpperCase()}</span>
                    <span className="text-accent">{category.skills.length} Technologies</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
