'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FloatingShape = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const sphereRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    sceneRef.current = new THREE.Scene();
    
    // Camera setup
    cameraRef.current = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current.position.z = 5;

    // Renderer setup
    rendererRef.current = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    rendererRef.current.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    rendererRef.current.setClearColor(0x000000, 0);
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Create sphere
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      color: 0x4f46e5,
      shininess: 100,
      specular: 0x4f46e5,
      emissive: 0x372dc3,
      emissiveIntensity: 0.5,
    });
    sphereRef.current = new THREE.Mesh(geometry, material);
    sceneRef.current.add(sphereRef.current);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    sceneRef.current.add(pointLight);

    // Mouse move handler
    const handleMouseMove = (event) => {
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate normalized mouse position (-1 to 1)
      mousePosition.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mousePosition.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Scale the movement
      targetPosition.current.x = mousePosition.current.x * 2;
      targetPosition.current.y = mousePosition.current.y * 2;
    };

    // Animation
    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);

      if (sphereRef.current) {
        // Smooth movement towards target position
        sphereRef.current.position.x += (targetPosition.current.x - sphereRef.current.position.x) * 0.05;
        sphereRef.current.position.y += (targetPosition.current.y - sphereRef.current.position.y) * 0.05;
        
        // Rotate based on movement
        sphereRef.current.rotation.x += 0.01;
        sphereRef.current.rotation.y += 0.01;
        
        // Add pulsing effect
        const scale = 1 + Math.sin(Date.now() * 0.002) * 0.1;
        sphereRef.current.scale.set(scale, scale, scale);
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener('resize', handleResize);
    containerRef.current.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frame);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default FloatingShape; 