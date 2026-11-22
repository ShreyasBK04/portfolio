import React, { useState } from 'react';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { GithubIcon } from './Icons';

export const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!project || project.visible === false) return null;

  // Highlight key technologies within implementation bullets
  const renderPointText = (text) => {
    const techKeywords = [
      'SearchAPI.io',
      'Spring RestClient',
      'Spring Scheduling',
      'Spring Data JPA',
      'DTOs',
      'React dashboard',
      'Google Gemini API',
      'Apache PDFBox',
      'PDF report generation',
      'temporary document processing',
      'consent validation',
      'RESTful APIs'
    ];

    // Create regex matching any of the tech keywords
    const regex = new RegExp(`(${techKeywords.join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      const isMatch = techKeywords.some(
        (kw) => kw.toLowerCase() === part.toLowerCase()
      );
      if (isMatch) {
        return (
          <span key={index} className="text-[#FF7900] font-medium">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <article className="group bg-[#111319] border border-white/10 hover:border-white/20 rounded-2xl p-6 sm:p-7 transition-all duration-300">
      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
        
        {/* Left: Project Screenshot */}
        <div className="w-full lg:w-[340px] shrink-0">
          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#090A0D] border border-white/10 group-hover:border-white/20 transition-colors">
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Right: Title, Action Links, Description, Expandable Implementation & Stack */}
        <div className="flex-1 min-w-0 w-full flex flex-col justify-between self-stretch">
          <div>
            {/* Header: Title & Action Links */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2.5">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                {project.title}
              </h3>

              {/* Action Buttons (Demo & GitHub) */}
              <div className="flex items-center gap-4 shrink-0 pt-1 sm:pt-0">
                {project.liveUrl && project.liveUrl.trim() !== '' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#FF7900] hover:text-[#FFAA32] transition-colors"
                    aria-label={`Live demo for ${project.title}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-medium text-content-secondary hover:text-white transition-colors"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>

            {/* Project Description */}
            <p className="text-sm text-content-secondary leading-relaxed font-body mb-3">
              {project.description}
            </p>

            {/* View Technical Details Accordion Button */}
            {project.keyImplementation && project.keyImplementation.length > 0 && (
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-medium text-[#FF7900] hover:text-[#FFAA32] transition-colors focus:outline-none cursor-pointer py-1"
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? `Hide technical details for ${project.title}` : `View technical details for ${project.title}`}
                >
                  <span>{isExpanded ? 'Hide technical details' : 'View technical details'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-250 ease-out ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Expandable Technical Details Area */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-250 ease-out ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pt-3 pb-1 border-t border-white/[0.08]">
                      <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#FF7900] font-semibold mb-2.5">
                        Key Implementation
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-gray-300 font-body leading-relaxed">
                        {project.keyImplementation.map((point, idx) => (
                          <li key={idx} className="flex items-start">
                            <span
                              className="w-1.5 h-1.5 rounded-[1px] bg-[#FF7900] mt-1.5 mr-2.5 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{renderPointText(point)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tech Stack Pills at bottom */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.06]">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-3 py-1 rounded bg-[#151820] text-content-secondary border border-white/10 hover:border-white/20 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </article>
  );
};
