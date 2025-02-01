import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import * as THREE from 'https://unpkg.com/three@0.157.0/build/three.module.js';

const GlobeComponent = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create sphere geometry for the globe
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    
    // Load earth texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-dark.jpg');
    
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 5
    });
    
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Position camera
    camera.position.z = 15;

    // Add markers for cities
    const cities = [
      { lat: 37.7749, lng: -122.4194, size: 0.2 }, // San Francisco
      { lat: 40.7128, lng: -74.0060, size: 0.2 },  // New York
      { lat: 51.5074, lng: -0.1278, size: 0.2 },   // London
    ];

    cities.forEach(city => {
      const lat = city.lat * (Math.PI / 180);
      const lng = -city.lng * (Math.PI / 180);
      
      const markerGeometry = new THREE.SphereGeometry(city.size, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      
      // Convert lat/lng to 3D position
      const radius = 5;
      marker.position.set(
        radius * Math.cos(lat) * Math.cos(lng),
        radius * Math.sin(lat),
        radius * Math.cos(lat) * Math.sin(lng)
      );
      
      globe.add(marker);
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-screen" />;
};

export default GlobeComponent;