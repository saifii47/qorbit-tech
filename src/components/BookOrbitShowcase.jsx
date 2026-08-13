import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './BookOrbitShowcase.css';

const servicesData = [
  { id: 1, title: 'Website Design & Development', img: '/assets/images/coverflow/web-design.jpg', link: '/web-design-development' },
  { id: 2, title: 'Mobile App Development', img: '/assets/images/coverflow/mobile-app.jpg', link: '/mobile-app' },
  { id: 3, title: 'E-Commerce Development', img: '/assets/images/coverflow/ecommerce.jpg', link: '/services' },
  { id: 4, title: 'Branding & Logo Design', img: '/assets/images/coverflow/branding.jpg', link: '/logo-design' },
  { id: 5, title: 'UI/UX Design', img: '/assets/images/coverflow/ui-ux.jpg', link: '/services' },
  { id: 6, title: 'Digital Marketing & SEO', img: '/assets/images/coverflow/seo-marketing.jpg', link: '/seo' },
  { id: 7, title: 'Website Design & Development', img: '/assets/images/coverflow/web-design.jpg', link: '/web-design-development' },
  { id: 8, title: 'Mobile App Development', img: '/assets/images/coverflow/mobile-app.jpg', link: '/mobile-app' },
  { id: 9, title: 'E-Commerce Development', img: '/assets/images/coverflow/ecommerce.jpg', link: '/services' },
  { id: 10, title: 'Branding & Logo Design', img: '/assets/images/coverflow/branding.jpg', link: '/logo-design' },
  { id: 11, title: 'UI/UX Design', img: '/assets/images/coverflow/ui-ux.jpg', link: '/services' },
  { id: 12, title: 'Digital Marketing & SEO', img: '/assets/images/coverflow/seo-marketing.jpg', link: '/seo' },
];

