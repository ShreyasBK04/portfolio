import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates smooth parallax and border pulse transitions for sections.
 * Excludes pinned sections to avoid conflicting ScrollTrigger properties.
 */
export const initSectionTransitions = () => {
  const sections = document.querySelectorAll('.editorial-section:not([data-pinned="true"])');
  sections.forEach((sec) => {
    gsap.fromTo(
      sec,
      { opacity: 0.92 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sec,
          start: 'top 90%',
          end: 'top 40%',
          scrub: true,
        }
      }
    );
  });
};

