import React, { useEffect, useRef } from 'react';
import { Code2, BookOpen, Target } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const VictorySection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

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

      const items = sectionRef.current?.querySelectorAll('.about-item');
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
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

  const keyStrengths = [
    {
      title: 'Problem Solving',
      description: 'Enjoy turning ideas into working solutions.',
      icon: Code2,
    },
    {
      title: 'Continuous Learning',
      description: 'Always exploring and improving my skills.',
      icon: BookOpen,
    },
    {
      title: 'Goal',
      description: 'To build reliable and user-focused software.',
      icon: Target,
    },
  ];

  return (
    <section
      id="victory"
      ref={sectionRef}
      className="editorial-section relative py-16 sm:py-20 bg-[#090A0D]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div ref={headingRef} className="mb-8 sm:mb-10">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#FF7900] tracking-widest uppercase mb-2">
            <span className="w-4 h-[2px] bg-[#FF7900] inline-block" />
            <span>ABOUT / JOURNEY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
            More about me<span className="text-[#FF7900]">.</span>
          </h2>

          <div className="w-full h-px bg-white/10 my-6 sm:my-8" />
        </div>

        {/* 2-Column Split matching Panel 6 in visual reference screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Personal Statement (7 Cols) */}
          <div className="lg:col-span-7 space-y-4 font-body leading-relaxed">
            <p className="text-base sm:text-lg text-content-main leading-relaxed">
              I'm Shreyas B K, a Computer Science graduate and Java Full Stack Developer. I enjoy building practical web applications, solving problems, and exploring how software can make everyday tasks easier.
            </p>
          </div>

          {/* Right Column: 3 Key Points (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {keyStrengths.map((item, idx) => {
              const Icon = item.icon;

              return (
                <div
                  key={idx}
                  className="about-item flex items-start space-x-4 p-4 rounded-xl bg-[#111319] border border-white/5 hover:border-white/15 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#151820] border border-white/10 flex items-center justify-center text-[#FF7900] shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold font-display text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-content-secondary mt-0.5 font-body leading-relaxed">
                      {item.description}
                    </p>
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
