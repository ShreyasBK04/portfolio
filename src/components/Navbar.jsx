import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Menu, X, ArrowUpRight, Download } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Journey', href: '#victory' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 30);

      // Top of page
      if (scrollY < 120) {
        setActiveSection('hero');
        return;
      }

      // Bottom of page: highlight last active nav item
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection('victory');
        return;
      }

      // Mutual-exclusion focal point (40% down viewport)
      const sections = ['victory', 'education', 'skills', 'projects', 'experience', 'hero'];
      const focalPoint = window.innerHeight * 0.4;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= focalPoint && rect.bottom >= focalPoint) {
            setActiveSection(section);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090A0D]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          className="group flex items-center space-x-2.5 text-white font-display font-bold text-xl tracking-tight transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-lg bg-bg-card border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:shadow-glow-sm transition-all duration-300">
            <span className="text-accent text-sm font-extrabold font-display">S</span>
          </div>
          <span className="tracking-wide">
            {portfolioData.brand}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-[#151820]/75 border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-[#FF7900]/15 border border-[#FF7900]/40 shadow-glow-sm'
                    : 'text-content-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          <a
            href={portfolioData.assets.resumePdf}
            download="Shreyas_BK_Resume.pdf"
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wide border border-white/15 text-content-main hover:border-accent hover:text-accent transition-all duration-200"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-md text-xs font-semibold tracking-wide bg-accent hover:bg-[#FFAA32] text-black shadow-glow-sm transition-all duration-200 font-display"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-bg-card border border-white/10 text-content-main hover:text-accent focus:outline-none"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090A0D]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-content-secondary hover:text-accent hover:bg-white/5 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col space-y-2.5">
            <a
              href={portfolioData.assets.resumePdf}
              download="Shreyas_BK_Resume.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-md border border-white/15 text-xs font-semibold text-content-main hover:border-accent"
            >
              <Download className="w-4 h-4 text-accent" />
              <span>Download Resume</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-md bg-accent text-black text-xs font-bold font-display"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

