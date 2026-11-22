import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

/**
 * RobotCompanion - Interactive, friendly mechanical assistant with cute emotions.
 * 
 * Emotions & Behaviors:
 * 1. HAPPY: Welcomes visitor on load with a subtle bounce, bright eyes, and friendly greeting.
 * 2. CURIOUS: Tilts head and tracks cursor with expressive eyes when mouse moves nearby; asks "What are you exploring?".
 * 3. EXCITED: Bounces with brightened eyes and joyful wave when visitor clicks a project or "Explore My Work".
 * 4. SLEEPY: Dims eyes and gently sways after 30s of inactivity ("Taking a tiny break..."), wakes up instantly on mouse movement.
 * 5. CLICK INTERACTION: Hops happily, waves, and shares friendly rotating messages when clicked.
 * 
 * Design & Constraints:
 * - Preserves existing graphite/gunmetal chassis, orange accents, visor, and size.
 * - Responsive & accessible: respects prefers-reduced-motion and touch devices.
 * - Non-blocking: pointer-events-none on outer container, placed safely at bottom-right.
 */
export const RobotCompanion = () => {
  const containerRef = useRef(null);
  const headRef = useRef(null);
  const eyeLeftRef = useRef(null);
  const eyeRightRef = useRef(null);
  const armRightRef = useRef(null);
  const antennaBulbRef = useRef(null);
  const speechBubbleRef = useRef(null);
  const thrusterGlowRef = useRef(null);

  // Emotions: 'happy' | 'curious' | 'excited' | 'sleepy' | 'neutral'
  const [emotion, setEmotion] = useState('happy');
  const emotionRef = useRef('happy');

  useEffect(() => {
    emotionRef.current = emotion;
  }, [emotion]);

  const [message, setMessage] = useState("Hey! Welcome to my portfolio.");
  const [isBubbleVisible, setIsBubbleVisible] = useState(true);

  // Timeouts and state locks
  const bubbleTimerRef = useRef(null);
  const emotionTimerRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const floatAnimRef = useRef(null);

  const clickMessages = [
    "Always happy to help!",
    "Thanks for visiting my portfolio! ✨",
    "Ready to build something great!",
    "Feel free to reach out anytime! 📬"
  ];

  // Helper to show bubble with auto-dismiss
  const showBubble = useCallback((text, duration = 4000) => {
    setMessage(text);
    setIsBubbleVisible(true);
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    if (duration > 0) {
      bubbleTimerRef.current = setTimeout(() => {
        setIsBubbleVisible(false);
      }, duration);
    }
  }, []);

  // Check user preferences & device features
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isTouchDevice = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches);

  // Smooth speech bubble animation with GSAP
  useEffect(() => {
    if (!speechBubbleRef.current) return;
    if (prefersReducedMotion) {
      speechBubbleRef.current.style.opacity = isBubbleVisible ? '1' : '0';
      return;
    }

    if (isBubbleVisible) {
      gsap.fromTo(
        speechBubbleRef.current,
        { opacity: 0, scale: 0.88, y: 8 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.8)' }
      );
    } else {
      gsap.to(speechBubbleRef.current, {
        opacity: 0,
        scale: 0.92,
        y: 6,
        duration: 0.25,
        ease: 'power2.in',
      });
    }
  }, [isBubbleVisible, prefersReducedMotion]);

  // Main lifecycle, idle animations, interactivity and timers
  useEffect(() => {
    const container = containerRef.current;
    const head = headRef.current;
    const eyeL = eyeLeftRef.current;
    const eyeR = eyeRightRef.current;
    const armR = armRightRef.current;
    const thruster = thrusterGlowRef.current;
    const bulb = antennaBulbRef.current;

    if (!container) return;

    // 1. Subtle idle hovering float animation
    if (!prefersReducedMotion) {
      floatAnimRef.current = gsap.to(container, {
        y: -5,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Subtle thruster flame pulse
      if (thruster) {
        gsap.to(thruster, {
          opacity: 0.85,
          scale: 1.15,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: '50% 50%',
        });
      }
    }

    // 2. Initial HAPPY greeting on page load
    showBubble("Hey! Welcome to my portfolio.", 4200);
    setEmotion('happy');

    if (!prefersReducedMotion) {
      // Gentle initial welcome bounce
      gsap.fromTo(
        container,
        { y: 8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => {
            // Small friendly arm greeting
            if (armR) {
              gsap.fromTo(
                armR,
                { rotation: 0 },
                { rotation: -28, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }
              );
            }
          }
        }
      );
    }

    // Transition from initial happy to neutral after 4 seconds
    emotionTimerRef.current = setTimeout(() => {
      if (emotionRef.current === 'happy') {
        setEmotion('neutral');
      }
    }, 4200);

    // 3. Eye Blink scheduler for neutral / curious states
    let blinkTimer = null;
    const scheduleBlink = () => {
      const delay = gsap.utils.random(3.5, 6.5) * 1000;
      blinkTimer = setTimeout(() => {
        if (emotionRef.current !== 'sleepy' && eyeL && eyeR && !prefersReducedMotion) {
          gsap.to([eyeL, eyeR], {
            scaleY: 0.1,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            transformOrigin: '50% 50%',
            onComplete: scheduleBlink,
          });
        } else {
          scheduleBlink();
        }
      }, delay);
    };
    scheduleBlink();

    // 4. GSAP quickTo setters for smooth, performant mouse tracking
    let headRotate, headTiltX, headTiltY, eyeLX, eyeLY, eyeRX, eyeRY;
    if (!prefersReducedMotion && !isTouchDevice && head) {
      headRotate = gsap.quickTo(head, 'rotation', { duration: 0.25, ease: 'power2.out' });
      headTiltX = gsap.quickTo(head, 'x', { duration: 0.25, ease: 'power2.out' });
      headTiltY = gsap.quickTo(head, 'y', { duration: 0.25, ease: 'power2.out' });

      if (eyeL && eyeR) {
        eyeLX = gsap.quickTo(eyeL, 'x', { duration: 0.2, ease: 'power2.out' });
        eyeLY = gsap.quickTo(eyeL, 'y', { duration: 0.2, ease: 'power2.out' });
        eyeRX = gsap.quickTo(eyeR, 'x', { duration: 0.2, ease: 'power2.out' });
        eyeRY = gsap.quickTo(eyeR, 'y', { duration: 0.2, ease: 'power2.out' });
      }
    }

    // 5. Inactivity detection: Transition to SLEEPY after 30 seconds
    const INACTIVITY_LIMIT_MS = 30000;

    const startSleepyState = () => {
      if (emotionRef.current === 'excited') return; // Don't interrupt excited state
      setEmotion('sleepy');
      showBubble("Taking a tiny break...", 6000);

      if (!prefersReducedMotion) {
        // Slow gentle idle sway
        if (floatAnimRef.current) {
          floatAnimRef.current.timeScale(0.45);
        }
        if (head) {
          gsap.to(head, { rotation: -3, y: 2.5, duration: 1.2, ease: 'power1.out' });
        }
        if (bulb) {
          gsap.to(bulb, { fill: '#944800', duration: 1 });
        }
      }
    };

    const resetInactivityTimer = () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(startSleepyState, INACTIVITY_LIMIT_MS);
    };

    // Wake robot up if currently sleepy
    const wakeUpIfSleepy = () => {
      if (emotionRef.current === 'sleepy') {
        setEmotion('neutral');
        setIsBubbleVisible(false);

        if (!prefersReducedMotion) {
          if (floatAnimRef.current) {
            floatAnimRef.current.timeScale(1);
          }
          if (head) {
            gsap.to(head, { rotation: 0, y: 0, duration: 0.4, ease: 'power2.out' });
          }
          if (bulb) {
            gsap.to(bulb, { fill: '#FF7900', duration: 0.4 });
          }
        }
      }
    };

    // Start inactivity countdown
    resetInactivityTimer();

    // 6. Mouse movement handler (CURIOUS emotion & Cursor Tracking)
    let isNearby = false;

    const onMouseMove = (e) => {
      resetInactivityTimer();
      wakeUpIfSleepy();

      if (isTouchDevice || prefersReducedMotion) return;

      const rect = container.getBoundingClientRect();
      const robotCenterX = rect.left + rect.width / 2;
      const robotCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - robotCenterX;
      const deltaY = e.clientY - robotCenterY;
      const dist = Math.hypot(deltaX, deltaY);

      // Normalized coordinates (-1 to 1)
      const normX = Math.max(-1, Math.min(1, deltaX / (window.innerWidth / 2)));
      const normY = Math.max(-1, Math.min(1, deltaY / (window.innerHeight / 2)));

      // Cursor tracking on head and eyes
      if (headRotate) {
        // Add subtle curious tilt if nearby
        const extraCuriousTilt = isNearby ? (normX < 0 ? -4 : 4) : 0;
        headRotate(normX * 10 + extraCuriousTilt);
        headTiltX(normX * 3.5);
        headTiltY(normY * 2.5);
      }

      if (eyeLX && eyeRX && emotionRef.current !== 'happy') {
        eyeLX(normX * 3.2);
        eyeLY(normY * 2.2);
        eyeRX(normX * 3.2);
        eyeRY(normY * 2.2);
      }

      // Proximity detection: CURIOUS emotion when cursor comes near (< 260px)
      if (dist < 260 && !isNearby) {
        isNearby = true;
        if (emotionRef.current !== 'excited') {
          setEmotion('curious');
          showBubble("What are you exploring?", 3800);

          if (armR) {
            gsap.to(armR, { rotation: -32, duration: 0.35, ease: 'back.out(2)' });
          }
          if (bulb) {
            gsap.to(bulb, { fill: '#FFAA32', duration: 0.2 });
          }
        }
      } else if (dist >= 320 && isNearby) {
        isNearby = false;
        if (emotionRef.current === 'curious') {
          setEmotion('neutral');
          if (armR) {
            gsap.to(armR, { rotation: 0, duration: 0.4, ease: 'power2.out' });
          }
          if (bulb) {
            gsap.to(bulb, { fill: '#FF7900', duration: 0.3 });
          }
        }
      }
    };

    // 7. Global Activity Listener for wake-up and EXCITED emotion
    const onUserActivity = () => {
      resetInactivityTimer();
      wakeUpIfSleepy();
    };

    // Detect click on Projects or "Explore My Work" button -> EXCITED emotion
    const onDocumentClick = (e) => {
      onUserActivity();

      // Check if clicked element is "Explore My Work" or a Project Card / Project Link
      const target = e.target;
      if (!target) return;

      const isExploreButton = target.closest('a[href="#projects"]');
      const isProjectCard = target.closest('.project-card-item') || target.closest('#projects');

      // Check if user clicked the project or explore button (and not the robot itself)
      if ((isExploreButton || isProjectCard) && !target.closest('[data-robot-companion]')) {
        // Trigger EXCITED emotion
        setEmotion('excited');
        showBubble("Cool project, right?", 3800);

        if (!prefersReducedMotion) {
          // Small excited bounce
          gsap.fromTo(
            container,
            { y: 0 },
            {
              y: -14,
              duration: 0.18,
              yoyo: true,
              repeat: 2,
              ease: 'power2.out',
            }
          );

          // Enthusiastic arm wave
          if (armR) {
            gsap.fromTo(
              armR,
              { rotation: 0 },
              {
                rotation: -42,
                duration: 0.15,
                yoyo: true,
                repeat: 3,
                ease: 'power1.inOut',
                onComplete: () => {
                  gsap.to(armR, { rotation: 0, duration: 0.3 });
                }
              }
            );
          }

          // Antenna glow brighten
          if (bulb) {
            gsap.fromTo(bulb, { fill: '#FF7900' }, { fill: '#FFAA32', duration: 0.2, yoyo: true, repeat: 3 });
          }
        }

        // Return to neutral after excited animation finishes
        if (emotionTimerRef.current) clearTimeout(emotionTimerRef.current);
        emotionTimerRef.current = setTimeout(() => {
          if (emotionRef.current === 'excited') {
            setEmotion('neutral');
          }
        }, 3800);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onUserActivity, { passive: true });
    window.addEventListener('keydown', onUserActivity, { passive: true });
    window.addEventListener('touchstart', onUserActivity, { passive: true });
    document.addEventListener('click', onDocumentClick, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onUserActivity);
      window.removeEventListener('keydown', onUserActivity);
      window.removeEventListener('touchstart', onUserActivity);
      document.removeEventListener('click', onDocumentClick);

      if (floatAnimRef.current) floatAnimRef.current.kill();
      clearTimeout(blinkTimer);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
      if (emotionTimerRef.current) clearTimeout(emotionTimerRef.current);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [prefersReducedMotion, isTouchDevice, showBubble]);

  // 5. CLICK INTERACTION: Happy bounce + playful arm wave + random friendly quote
  const handleRobotClick = () => {
    // Reset inactivity
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(() => {
        if (emotionRef.current !== 'excited') setEmotion('sleepy');
      }, 30000);
    }

    setEmotion('happy');

    // Pick random friendly message
    const nextMsg = clickMessages[Math.floor(Math.random() * clickMessages.length)];
    showBubble(nextMsg, 4000);

    if (!prefersReducedMotion) {
      // Gentle happy hop
      gsap.fromTo(
        containerRef.current,
        { y: 0 },
        {
          y: -12,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
        }
      );

      // Playful 2-beat arm wave
      if (armRightRef.current) {
        gsap.fromTo(
          armRightRef.current,
          { rotation: -10 },
          {
            rotation: -42,
            duration: 0.16,
            yoyo: true,
            repeat: 3,
            ease: 'power1.inOut',
            onComplete: () => {
              gsap.to(armRightRef.current, { rotation: 0, duration: 0.3 });
            },
          }
        );
      }

      // Antenna bulb blink
      if (antennaBulbRef.current) {
        gsap.fromTo(antennaBulbRef.current, { fill: '#FFAA32' }, { fill: '#FF7900', duration: 0.2, yoyo: true, repeat: 2 });
      }
    }

    // Return to neutral after 4s
    if (emotionTimerRef.current) clearTimeout(emotionTimerRef.current);
    emotionTimerRef.current = setTimeout(() => {
      if (emotionRef.current === 'happy') {
        setEmotion('neutral');
      }
    }, 4000);
  };

  return (
    <aside
      className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40 select-none pointer-events-none"
      aria-label="Interactive robot companion"
      data-robot-companion="true"
    >
      <div className="relative flex flex-col items-end">

        {/* Speech Bubble (Appears smoothly above robot) */}
        <div
          ref={speechBubbleRef}
          className={`pointer-events-auto max-w-[215px] mb-3 px-3.5 py-2 rounded-2xl bg-[#111319]/95 border border-white/10 shadow-2xl backdrop-blur-md transition-opacity duration-300 ${isBubbleVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center space-x-1.5 mb-1">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${emotion === 'sleepy'
                  ? 'bg-amber-600'
                  : emotion === 'excited'
                    ? 'bg-[#FFAA32] animate-ping'
                    : 'bg-[#FF7900] animate-pulse'
                }`}
            />
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF7900] font-semibold">
              {emotion === 'sleepy'
                ? 'SBK Companion • Zzz'
                : emotion === 'excited'
                  ? 'SBK Companion • Excited'
                  : emotion === 'curious'
                    ? 'SBK Companion • Curious'
                    : 'SBK Companion'}
            </span>
          </div>
          <p className="text-xs font-body text-content-main leading-relaxed">
            {message}
          </p>

          {/* Speech bubble pointer notch */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#111319] border-r border-b border-white/10 rotate-45" />
        </div>

        {/* Robot Interactive Button Wrapper */}
        <button
          type="button"
          onClick={handleRobotClick}
          className="pointer-events-auto group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7900] rounded-full p-1"
          aria-label="Interact with robot companion"
          title="Click to interact with robot companion"
        >
          <div
            ref={containerRef}
            className="w-[95px] h-[115px] sm:w-[105px] sm:h-[125px] relative will-change-transform filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.65)]"
          >
            <svg
              viewBox="0 0 100 120"
              width="100%"
              height="100%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible"
            >
              <defs>
                {/* Graphite Robot Body Gradient */}
                <linearGradient id="botChassisGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2A303D" />
                  <stop offset="50%" stopColor="#181C26" />
                  <stop offset="100%" stopColor="#0F1219" />
                </linearGradient>

                {/* Gunmetal Visor Ring */}
                <linearGradient id="botVisorBevel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4A5568" />
                  <stop offset="100%" stopColor="#1A202C" />
                </linearGradient>

                {/* Silver Metal Accents */}
                <linearGradient id="botSilver" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#CBD5E1" />
                  <stop offset="100%" stopColor="#64748B" />
                </linearGradient>

                {/* Standard Orange Eye Glow */}
                <filter id="botEyeGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Bright Orange Eye Glow (Happy / Excited) */}
                <filter id="botEyeGlowBright" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="3.2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Dim Eye Glow (Sleepy) */}
                <filter id="botEyeGlowDim" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 1. FLOATING THRUSTER GLOW & DISK (Base) */}
              <ellipse
                ref={thrusterGlowRef}
                cx="50"
                cy="110"
                rx={emotion === 'sleepy' ? "15" : "20"}
                ry="4.5"
                fill="#FF7900"
                opacity={emotion === 'sleepy' ? "0.25" : emotion === 'excited' ? "0.8" : "0.5"}
                filter="url(#botEyeGlow)"
                className="transition-all duration-700"
              />
              <ellipse
                cx="50"
                cy="105"
                rx="14"
                ry="3"
                fill="url(#botSilver)"
                stroke="#334155"
                strokeWidth="0.8"
              />

              {/* 2. MAIN TORSO (Rounded capsule chassis) */}
              <g id="robot-torso">
                <rect
                  x="28"
                  y="62"
                  width="44"
                  height="40"
                  rx="18"
                  fill="url(#botChassisGrad)"
                  stroke="#475569"
                  strokeWidth="1"
                />

                {/* Chest Armor Plate */}
                <rect
                  x="35"
                  y="70"
                  width="30"
                  height="22"
                  rx="8"
                  fill="#111319"
                  stroke="#334155"
                  strokeWidth="0.8"
                />

                {/* Chest Power Conduit Light */}
                <circle
                  cx="50"
                  cy="81"
                  r="3"
                  fill={emotion === 'sleepy' ? "#8C4300" : emotion === 'excited' ? "#FFAA32" : "#FF7900"}
                  opacity={emotion === 'sleepy' ? "0.4" : "0.9"}
                  filter={emotion === 'excited' ? "url(#botEyeGlowBright)" : "url(#botEyeGlow)"}
                  className="transition-all duration-500"
                />
                <circle cx="50" cy="81" r="1.3" fill="#FFFFFF" opacity={emotion === 'sleepy' ? "0.5" : "1"} />

                {/* Dual Chest Micro Status Lines */}
                <line x1="42" y1="76" x2="46" y2="76" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
                <line
                  x1="54"
                  y1="76"
                  x2="58"
                  y2="76"
                  stroke={emotion === 'sleepy' ? "#663300" : "#FF7900"}
                  strokeWidth="1"
                  strokeLinecap="round"
                  className="transition-colors duration-500"
                />
              </g>

              {/* 3. LEFT MECHANICAL ARM (Resting naturally at side) */}
              <g id="robot-arm-left">
                <circle cx="24" cy="72" r="3.5" fill="url(#botSilver)" stroke="#334155" strokeWidth="0.8" />
                <rect x="18" y="72" width="7" height="18" rx="3.5" fill="url(#botChassisGrad)" stroke="#475569" strokeWidth="0.8" />
                <circle cx="21.5" cy="91" r="3" fill="url(#botSilver)" />
              </g>

              {/* 4. RIGHT MECHANICAL ARM (Articulated greeting arm) */}
              <g
                ref={armRightRef}
                id="robot-arm-right"
                style={{ transformOrigin: '76px 72px' }}
                className="will-change-transform"
              >
                <circle cx="76" cy="72" r="3.5" fill="url(#botSilver)" stroke="#334155" strokeWidth="0.8" />
                <rect x="75" y="72" width="7" height="18" rx="3.5" fill="url(#botChassisGrad)" stroke="#475569" strokeWidth="0.8" />
                <circle cx="78.5" cy="91" r="3.2" fill="url(#botSilver)" />
                <circle cx="78.5" cy="82" r="1.2" fill="#FF7900" />
              </g>

              {/* 5. ROBOT HEAD ASSEMBLY (Rotates & tracks cursor) */}
              <g
                ref={headRef}
                id="robot-head"
                style={{ transformOrigin: '50px 58px' }}
                className="will-change-transform"
              >
                {/* Top Antenna Stem & Glowing Bulb */}
                <line x1="50" y1="20" x2="50" y2="10" stroke="url(#botSilver)" strokeWidth="1.6" strokeLinecap="round" />
                <circle
                  ref={antennaBulbRef}
                  cx="50"
                  cy="9"
                  r="3"
                  fill={emotion === 'sleepy' ? "#8C4300" : emotion === 'excited' || emotion === 'happy' ? "#FFAA32" : "#FF7900"}
                  opacity={emotion === 'sleepy' ? "0.45" : "1"}
                  filter={emotion === 'excited' || emotion === 'happy' ? "url(#botEyeGlowBright)" : "url(#botEyeGlow)"}
                  className="transition-colors duration-500"
                />

                {/* Head Outer Skull (Rounded dome) */}
                <rect
                  x="20"
                  y="18"
                  width="60"
                  height="44"
                  rx="22"
                  fill="url(#botChassisGrad)"
                  stroke="#475569"
                  strokeWidth="1.2"
                />

                {/* Silver Ear Pods / Audio Sensors */}
                <rect x="16" y="32" width="4" height="14" rx="2" fill="url(#botSilver)" stroke="#334155" strokeWidth="0.8" />
                <rect x="80" y="32" width="4" height="14" rx="2" fill="url(#botSilver)" stroke="#334155" strokeWidth="0.8" />
                <circle cx="18" cy="39" r="1" fill="#FF7900" />
                <circle cx="82" cy="39" r="1" fill="#FF7900" />

                {/* Dark Smoked Glass Visor Screen */}
                <rect
                  x="25"
                  y="26"
                  width="50"
                  height="26"
                  rx="13"
                  fill="#0B0D12"
                  stroke="url(#botVisorBevel)"
                  strokeWidth="1"
                />

                {/* Visor Specular Glass Arc Highlight */}
                <path
                  d="M29 32 Q50 27 71 32"
                  stroke="#FFFFFF"
                  strokeOpacity="0.15"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />

                {/* EXPRESSIVE ROBOT EYES SYSTEM */}
                {emotion === 'sleepy' ? (
                  // SLEEPY: Relaxed resting eyelids (- -) with soft dim glow
                  <g id="robot-eyes-sleepy" className="transition-opacity duration-700">
                    <line
                      x1="36"
                      y1="40"
                      x2="46"
                      y2="40"
                      stroke="#FF7900"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      opacity="0.6"
                      filter="url(#botEyeGlowDim)"
                    />
                    <line
                      x1="54"
                      y1="40"
                      x2="64"
                      y2="40"
                      stroke="#FF7900"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      opacity="0.6"
                      filter="url(#botEyeGlowDim)"
                    />
                  </g>
                ) : emotion === 'happy' ? (
                  // HAPPY: Cheerful smiling arcs (^ ^)
                  <g id="robot-eyes-happy">
                    <path
                      d="M36 41 Q41 33 46 41"
                      stroke="#FFAA32"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      filter="url(#botEyeGlowBright)"
                    />
                    <path
                      d="M54 41 Q59 33 64 41"
                      stroke="#FFAA32"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      filter="url(#botEyeGlowBright)"
                    />
                  </g>
                ) : emotion === 'excited' ? (
                  // EXCITED: Brightened sparkling eyes with extra gleam
                  <g id="robot-eyes-excited">
                    <g ref={eyeLeftRef} className="will-change-transform">
                      <rect
                        x="36"
                        y="33"
                        width="9.5"
                        height="11"
                        rx="4.5"
                        fill="#FFAA32"
                        filter="url(#botEyeGlowBright)"
                      />
                      <rect x="38" y="34.5" width="4" height="4.5" rx="1.8" fill="#FFFFFF" />
                    </g>
                    <g ref={eyeRightRef} className="will-change-transform">
                      <rect
                        x="54.5"
                        y="33"
                        width="9.5"
                        height="11"
                        rx="4.5"
                        fill="#FFAA32"
                        filter="url(#botEyeGlowBright)"
                      />
                      <rect x="56.5" y="34.5" width="4" height="4.5" rx="1.8" fill="#FFFFFF" />
                    </g>
                  </g>
                ) : (
                  // NEUTRAL & CURIOUS: Expressive tracking pupils
                  <g id="robot-eyes-tracking">
                    <g ref={eyeLeftRef} className="will-change-transform">
                      <rect
                        x="37"
                        y="34"
                        width="8"
                        height="10"
                        rx="4"
                        fill="#FF7900"
                        filter="url(#botEyeGlow)"
                      />
                      <rect x="39" y="36" width="3" height="4" rx="1.5" fill="#FFFFFF" />
                    </g>
                    <g ref={eyeRightRef} className="will-change-transform">
                      <rect
                        x="55"
                        y="34"
                        width="8"
                        height="10"
                        rx="4"
                        fill="#FF7900"
                        filter="url(#botEyeGlow)"
                      />
                      <rect x="57" y="36" width="3" height="4" rx="1.5" fill="#FFFFFF" />
                    </g>
                  </g>
                )}
              </g>
            </svg>
          </div>
        </button>

      </div>
    </aside>
  );
};
