import React, { useRef, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Flame, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const VictorySection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="victory" ref={sectionRef} className="editorial-section relative py-24 sm:py-36 bg-[#090A0D] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

      <div ref={contentRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#151820] border border-accent/30 mb-8 backdrop-blur-md">
          <Flame className="w-4 h-4 text-accent animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-[#FFAA32] uppercase font-display">
            SCENE 07 // THE VICTORY MOMENT
          </span>
        </div>

        {/* Big Editorial Quote */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white mb-6 leading-[1.1]">
          "{portfolioData.victory.heading}"
        </h2>

        <p className="text-lg sm:text-2xl text-content-secondary font-body max-w-3xl mx-auto leading-relaxed mb-10">
          "{portfolioData.victory.quote}"
        </p>

        {/* Brand Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left my-12">
          {portfolioData.brandPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-bg-card/75 border border-white/5 hover:border-accent/40 transition-colors"
            >
              <div className="flex items-center space-x-2 mb-1.5">
                <span className="text-xs font-mono text-accent">0{idx + 1} //</span>
                <h4 className="text-sm font-bold font-display text-white">{pillar.title}</h4>
              </div>
              <p className="text-xs text-content-secondary leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-lg bg-accent hover:bg-[#FFAA32] text-black font-display font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-glow-md flex items-center space-x-2"
          >
            <span>Let's Build Something Meaningful</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
