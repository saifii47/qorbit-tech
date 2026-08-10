import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './CoverflowCarousel.css';

const servicesData = [
  {
    id: 'web-design',
    title: 'Website Design & Development',
    subtitle: 'High-performance websites built to convert.',
    tag: 'Web Dev',
    link: '/web-design-development',
    image: '/images/coverflow/web-design.jpg',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    subtitle: 'Interfaces that look sharp and feel effortless.',
    tag: 'UI/UX',
    link: '/services',
    image: '/images/coverflow/ui-ux.jpg',
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    subtitle: 'Seamless apps designed around your users.',
    tag: 'Mobile App',
    link: '/mobile-app',
    image: '/images/coverflow/mobile-app.jpg',
  },
  {
    id: 'branding',
    title: 'Branding & Logo Design',
    subtitle: 'Distinctive identities built to be remembered.',
    tag: 'Branding',
    link: '/logo-design',
    image: '/images/coverflow/branding.jpg',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Development',
    subtitle: 'Online stores engineered for growth.',
    tag: 'E-Commerce',
    link: '/services',
    image: '/images/coverflow/ecommerce.jpg',
  },
  {
    id: 'seo-marketing',
    title: 'Digital Marketing & SEO',
    subtitle: 'Strategies that turn visibility into results.',
    tag: 'SEO & Marketing',
    link: '/seo',
    image: '/images/coverflow/seo-marketing.jpg',
  },
];

// Ring cards array
const ringCards = [...servicesData, ...servicesData];

const CoverflowCarousel = () => {
  const stageRef = useRef(null);
  const ringRef = useRef(null);

  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [ringRadius, setRingRadius] = useState(640); // Larger radius = more gap, zero overlap

  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const animFrameRef = useRef(null);
  const autoRotateSpeedRef = useRef(0.08); // Smooth slow idle rotation

  const totalItems = ringCards.length;
  const angleStep = 360 / totalItems;

  // Responsive radius calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setRingRadius(380);
      } else if (window.innerWidth <= 1024) {
        setRingRadius(520);
      } else {
        setRingRadius(640);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    angleRef.current = rotationAngle;
  }, [rotationAngle]);

  // Main animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.005) {
          angleRef.current += velocityRef.current;
          velocityRef.current *= 0.88; // Smooth controlled friction damping
        } else {
          angleRef.current += autoRotateSpeedRef.current;
        }
      }

      if (angleRef.current < 0) angleRef.current += 360;
      if (angleRef.current >= 360) angleRef.current -= 360;

      if (ringRef.current) {
        ringRef.current.style.transform = `rotateX(-4deg) rotateY(${angleRef.current}deg)`;
      }

      const normalized = (360 - (angleRef.current % 360)) % 360;
      const closestIdx = Math.round(normalized / angleStep) % totalItems;
      setActiveCardIndex(closestIdx);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [angleStep, totalItems]);

  // Pointer & Drag Handlers
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    lastXRef.current = startXRef.current;
    velocityRef.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = currentX - lastXRef.current;
    lastXRef.current = currentX;

    const sens = 0.25; // Controlled drag sensitivity
    angleRef.current += deltaX * sens;
    velocityRef.current = deltaX * sens * 0.5;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  // Mouse Wheel Handler (Slowed down to sensitivity ~0.3)
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY || e.deltaX;
    // Reduced sensitivity multiplier from 0.04 to 0.01 for controlled, smooth rotation
    velocityRef.current += delta * 0.01;
  };

  const handleCardClick = (index, e) => {
    const targetAngle = 360 - index * angleStep;
    let diff = targetAngle - angleRef.current;
    while (diff < -180) diff += 360;
    while (diff > 180) diff -= 360;
    velocityRef.current = diff * 0.12;
  };

  return (
    <section className="orbit-showcase-section">
      {/* Ambient Background Glows */}
      <div className="orbit-bg-glow-1" />
      <div className="orbit-bg-glow-2" />

      <div className="orbit-container">
        {/* Section Header */}
        <div className="orbit-header">
          <span className="orbit-badge">Showcase</span>
          <h2 className="orbit-title">
            Our Digital <span className="highlight">Capabilities</span>
          </h2>
          <p className="orbit-subtitle">
            Explore our end-to-end digital engineering and creative design services built for industry leaders.
          </p>
        </div>

        {/* 3D Orbit Stage */}
        <div
          ref={stageRef}
          className={`orbit-stage ${isDragging ? 'is-dragging' : ''}`}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          onWheel={handleWheel}
        >
          {/* Elliptical Floor Reflection */}
          <div className="orbit-floor" />

          {/* 3D Rotating Ring */}
          <div ref={ringRef} className="orbit-ring">
            {ringCards.map((service, index) => {
              const cardAngle = index * angleStep;

              return (
                <div
                  key={`${service.id}-${index}`}
                  className={`orbit-card-wrapper ${index === activeCardIndex ? 'is-active' : ''}`}
                  style={{
                    transform: `rotateY(${cardAngle}deg) translateZ(${ringRadius}px)`,
                  }}
                  onClick={(e) => handleCardClick(index, e)}
                >
                  <Link to={service.link} className="orbit-card" onClick={(e) => e.stopPropagation()}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="orbit-card-img"
                      onError={(e) => {
                        if (e.target.src.endsWith('.jpg')) {
                          e.target.src = e.target.src.replace('.jpg', '.png');
                        }
                      }}
                    />
                    <div className="orbit-card-overlay">
                      <span className="orbit-card-badge">{service.tag}</span>
                      <h3 className="orbit-card-title">{service.title}</h3>
                      <p className="orbit-card-desc">{service.subtitle}</p>
                      <span className="orbit-card-cta">Explore Service &rarr;</span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 Instruction Badges at Bottom */}
        <div className="orbit-instructions">
          <div className="instruction-pill">
            <span className="instruction-pill-icon">📐</span>
            <span>Hold and drag</span>
          </div>
          <div className="instruction-pill">
            <span className="instruction-pill-icon">🖱️</span>
            <span>Wheel to rotate</span>
          </div>
          <div className="instruction-pill">
            <span className="instruction-pill-icon">📱</span>
            <span>Swipe on mobile</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverflowCarousel;
