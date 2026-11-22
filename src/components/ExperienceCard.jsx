import React from 'react';
import { MapPin } from 'lucide-react';

export const ExperienceCard = ({ experience }) => {
  if (!experience || experience.visible === false) return null;

  return (
    <div className="relative flex items-start gap-4 sm:gap-6 md:gap-8">
      {/* Desktop Date Column (Aligned right, hidden on mobile) */}
      <div className="hidden md:block w-36 lg:w-44 shrink-0 text-right pt-0.5">
        <span className="text-sm font-semibold font-display text-white block">
          {experience.duration}
        </span>
      </div>

      {/* Timeline Marker & Thin Neutral Vertical Line */}
      <div className="relative flex flex-col items-center shrink-0 self-stretch pt-1.5">
        {/* Small orange marker */}
        <div 
          className="w-2.5 h-2.5 rounded-full bg-[#FF7900] ring-4 ring-[#090A0D] shrink-0 z-10" 
          aria-hidden="true"
        />
        {/* Thin neutral timeline line */}
        <div className="w-[1px] flex-1 bg-white/10 mt-2" aria-hidden="true" />
      </div>

      {/* Experience Content Column */}
      <div className="flex-1 pb-6 min-w-0">
        {/* Mobile Date (Placed above role) */}
        <div className="md:hidden mb-1.5">
          <span className="text-xs font-mono font-medium text-[#FF7900]">
            {experience.duration}
          </span>
        </div>

        {/* Job Title */}
        <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
          {experience.role}
        </h3>

        {/* Company & Location */}
        <div className="flex flex-wrap items-center gap-2 mt-1 mb-4 text-sm">
          <span className="text-[#FF7900] font-medium font-display">
            {experience.company}
          </span>
          {experience.location && (
            <>
              <span className="text-white/20 select-none">•</span>
              <span className="inline-flex items-center text-content-secondary text-xs sm:text-sm font-body">
                <MapPin className="w-3.5 h-3.5 mr-1 text-content-muted shrink-0" />
                <span>{experience.location}</span>
              </span>
            </>
          )}
        </div>

        {/* Responsibilities with small neutral/orange square bullets */}
        {experience.responsibilities && experience.responsibilities.length > 0 && (
          <ul className="space-y-2.5 mb-5 text-sm text-content-secondary font-body leading-relaxed">
            {experience.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start">
                <span 
                  className="w-1.5 h-1.5 rounded-[1px] bg-[#FF7900] mt-2 mr-3 shrink-0" 
                  aria-hidden="true"
                />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech Stack: Pills matching visual reference screenshot */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-content-secondary pt-1">
            <span className="text-white/80 font-medium mr-1 font-display">
              Tech Stack:
            </span>
            {experience.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-[#151820] text-content-secondary border border-white/10 hover:border-white/20 hover:text-white transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
