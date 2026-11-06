import React from 'react';
import { educationList } from '../data/education';
import { certificates } from '../data/certificates';
import { Award, BookOpen, CheckCircle, GraduationCap, School } from 'lucide-react';

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
            Rigorous foundations in Computer Science principles, algorithms, distributed systems, and modern paradigms.
          </p>
        </div>

        {/* Education Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Degree Card (Spans 2 columns) */}
          {visibleEducation.map((edu) => (
            <div
              key={edu.id}
              className="lg:col-span-2 bg-bg-card rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-accent/40 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase font-display bg-accent/10 text-accent border border-accent/20 w-fit">
                    Undergraduate Degree
                  </span>
                  <span className="text-xs font-mono text-content-secondary">
                    {edu.duration}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                  {edu.degree}
                </h3>
                
                <p className="text-base sm:text-lg text-accent font-display font-medium mt-1">
                  {edu.branch}
                </p>

                <div className="flex items-center space-x-2 text-sm text-content-secondary mt-1 mb-6">
                  <School className="w-4 h-4 text-[#FFAA32]" />
                  <span>{edu.college}</span>
                  {edu.location && <span className="text-content-muted">• {edu.location}</span>}
                </div>

                {/* Coursework highlights */}
                <div className="space-y-2 bg-[#090A0D]/50 p-4 rounded-xl border border-white/5 mb-6">
                  <span className="text-xs font-mono text-[#FFAA32] uppercase tracking-wider block mb-1">
                    Academic Scope &amp; Focus:
                  </span>
                  {edu.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-content-secondary">
                      <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CGPA Banner */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5 bg-[#090A0D]/60 p-4 rounded-xl border border-accent/20">
                <div>
                  <span className="text-xs font-mono text-content-muted uppercase block">
                    Cumulative Grade Point Average
                  </span>
                  <span className="text-sm font-display text-white font-semibold">
                    Scale of {edu.scale}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-3xl sm:text-4xl font-extrabold font-display text-gradient-orange tracking-tight">
                    {edu.cgpa}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Side Column: Certifications / Continuous Learning */}
          <div className="bg-[#111319] rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-accent text-xs font-mono uppercase tracking-wider mb-4">
                <Award className="w-4 h-4" />
                <span>Verified Specializations</span>
              </div>

              <h4 className="text-xl font-bold font-display text-white mb-2">
                Continuous Technical Mastery
              </h4>

              <p className="text-xs sm:text-sm text-content-secondary leading-relaxed mb-6">
                Pursuing deep-level systems comprehension beyond syllabus requirements, covering enterprise design patterns and AI integration.
              </p>

              <div className="space-y-4">
                {visibleCertificates.map((cert) => (
                  <div key={cert.id} className="p-3.5 rounded-xl bg-bg-card border border-white/5">
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest block">
                      {cert.issuer} • {cert.issueDate}
                    </span>
                    <h5 className="text-sm font-semibold text-white mt-1 mb-2 font-display">
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

            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-content-muted">
              Computer Science &amp; Engineering Disciplines
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