const BookOrbitShowcase = () => {
  const orbitRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;

    const items = Array.from(orbit.querySelectorAll('.orbit-book'));
    if (!items.length) return;

    let radius = 420;
    let rotation = -8;
    let velocity = 0;
    let dragging = false;
    let lastX = 0;
    let lastMoveTime = 0;
    let lastFrame = performance.now();
    let animFrameId = null;

    const autoSpeed = 0.018;
    const dragStrength = 0.22;

    const sizeOrbit = () => {
      const width = orbit.clientWidth || window.innerWidth || 900;
      if (width < 480) {
        radius = Math.max(width * 0.58, 220);
      } else if (width < 768) {
        radius = Math.max(width * 0.52, 270);
      } else if (width < 1024) {
        radius = Math.max(width * 0.44, 340);
      } else {
        radius = Math.min(Math.max(width * 0.36, 340), 500);
      }
    };

    const render = () => {
      const width = orbit.clientWidth || window.innerWidth || 900;
      const isMobile = width <= 768;
      const step = 360 / items.length;
      items.forEach((item, index) => {
        const angle = rotation + index * step;
        const rad = (angle * Math.PI) / 180;
        const front = Math.cos(rad);
        const depth = (front + 1) / 2;
        const scale = isMobile ? (0.78 + depth * 0.34) : (0.7 + depth * 0.42);
        const lift = (1 - depth) * (isMobile ? 12 : 18);
        const brightness = 0.65 + depth * 0.45;
        const saturation = 0.88 + depth * 0.12;

        item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) translateY(${lift}px) scale(${scale})`;
        item.style.zIndex = String(Math.round(depth * 1000));
        item.style.opacity = String(isMobile ? (0.2 + depth * 0.8) : (0.34 + depth * 0.66));
        item.style.filter = `brightness(${brightness}) saturate(${saturation})`;
      });
    };

    const frame = (now) => {
      const dt = Math.min(now - lastFrame, 48);
      lastFrame = now;

      if (!dragging) {
        rotation += autoSpeed * dt;
        if (Math.abs(velocity) > 0.0005) {
          rotation += velocity * dt;
          velocity *= Math.pow(0.925, dt / 16.67);
        } else {
          velocity = 0;
        }
      }

      render();
      animFrameId = requestAnimationFrame(frame);
    };

    const stopDrag = (event) => {
      if (!dragging) return;
      dragging = false;
      orbit.classList.remove('is-dragging');
      if (event?.pointerId !== undefined && orbit.hasPointerCapture?.(event.pointerId)) {
        try {
          orbit.releasePointerCapture(event.pointerId);
        } catch (_) {}
      }
    };

    const handlePointerDown = (event) => {
      dragging = true;
      orbit.classList.add('is-dragging');
      lastX = event.clientX;
      lastMoveTime = performance.now();
      velocity = 0;
      try {
        orbit.setPointerCapture?.(event.pointerId);
      } catch (_) {}
    };

    const handlePointerMove = (event) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = event.clientX - lastX;
      const dt = Math.max(now - lastMoveTime, 8);
      const delta = dx * dragStrength;
      rotation += delta;
      velocity = delta / dt;
      lastX = event.clientX;
      lastMoveTime = now;
      render();
    };

    const handleWheel = (event) => {
      event.preventDefault();
      const wheelDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      velocity += wheelDelta * 0.00085;
      rotation += wheelDelta * 0.035;
      render();
    };

    const handleKeyDown = (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const direction = event.key === 'ArrowLeft' ? -1 : 1;
      velocity += direction * 0.07;
    };

    const handleResize = () => {
      sizeOrbit();
      render();
    };

    orbit.addEventListener('pointerdown', handlePointerDown);
    orbit.addEventListener('pointermove', handlePointerMove);
    orbit.addEventListener('pointerup', stopDrag);
    orbit.addEventListener('pointercancel', stopDrag);
    orbit.addEventListener('pointerleave', stopDrag);
    orbit.addEventListener('wheel', handleWheel, { passive: false });
    orbit.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize, { passive: true });

    sizeOrbit();
    render();
    animFrameId = requestAnimationFrame(frame);

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      orbit.removeEventListener('pointerdown', handlePointerDown);
      orbit.removeEventListener('pointermove', handlePointerMove);
      orbit.removeEventListener('pointerup', stopDrag);
      orbit.removeEventListener('pointercancel', stopDrag);
      orbit.removeEventListener('pointerleave', stopDrag);
      orbit.removeEventListener('wheel', handleWheel);
      orbit.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="qorbit-orbit-section">
      {/* Ambient Background Glows */}
      <div className="orbit-glow-1" />
      <div className="orbit-glow-2" />

      {/* Intro Header */}
      <div className="intro-strip">
        <div className="container">
          <div className="section-title text-center" data-aos="fade-up">
            <span className="eyebrow">
              <i className="bi bi-stars"></i> QORBIT SERVICES SHOWCASE
            </span>
            <h2>
              High-Performance <span className="highlight">Digital Solutions</span>
            </h2>
            <p>
              Explore our core digital engineering and creative services — engineered to elevate your brand, engage your audience, and convert visitors.
            </p>
          </div>
        </div>
      </div>

      {/* 3D Service Ring Showcase */}
      <div className="showcase-section" id="showcase">
        <div className="container">
          <div className="showcase-shell" data-aos="fade-up">
            <div
              className="book-orbit"
              id="bookOrbit"
              ref={orbitRef}
              tabIndex={0}
              aria-label="Interactive 3D service carousel. Drag, swipe, or scroll to rotate."
            >
              <div className="orbit-floor"></div>
              <div className="book-ring" id="bookRing" ref={ringRef}>
                {servicesData.map((item) => (
                  <Link
                    to={item.link}
                    className="orbit-book"
                    key={item.id}
                    title={`Explore ${item.title}`}
                  >
                    <div className="book-shell">
                      <img src={item.img} alt={item.title} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Interaction Badges */}
            <div className="orbit-caption">
              <span>
                <i className="bi bi-cursor"></i> Hold and drag
              </span>
              <span>
                <i className="bi bi-mouse"></i> Wheel to rotate
              </span>
              <span>
                <i className="bi bi-phone"></i> Swipe on mobile
              </span>
            </div>

            {/* View All Services Button */}
            <div className="cta-btn-box">
              <Link to="/services" className="btn-qorbit">
                <span>View All Services</span>
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOrbitShowcase;
