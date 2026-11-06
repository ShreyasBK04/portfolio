import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#090A0D] border-t border-white/10 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand & Subtitle */}
        <div className="flex items-center space-x-3 text-center sm:text-left">
          <div className="w-8 h-8 rounded-lg bg-bg-card border border-white/10 flex items-center justify-center">
            <span className="text-accent text-sm font-extrabold font-display">S</span>
          </div>
          <div>
            <div className="text-sm font-bold font-display text-white">
              {portfolioData.brand} — {portfolioData.name}
            </div>
            <div className="text-xs font-mono text-content-muted">
              {portfolioData.portfolioTitle}
            </div>
          </div>
        </div>

        {/* Philosophy Note */}
        <div className="text-xs text-content-secondary font-mono text-center max-w-sm">
          "Human creativity &amp; engineering directing intelligent technologies."
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-bg-card border border-white/10 hover:border-accent text-xs font-mono text-content-secondary hover:text-white transition-all"
        >
          <span>Return to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-accent" />
        </button>

      </div>
    </footer>
  );
};

