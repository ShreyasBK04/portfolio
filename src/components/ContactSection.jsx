import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = () => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="editorial-section relative py-16 sm:py-20 bg-[#090A0D]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div ref={headingRef} className="mb-8 sm:mb-10">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#FF7900] tracking-widest uppercase mb-2">
            <span className="w-4 h-[2px] bg-[#FF7900] inline-block" />
            <span>CONTACT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
            Let's connect<span className="text-[#FF7900]">.</span>
          </h2>

          <p className="mt-2 text-sm sm:text-base text-content-secondary max-w-2xl font-body leading-relaxed">
            I'm open to internship and full-time opportunities. Feel free to reach out.
          </p>

          <div className="w-full h-px bg-white/10 my-6 sm:my-8" />
        </div>

        {/* Contact Bar matching Panel 7 in visual reference screenshot */}
        <div className="bg-[#111319] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Channels Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1 w-full lg:w-auto">
            {/* Email */}
            <a
              href={`mailto:${portfolioData.contact.email}`}
              className="flex items-center space-x-3.5 text-sm text-content-secondary hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#151820] border border-white/10 flex items-center justify-center text-[#FF7900] group-hover:border-[#FF7900]/40 transition-colors shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-content-muted block font-mono">Email</span>
                <span className="font-medium text-white group-hover:text-[#FF7900] transition-colors truncate block text-xs sm:text-sm">
                  {portfolioData.contact.email}
                </span>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/shreyas-b-k/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3.5 text-sm text-content-secondary hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#151820] border border-white/10 flex items-center justify-center text-[#FF7900] group-hover:border-[#FF7900]/40 transition-colors shrink-0">
                <LinkedinIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-content-muted block font-mono">LinkedIn</span>
                <span className="font-medium text-white group-hover:text-[#FF7900] transition-colors truncate block text-xs sm:text-sm">
                  linkedin.com/in/shreyasbk ↗
                </span>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/ShreyasBK04"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3.5 text-sm text-content-secondary hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#151820] border border-white/10 flex items-center justify-center text-[#FF7900] group-hover:border-[#FF7900]/40 transition-colors shrink-0">
                <GithubIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-content-muted block font-mono">GitHub</span>
                <span className="font-medium text-white group-hover:text-[#FF7900] transition-colors truncate block text-xs sm:text-sm">
                  github.com/ShreyasBK ↗
                </span>
              </div>
            </a>
          </div>

          {/* Right: Solid Orange Button */}
          <div className="shrink-0 w-full sm:w-auto">
            <a
              href={`mailto:${portfolioData.contact.email}?subject=Opportunity%20to%20Connect%20–%20Shreyas%20BK`}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-[#FF7900] hover:bg-[#FFAA32] text-black font-display font-bold text-sm tracking-wide transition-all duration-200 shadow-sm"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
