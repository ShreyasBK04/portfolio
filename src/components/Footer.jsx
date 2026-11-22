import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#090A0D] border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand & Copyright */}
        <div className="flex items-center space-x-3 text-center sm:text-left">
          <div className="w-7 h-7 rounded bg-[#111319] border border-white/10 flex items-center justify-center">
            <span className="text-[#FF7900] text-xs font-bold font-display">S</span>
          </div>
          <div className="text-xs text-content-muted font-mono">
            <span className="text-white font-medium">{portfolioData.brand}</span>
            <span className="mx-1.5">•</span>
            <span>&copy; 2026 Shreyas B K. All rights reserved.</span>
          </div>
        </div>

        {/* Center: Quick Links */}
        <div className="flex items-center space-x-5 text-xs font-mono text-content-secondary">
          <a
            href="https://github.com/ShreyasBK04"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF7900] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/shreyas-b-k/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF7900] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://leetcode.com/u/Shreyas_B_K/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF7900] transition-colors"
          >
            LeetCode
          </a>
          <a
            href={`mailto:${portfolioData.contact.email}`}
            className="hover:text-[#FF7900] transition-colors"
          >
            Email
          </a>
        </div>

        {/* Right: Back to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center space-x-1.5 text-xs font-mono text-content-muted hover:text-white transition-colors"
          aria-label="Scroll back to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#FF7900]" />
        </button>

      </div>
    </footer>
  );
};
