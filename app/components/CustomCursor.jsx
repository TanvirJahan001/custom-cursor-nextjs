'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const moveTimeout = useRef(null);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // More responsive spring for the dot
  const dotSpringConfig = { damping: 15, stiffness: 300 };
  const dotXSpring = useSpring(dotX, dotSpringConfig);
  const dotYSpring = useSpring(dotY, dotSpringConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      cursorX.set(mouseX);
      cursorY.set(mouseY);

      // Calculate relative mouse movement for the inner dot
      // This creates a maximum movement range of ±10 pixels
      const deltaX = (e.movementX || 0) * 0.5;
      const deltaY = (e.movementY || 0) * 0.5;
      
      // Limit the dot's movement within bounds (-10 to 10 pixels)
      const newX = Math.max(-10, Math.min(10, dotX.get() + deltaX));
      const newY = Math.max(-10, Math.min(10, dotY.get() + deltaY));
      
      dotX.set(newX);
      dotY.set(newY);

      // Reset the moving timeout
      setIsMoving(true);
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
      
      // Set timeout to return dot to center when mouse stops
      moveTimeout.current = setTimeout(() => {
        setIsMoving(false);
        animate(dotX, 0, { type: "spring", ...dotSpringConfig });
        animate(dotY, 0, { type: "spring", ...dotSpringConfig });
      }, 150);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    window.addEventListener('mousemove', moveCursor);
    
    const interactiveElements = document.querySelectorAll('button, a, input, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none mix-blend-difference z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovered ? 1.5 : 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          scale: {
            type: "spring",
            damping: 25,
            stiffness: 700
          }
        }}
      >
        {/* Inner dot with independent movement */}
        <motion.div 
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            x: dotXSpring,
            y: dotYSpring,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
          animate={{
            scale: isHovered ? 1.5 : 1,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 700
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor; 