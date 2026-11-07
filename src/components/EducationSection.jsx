import React from 'react';
import { educationList } from '../data/education';
import { certificates } from '../data/certificates';
import { Award, CheckCircle, GraduationCap, School } from 'lucide-react';

export const EducationSection = () => {
  const visibleEducation = educationList.filter((e) => e.visible !== false);
  const visibleCertificates = certificates.filter((c) => c.visible !== false);

  return (
    <section id="education" className="editorial-section relative py-20 sm:py-28 bg-[#090A0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent mb-2 tracking-widest uppercase">
              <GraduationCap className="w-4 h-4" />
              <span>SCENE 06 // ACADEMIC FOUNDATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
              Education &amp; <span className="text-gradient-orange">Credentials.</span>
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm sm:text-base text-content-secondary max-w-md font-body">
            Academic credentials and industry certifications sourced directly from my professional resume.
          </p>
        </div>

        {/* Education & Certificates Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Education Cards Column (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            {visibleEducation.map((edu) => (
              <div
                key={edu.id}
                className="bg-bg-card rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-accent/40 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase font-display bg-accent/10 text-accent border border-accent/20 w-fit">
                      {edu.type || "Academic Qualification"}
                    </span>
                    <span className="text-xs font-mono text-content-secondary">
                      {edu.duration}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                    {edu.degree}
                  </h3>

                  <div className="flex items-center space-x-2 text-sm text-[#FFAA32] mt-1 mb-4 font-display font-medium">
                    <School className="w-4 h-4" />
                    <span>{edu.institution || edu.college}</span>
                    {edu.location && <span className="text-content-muted font-normal">• {edu.location}</span>}
                  </div>

                  {/* Highlights */}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div className="space-y-2 bg-[#090A0D]/50 p-4 rounded-xl border border-white/5 mb-6">
                      {edu.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-content-secondary">
                          <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Score Banner */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 bg-[#090A0D]/60 p-4 rounded-xl border border-accent/20">
                  <div>
                    <span className="text-xs font-mono text-content-muted uppercase block">
                      {edu.scoreType === "Percentage" ? "Board Score / Percentage" : "Cumulative Grade Point Average (CGPA)"}
                    </span>
                    <span className="text-xs font-display text-content-secondary">
                      Scale of {edu.scale}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-extrabold font-display text-gradient-orange tracking-tight">
                      {edu.score || edu.cgpa}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Side Column: Certifications */}
          <div className="bg-[#111319] rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-accent text-xs font-mono uppercase tracking-wider mb-4">
                <Award className="w-4 h-4" />
                <span>Verified Certifications</span>
              </div>

              <h4 className="text-xl font-bold font-display text-white mb-2">
                Industry Credentials
              </h4>

              <p className="text-xs sm:text-sm text-content-secondary leading-relaxed mb-6">
                Accredited programs completed through recognized institutions and engineering platforms.
              </p>

              <div className="space-y-4">
                {visibleCertificates.map((cert) => (
                  <div key={cert.id} className="p-4 rounded-xl bg-bg-card border border-white/5 hover:border-accent/30 transition-colors">
                    <div className="flex items-center justify-between text-[11px] font-mono text-accent uppercase tracking-wider mb-1">
                      <span>{cert.issuer}</span>
                      <span className="text-content-muted">{cert.issueDate}</span>
                    </div>
                    <h5 className="text-sm font-semibold text-white mb-2 font-display">
                      {cert.title}
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {cert.skillsCovered.map((s, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#090A0D] text-content-secondary border border-white/5">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
