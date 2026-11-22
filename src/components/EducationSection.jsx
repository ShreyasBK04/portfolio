import React, { useEffect, useRef } from 'react';
import { educationList } from '../data/education';
import { certificates } from '../data/certificates';
import { Award, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EducationSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const visibleEducation = educationList.filter((e) => e.visible !== false);
  const visibleCertificates = certificates.filter((c) => c.visible !== false);

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

      const elements = sectionRef.current?.querySelectorAll('.education-block');
      if (elements && elements.length > 0) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.12,
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
      id="education"
      ref={sectionRef}
      className="editorial-section relative py-16 sm:py-20 bg-[#090A0D]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div ref={headingRef} className="mb-8 sm:mb-10">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#FF7900] tracking-widest uppercase mb-2">
            <span className="w-4 h-[2px] bg-[#FF7900] inline-block" />
            <span>EDUCATION &amp; CERTIFICATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
            My academic background<span className="text-[#FF7900]">.</span>
          </h2>

          <p className="mt-2 text-sm sm:text-base text-content-secondary max-w-2xl font-body leading-relaxed">
            My education and the certifications that strengthened my skills.
          </p>

          <div className="w-full h-px bg-white/10 my-6 sm:my-8" />
        </div>

        {/* 2-Column Split matching visual reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Academic Timeline (7 Cols) */}
          <div className="lg:col-span-7 education-block space-y-8">
            {visibleEducation.map((edu, idx) => (
              <div key={edu.id} className="relative flex items-start gap-4 sm:gap-6">
                {/* Duration on left */}
                <div className="w-24 sm:w-28 shrink-0 text-right pt-0.5">
                  <span className="text-xs sm:text-sm font-semibold font-mono text-content-muted block">
                    {edu.duration}
                  </span>
                </div>

                {/* Timeline Marker & Line */}
                <div className="relative flex flex-col items-center shrink-0 self-stretch pt-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF7900] ring-4 ring-[#090A0D] shrink-0 z-10" />
                  {idx !== visibleEducation.length - 1 && (
                    <div className="w-[1px] flex-1 bg-white/10 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-4 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-display text-white font-bold text-base sm:text-lg tracking-tight">
                      {edu.degree}
                    </h3>

                    {edu.score && (
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-white/10 bg-[#151820] text-content-secondary shrink-0 w-fit">
                        {edu.scoreType === 'CGPA' ? `CGPA: ${edu.score}` : `Percentage: ${edu.score}`}
                      </span>
                    )}
                  </div>

                  <div className="text-xs sm:text-sm text-[#FF7900] font-medium font-display">
                    {edu.institution}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Certifications Card (5 Cols) */}
          <div className="lg:col-span-5 education-block bg-[#111319] border border-white/10 rounded-2xl p-6 sm:p-7">
            <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b border-white/[0.08]">
              <Award className="w-4 h-4 text-[#FF7900]" />
              <h3 className="text-base font-bold font-display text-white tracking-wide">
                Certifications
              </h3>
            </div>

            <ul className="space-y-4">
              {visibleCertificates.map((cert) => (
                <li key={cert.id} className="flex items-start justify-between gap-2 text-xs sm:text-sm">
                  <div className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#FF7900] mt-1.5 mr-3 shrink-0" />
                    <div>
                      <span className="text-white font-medium block">
                        {cert.title}
                      </span>
                      <span className="text-xs text-content-muted font-mono">
                        ({cert.issuer})
                      </span>
                    </div>
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-content-muted hover:text-[#FF7900] transition-colors shrink-0 pt-0.5"
                      aria-label={`View certificate for ${cert.title}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
