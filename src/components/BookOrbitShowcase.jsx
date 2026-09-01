import React, { useEffect, useRef, useState } from 'react';
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

const mobileServices = [
  { id: 1, title: 'Branding & Logo Design', img: '/assets/images/coverflow/branding.jpg', link: '/logo-design', num: '01' },
  { id: 2, title: 'UI/UX Design', img: '/assets/images/coverflow/ui-ux.jpg', link: '/services', num: '02' },
  { id: 3, title: 'Website Design & Dev', img: '/assets/images/coverflow/web-design.jpg', link: '/web-design-development', num: '03' },
  { id: 4, title: 'Mobile App Development', img: '/assets/images/coverflow/mobile-app.jpg', link: '/mobile-app', num: '04' },
  { id: 5, title: 'E-Commerce Development', img: '/assets/images/coverflow/ecommerce.jpg', link: '/services', num: '05' },
  { id: 6, title: 'Digital Marketing & SEO', img: '/assets/images/coverflow/seo-marketing.jpg', link: '/seo', num: '06' },
];

const BookOrbitShowcase = () => {
  const orbitRef = useRef(null);
  const ringRef = useRef(null);
  const mobileTrackRef = useRef(null);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  // Desktop Orbit 3D physics loop (Untouched on Desktop)
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
        } catch (_) { }
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
      } catch (_) { }
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

  // Track finger scroll to update active indicator (RAF-throttled to avoid scroll stutter)
  const scrollTicking = useRef(false);
  const handleMobileScroll = (e) => {
    if (scrollTicking.current) return;
    scrollTicking.current = true;
    const track = e.currentTarget;
    requestAnimationFrame(() => {
      if (track) {
        const cardWidth = 270;
        const scrollLeft = track.scrollLeft;
        const newIdx = Math.round(scrollLeft / cardWidth);
        if (newIdx >= 0 && newIdx < mobileServices.length && newIdx !== activeMobileIdx) {
          setActiveMobileIdx(newIdx);
        }
      }
      scrollTicking.current = false;
    });
  };

  const scrollToSlide = (idx) => {
    if (!mobileTrackRef.current) return;
    const cardWidth = 270;
    mobileTrackRef.current.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
    setActiveMobileIdx(idx);
  };

  const nextMobileSlide = () => {
    const nextIdx = (activeMobileIdx + 1) % mobileServices.length;
    scrollToSlide(nextIdx);
  };

  const prevMobileSlide = () => {
    const prevIdx = (activeMobileIdx - 1 + mobileServices.length) % mobileServices.length;
    scrollToSlide(prevIdx);
  };

  return (
    <section className="qorbit-orbit-section">
      {/* Ambient Background Grid & Floating Aurora Glows */}
      <div className="orbit-tech-grid" />
      <div className="orbit-glow-1" />
      <div className="orbit-glow-2" />
      <div className="orbit-bg-ring" />
      <div className="orbit-bg-ring-2" />

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
              Explore our core digital engineering and creative services, engineered to elevate your brand, engage your audience, and convert visitors.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop 3D Orbit Showcase (UNTOUCHED on Desktop) */}
      <div className="showcase-section desktop-3d-orbit-wrapper" id="showcase">
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
                {servicesData.map((item, idx) => (
                  <Link
                    to={item.link}
                    className="orbit-book"
                    key={`${item.id}-${idx}`}
                    title={`Explore ${item.title}`}
                  >
                    <div className="book-shell">
                      <img src={item.img} alt={item.title} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Interaction Badges (Desktop) */}
            <div className="orbit-caption">
              <span>
                <i className="bi bi-cursor"></i> Hold and drag
              </span>
              <span>
                <i className="bi bi-mouse"></i> Wheel to rotate
              </span>
              <span>
                <i className="bi bi-phone"></i> Drag to explore
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

      {/* Mobile-Exclusive Pure 3D Coverflow Finger-Scrollable Showcase */}
      <div className="mobile-showcase-slider-wrapper">
        <div className="mobile-coverflow-track-container" ref={mobileTrackRef} onScroll={handleMobileScroll}>
          {mobileServices.map((service, idx) => {
            const isActive = idx === activeMobileIdx;
            return (
              <Link
                to={service.link}
                key={service.id}
                className={`mobile-coverflow-card ${isActive ? 'is-active' : ''}`}
                title={service.title}
              >
                <div className="mobile-coverflow-inner">
                  <img src={service.img} alt={service.title} loading="lazy" />

                  {/* Floating Top Number Badge */}
                  <div className="mobile-card-num-badge">
                    <span>{service.num}</span>
                  </div>

                  {/* Bottom Hover/Action Glow Pill */}
                  <div className="mobile-card-explore-pill">
                    <span>Explore Service</span>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Navigation Controls (Prev / Dots / Next) */}
        <div className="mobile-showcase-bottom-bar">
          <div className="mobile-slider-controls">
            <button
              type="button"
              className="mobile-ctrl-btn"
              onClick={prevMobileSlide}
              aria-label="Previous Service"
            >
              <i className="fas fa-arrow-left"></i>
            </button>

            <div className="mobile-dots-indicator">
              {mobileServices.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`mobile-dot ${i === activeMobileIdx ? 'active' : ''}`}
                  onClick={() => scrollToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="mobile-ctrl-btn"
              onClick={nextMobileSlide}
              aria-label="Next Service"
            >
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>

          <div className="mobile-swipe-hint">
            <i className="fas fa-fingerprint"></i> Drag & swipe with finger to explore
          </div>

          {/* View All Services Button */}
          <div className="cta-btn-box mobile-cta-box">
            <Link to="/services" className="btn-qorbit">
              <span>View All Services</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOrbitShowcase;
