import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes staggered reveal animations for editorial elements.
 * @param {HTMLElement} container 
 */
export const initEditorialReveals = (container) => {
  if (!container) return;

  const elements = container.querySelectorAll('[data-reveal]');
  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  });
};

