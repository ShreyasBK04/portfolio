import React from 'react';
import { Briefcase, Calendar, CheckCircle2, MapPin } from 'lucide-react';

export const ExperienceCard = ({ experience, isTraining = false }) => {
  if (!experience || experience.visible === false) return null;

  return (
    <div className="relative group bg-bg-card rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-accent/50 transition-all duration-300 hover:shadow-glow-sm">
      {/* Accent corner line */}
      <div className="absolute top-0 right-0 w-24 h-1 bg-gradient-to-l from-accent to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center space-x-2.5 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase font-display border ${
                isTraining
                  ? 'bg-amber-500/10 text-[#FFAA32] border-amber-500/30'
                  : 'bg-accent/10 text-accent border-accent/30'
              }`}
            >
              {experience.type || (isTraining ? 'Internship / Training' : 'Internship')}
            </span>
            {experience.status && (
              <span className="text-[11px] font-mono text-[#FFAA32] bg-white/5 px-2 py-0.5 rounded">
                {experience.status}
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight group-hover:text-white transition-colors">
            {experience.role}
          </h3>

          <div className="text-sm sm:text-base font-medium text-accent mt-0.5 font-display">
            {experience.company || experience.institution}
          </div>
        </div>

        {/* Date and Location Badge */}
        <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs font-mono text-content-secondary">
          <div className="flex items-center space-x-1.5 bg-[#090A0D] px-3 py-1.5 rounded-lg border border-white/5">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span>{experience.duration}</span>
          </div>
          {experience.location && (
            <div className="flex items-center space-x-1 text-content-muted">
              <MapPin className="w-3 h-3 text-accent/70" />
              <span>{experience.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {experience.description && (
        <p className="text-sm text-content-secondary font-body leading-relaxed mb-5 border-l-2 border-accent/30 pl-3">
          {experience.description}
        </p>
      )}

      {/* Responsibilities or Syllabus items */}
      <div className="space-y-2 mb-6">
        {(experience.responsibilities || experience.syllabus || []).map((item, idx) => (
          <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-content-secondary leading-normal">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Technology pills */}
      {experience.technologies && experience.technologies.length > 0 && (
        <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
          {experience.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="text-xs font-mono px-2.5 py-1 rounded bg-[#090A0D] text-content-main border border-white/10 group-hover:border-accent/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

