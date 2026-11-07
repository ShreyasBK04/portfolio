import React from 'react';
import { skillCategories } from '../data/skills';
import { Terminal, Database, Layout, Wrench, Code2, Cpu } from 'lucide-react';

const categoryIcons = {
  languages: Code2,
  backend: Cpu,
  frontend: Layout,
  database: Database,
  tools: Wrench
};

export const SkillsSection = () => {
  const visibleCategories = skillCategories.filter((cat) => cat.visible !== false);

  return (
    <section id="skills" className="editorial-section relative py-20 sm:py-28 bg-[#111319]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent mb-2 tracking-widest uppercase">
              <Terminal className="w-4 h-4" />
              <span>SCENE 05 // SYSTEM CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
              Technical <span className="text-gradient-orange">Skills.</span>
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm sm:text-base text-content-secondary max-w-md font-body">
            Categorized technical stack focused on scalable backend microservices, robust relational databases, and reactive interfaces.
          </p>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {visibleCategories.map((category) => {
            const IconComponent = categoryIcons[category.id] || Terminal;

            return (
              <div
                key={category.id}
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

                  {/* Skills Grid */}
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
    </section>
  );
};

