'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingShape from './3D/FloatingShape';
import { useRouter } from 'next/navigation';
import CustomCursor from './CustomCursor';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const overlayRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    // Initial reveal animation
    tl.from(overlayRef.current, {
      opacity: 1,
      duration: 1.5,
    })
    .from(headingRef.current.children, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out"
    }, "-=1")
    .from(subheadingRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
    }, "-=0.5")
    .from(buttonsRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
    }, "-=0.5");

    // Scroll-triggered animations
    gsap.to(containerRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    // Parallax text effect
    const splitHeading = headingRef.current.children;
    Array.from(splitHeading).forEach((element, i) => {
      gsap.to(element, {
        yPercent: (i + 1) * -10,
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    // Scale effect on scroll
    gsap.to(subheadingRef.current, {
      scale: 0.9,
      opacity: 0.8,
      scrollTrigger: {
        trigger: subheadingRef.current,
        start: "top center",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Overlay for initial animation */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black z-50 opacity-0 pointer-events-none"
      />

      {/* Main content container */}
      <div 
        ref={containerRef}
        className="relative z-10 w-full px-4 sm:px-6 lg:px-8"
      >
        <div 
          ref={textContainerRef}
          className="max-w-7xl mx-auto text-center"
        >
          <h1 
            ref={headingRef}
            className="relative space-y-4 mb-8 pt-20"
          >
            <span className="block text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold text-white tracking-tighter interactive">
              CREATE
            </span>
            <span className="block text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 interactive">
              THE FUTURE
            </span>
          </h1>
          
          <p 
            ref={subheadingRef}
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-light interactive"
          >
            Transform your digital presence with cutting-edge design and technology
          </p>

          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button 
              className="group relative w-full sm:w-48 h-14 bg-transparent overflow-hidden rounded-lg interactive"
              onClick={() => router.push('#contact')}
            >
              <span className="absolute inset-0 w-full h-full bg-white"></span>
              <span className="absolute inset-0 w-full h-full bg-black transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
              <span className="relative flex items-center justify-center text-black group-hover:text-white transition-colors duration-300 text-lg font-medium z-10">
                Get Started
              </span>
            </button>
            
            <button 
              className="group relative w-full sm:w-48 h-14 overflow-hidden rounded-lg border-2 border-white interactive"
              onClick={() => router.push('#about')}
            >
              <span className="absolute inset-0 w-full h-full bg-white transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
              <span className="relative flex items-center justify-center text-white group-hover:text-black transition-colors duration-300 text-lg font-medium z-10">
                Learn More
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3D Animated Shape */}
      <FloatingShape />

      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-gradient" />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-[5] opacity-20 pointer-events-none mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('/noise.png')]" />
      </div>
    </section>
  );
};

export default HeroSection; 