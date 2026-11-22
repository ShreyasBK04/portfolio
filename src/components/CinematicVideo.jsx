import React, { useRef, useEffect, useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Volume2, VolumeX, Play, Pause, ChevronDown, Download } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CinematicVideo = () => {
  const sectionRef = useRef(null);
  const scrollLayerRef = useRef(null);
  const parallaxWrapperRef = useRef(null);
  const lightRef = useRef(null);
  const videoRef = useRef(null);
  const heroContentRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Autoplay on mount with browser compatibility handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start muted for autoplay policy
    video.muted = true;
    setIsMuted(true);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  // Subtle entrance animation & cinematic parallax
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const scrollLayer = scrollLayerRef.current;
    const parallaxWrapper = parallaxWrapperRef.current;
    const light = lightRef.current;
    const heroContent = heroContentRef.current;

    if (!section || !scrollLayer || !parallaxWrapper) return;

    const ctx = gsap.context(() => {
      // 1. Subtle entrance animation for hero text content
      if (heroContent) {
        gsap.fromTo(
          heroContent,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay: 0.15 }
        );
      }

      // 2. Scroll-Based Video Motion
      gsap.fromTo(
        scrollLayer,
        { scale: 1.05, y: 0, opacity: 1 },
        {
          scale: 1.0,
          y: 40,
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // 3. Mouse Parallax (subtle opposite shift by ~6-8px)
      const parallaxXTo = gsap.quickTo(parallaxWrapper, 'x', { duration: 0.8, ease: 'power2.out' });
      const parallaxYTo = gsap.quickTo(parallaxWrapper, 'y', { duration: 0.8, ease: 'power2.out' });

      let lightXTo = null;
      let lightYTo = null;
      if (light) {
        gsap.set(light, { xPercent: -50, yPercent: -50, opacity: 0 });
        lightXTo = gsap.quickTo(light, 'x', { duration: 0.9, ease: 'power2.out' });
        lightYTo = gsap.quickTo(light, 'y', { duration: 0.9, ease: 'power2.out' });
      }

      let isLightVisible = false;

      const handleMouseMove = (e) => {
        const rect = section.getBoundingClientRect();
        const offsetX = (e.clientX - rect.left) / rect.width - 0.5;
        const offsetY = (e.clientY - rect.top) / rect.height - 0.5;

        parallaxXTo(-offsetX * 14);
        parallaxYTo(-offsetY * 14);

        if (light && lightXTo && lightYTo) {
          if (!isLightVisible) {
            gsap.to(light, { opacity: 0.18, duration: 0.4, ease: 'power2.out' });
            isLightVisible = true;
          }
          lightXTo(e.clientX - rect.left);
          lightYTo(e.clientY - rect.top);
        }
      };

      const handleMouseLeave = () => {
        parallaxXTo(0);
        parallaxYTo(0);
        if (light) {
          gsap.to(light, { opacity: 0, duration: 0.5, ease: 'power2.out' });
          isLightVisible = false;
        }
      };

      section.addEventListener('mousemove', handleMouseMove, { passive: true });
      section.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  // Toggle Mute / Unmute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center bg-[#090A0D] overflow-hidden select-none"
    >
      {/* Scroll-Responsive Wrapper (handles scale and fade on scroll) */}
      <div 
        ref={scrollLayerRef} 
        className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
      >
        {/* Parallax Transform Wrapper (with safe bleed margins) */}
        <div
          ref={parallaxWrapperRef}
          className="absolute -inset-5 w-[calc(100%+40px)] h-[calc(100%+40px)] flex items-center justify-center will-change-transform"
        >
          <video
            ref={videoRef}
            src={portfolioData.assets.heroVideo}
            poster="/videos/hero-battle-poster.jpg"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            aria-label="Shreyas BK Java Developer Cinematic Hero Video"
            className="w-full h-full object-cover object-center filter brightness-[0.94] contrast-[1.04]"
          />

          {/* Cinematic Directional Gradients: High legibility on left, scene visible on center & right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#090A0D]/90 via-[#090A0D]/60 sm:via-[#090A0D]/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D] via-transparent to-[#090A0D]/60 pointer-events-none" />
        </div>
      </div>

      {/* Cinematic Ambient Orange Light (follows mouse, behind text) */}
      <div
        ref={lightRef}
        className="absolute w-[480px] h-[480px] rounded-full pointer-events-none z-10 opacity-0 mix-blend-screen transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(255, 121, 0, 0.2) 0%, rgba(255, 121, 0, 0.05) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Main Hero Narrative Overlay */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-24 flex flex-col justify-center">
        <div ref={heroContentRef} className="max-w-2xl text-left">
          
          {/* Eyebrow Label */}
          <div className="flex items-center space-x-2 text-xs font-mono text-[#FF7900] tracking-widest uppercase mb-3">
            <span className="w-4 h-[2px] bg-[#FF7900] inline-block" />
            <span>JAVA DEVELOPER &amp; FULL STACK ENGINEER</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white leading-[1.12] mb-2">
            Hi, I'm <span className="text-white">Shreyas B K</span><span className="text-[#FF7900]">.</span>
          </h1>

          {/* Developer Title */}
          <p className="text-base sm:text-xl font-display font-medium text-[#FFAA32] tracking-wide mb-5">
            Java Developer &amp; Full Stack Engineer
          </p>

          {/* Introduction Paragraph: Clean and distraction-free */}
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-body max-w-xl mb-8">
            {portfolioData.personalIntro}
          </p>

          {/* Action Buttons: Clean contrast, no excessive neon */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
            <a
              href="#projects"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-[#FF7900] hover:bg-[#FFAA32] text-black font-display font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-sm"
            >
              <span>Explore My Work</span>
            </a>

            <a
              href={portfolioData.assets.resumePdf}
              download="Shreyas_BK_Resume.pdf"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-[#111319]/80 hover:bg-[#151820] text-white border border-white/15 hover:border-white/30 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 backdrop-blur-sm"
            >
              <Download className="w-3.5 h-3.5 text-[#FF7900]" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Deck: Controls on Left, Scroll Down in Center, Right side reserved for Robot Companion */}
      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 z-30 flex items-center space-x-2.5">
        <button
          onClick={togglePlay}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#090A0D]/80 border border-white/10 hover:border-[#FF7900]/40 text-white text-xs font-mono backdrop-blur-md transition-colors"
          title={isPlaying ? "Pause cinematic video" : "Play cinematic video"}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#FF7900]" /> : <Play className="w-3.5 h-3.5 text-[#FF7900]" />}
          <span>{isPlaying ? "Pause" : "Play Reel"}</span>
        </button>

        <button
          onClick={toggleMute}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#090A0D]/80 border border-white/10 hover:border-[#FF7900]/40 text-white text-xs font-mono backdrop-blur-md transition-colors"
          title={isMuted ? "Unmute audio" : "Mute audio"}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-content-secondary" /> : <Volume2 className="w-3.5 h-3.5 text-[#FF7900]" />}
          <span>{isMuted ? "Audio Muted" : "Audio On"}</span>
        </button>
      </div>

      {/* Center Scroll Indicator (Avoids bottom-right robot companion) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden lg:flex items-center space-x-2 text-xs font-mono text-content-secondary">
        <a
          href="#experience"
          className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#090A0D]/60 border border-white/5 hover:border-white/15 hover:text-white transition-colors backdrop-blur-sm"
        >
          <span className="text-[11px] tracking-wide">Scroll</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#FF7900] animate-bounce" />
        </a>
      </div>
    </section>
  );
};
