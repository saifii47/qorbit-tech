import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import heroBannerImg from '../assets/images/qorbit-hero-banner.jpg';

const Hero = ({ onOpenModal }) => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse move spotlight handler
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 50, y: 50 });
  };

  // High-Density Interactive Particle & Laser Constellation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle Configuration
    const isMobile = width <= 768;
    const particleCount = isMobile ? 55 : 120;
    const particles = [];
    const colorPalette = [
      { rgb: '37, 99, 235', glow: '#2563eb' },   // Electric Royal Blue
      { rgb: '56, 189, 248', glow: '#38bdf8' },  // Neon Cyan
      { rgb: '168, 85, 247', glow: '#a855f7' },  // Vivid Purple
      { rgb: '124, 58, 237', glow: '#7c3aed' },  // Deep Violet
    ];

    for (let i = 0; i < particleCount; i++) {
      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        baseRadius: Math.random() * 2.2 + 1.2,
        colorRgb: col.rgb,
        glowColor: col.glow,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
      });
    }

    let mousePixel = { x: width * 0.5, y: height * 0.5, active: false };
    const ripples = []; // Click shockwaves

    const onCanvasMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePixel = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onCanvasMouseLeave = () => {
      mousePixel.active = false;
    };

    const onCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 5,
        maxRadius: 180,
        alpha: 0.9,
        color: '#38bdf8',
      });
    };

    const container = heroRef.current;
    if (container) {
      container.addEventListener('mousemove', onCanvasMouseMove);
      container.addEventListener('mouseleave', onCanvasMouseLeave);
      container.addEventListener('click', onCanvasClick);
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Render Click Shockwaves
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 4;
        rip.alpha *= 0.94;

        if (rip.alpha <= 0.01 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${rip.alpha})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#38bdf8';
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 2. Update and Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Standard drift movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse size calculation
        const currentRadius = p.baseRadius + Math.sin(time + p.pulseOffset) * 0.6;

        // Interactive Mouse Laser & Gravitational Interaction
        if (mousePixel.active) {
          const dx = mousePixel.x - p.x;
          const dy = mousePixel.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 220;

          if (dist < maxDist) {
            const proximity = 1 - dist / maxDist;
            // Magnetic attraction force
            p.x += (dx / dist) * proximity * 1.6;
            p.y += (dy / dist) * proximity * 1.6;

            // Multi-Stage Glowing Laser Beam to Cursor
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mousePixel.x, mousePixel.y);
            ctx.strokeStyle = `rgba(${p.colorRgb}, ${proximity * 0.45})`;
            ctx.lineWidth = proximity * 1.6;
            ctx.stroke();

            // Inner intense laser core
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mousePixel.x, mousePixel.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${proximity * 0.3})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Draw Particle Node with Neon Halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.colorRgb}, 0.85)`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.glowColor;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inter-particle Constellation Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxConnectDist = 125;

          if (dist < maxConnectDist) {
            const connectAlpha = (1 - dist / maxConnectDist) * 0.26;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p.colorRgb}, ${connectAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('mousemove', onCanvasMouseMove);
        container.removeEventListener('mouseleave', onCanvasMouseLeave);
        container.removeEventListener('click', onCanvasClick);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bannermain hero-interactive-section"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        paddingTop: '140px',
        paddingBottom: '90px',
        background: '#04040c',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* 1. Masterpiece Full Background Visual (Visionary Digital Architect & Holographic Interfaces) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <img
          src={heroBannerImg}
          alt="QOrbit Tech Visionary Digital Architect Background"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'right center',
            filter: 'contrast(1.15) brightness(0.95)',
            opacity: 0.9,
          }}
        />

        {/* Deep Smooth Multi-Layer Vignette for High Readability & Seamless Dark Aesthetics */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(90deg, #04040c 0%, rgba(4, 4, 12, 0.95) 32%, rgba(4, 4, 12, 0.65) 60%, rgba(4, 4, 12, 0.2) 100%),
              linear-gradient(180deg, rgba(4, 4, 12, 0.75) 0%, transparent 22%, transparent 78%, #04040c 100%)
            `,
          }}
        />
      </div>

      {/* 2. Dynamic Cursor Spotlight Light Beam */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
          background: `
            radial-gradient(circle 460px at ${mousePos.x}% ${mousePos.y}%, rgba(37, 99, 235, 0.25), transparent 70%),
            radial-gradient(circle 800px at ${mousePos.x}% ${mousePos.y}%, rgba(124, 58, 237, 0.16), transparent 80%)
          `,
          transition: isHovered ? 'background 0.05s ease-out' : 'background 0.8s ease',
        }}
      />

      {/* 3. Cybernetic Ambient Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(37, 99, 235, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(37, 99, 235, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
          zIndex: 1,
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)',
        }}
      />

      {/* 4. Enhanced Interactive HTML5 Particle & Laser Constellation Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* 5. QORBIT Giant Background Typographic Watermark */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          left: '-30px',
          zIndex: 1,
          fontSize: 'clamp(120px, 16vw, 240px)',
          lineHeight: 1,
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(37, 99, 235, 0.08)',
          whiteSpace: 'nowrap',
          opacity: 0.55,
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '0.06em',
        }}
      >
        QORBIT TECH
      </div>

      {/* 6. Main Container Content */}
      <div className="container" style={{ position: 'relative', zIndex: 4 }}>
        <div className="row align-items-center" style={{ minHeight: '620px' }}>
          
          {/* Left Column: Headline, Description, CTAs, Micro-stats */}
          <div className="col-lg-7 col-md-12 text-start mb-5 mb-lg-0 hero-content-col">
            {/* Live Interactive Innovation Badge */}
            <div
              className="hero-badge-wrap"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 18px',
                borderRadius: '30px',
                background: 'rgba(13, 20, 50, 0.75)',
                border: '1px solid rgba(37, 99, 235, 0.4)',
                boxShadow: '0 0 20px rgba(37, 99, 235, 0.25), inset 0 0 15px rgba(37, 99, 235, 0.1)',
                backdropFilter: 'blur(12px)',
                marginBottom: '24px',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6',
                  boxShadow: '0 0 10px #3b82f6',
                  animation: 'pulse 1.8s infinite',
                }}
              />
              <span
                style={{
                  color: '#e0e7ff',
                  fontSize: '13px',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                ✦ Next-Gen Creative & Tech Agency
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="hero-main-title"
              style={{
                fontSize: 'clamp(32px, 4.4vw, 56px)',
                lineHeight: '1.14',
                fontWeight: 900,
                color: '#ffffff',
                marginBottom: '20px',
                letterSpacing: '-0.02em',
                fontFamily: 'Outfit, sans-serif',
                textAlign: 'left',
              }}
            >
              We Build
              <span
                style={{
                  display: 'block',
                  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 4px 25px rgba(37, 99, 235, 0.45))',
                  marginTop: '2px',
                  marginBottom: '2px',
                }}
              >
                Digital Experiences
              </span>
              That Matter
            </h1>

            {/* Subtitle */}
            <p
              className="hero-subtext"
              style={{
                fontSize: '16.5px',
                fontWeight: 400,
                lineHeight: '1.75',
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '36px',
                maxWidth: '520px',
                marginInline: '0',
                textAlign: 'left',
                textShadow: '0 2px 10px rgba(0,0,0,0.6)',
              }}
            >
              Full-service creative digital agency collaborating with brands all over the world to craft stunning digital identities.
            </p>

            {/* Call To Action Buttons */}
            <div
              className="hero-buttons-wrapper"
              style={{
                display: 'flex',
                gap: '18px',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <button
                type="button"
                onClick={onOpenModal}
                className="hero-primary-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  color: '#ffffff',
                  padding: '15px 34px',
                  borderRadius: '12px',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 700,
                  fontSize: '16px',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  boxShadow: '0 6px 30px rgba(37, 99, 235, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span>Talk To An Expert</span>
                <i className="fa fa-arrow-right" style={{ fontSize: '15px' }} />
              </button>

              <Link
                to="/services"
                className="hero-secondary-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(13, 20, 50, 0.65)',
                  border: '1px solid rgba(37, 99, 235, 0.35)',
                  color: '#ffffff',
                  padding: '15px 32px',
                  borderRadius: '12px',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <span>Explore Services</span>
                <i className="fa fa-angle-right" style={{ fontSize: '18px' }} />
              </Link>
            </div>

            {/* Micro-Stats Counter Row */}
            <div
              className="hero-stats-row"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, auto)',
                gap: 'clamp(20px, 4vw, 36px)',
                marginTop: '44px',
                paddingTop: '26px',
                borderTop: '1px solid rgba(37, 99, 235, 0.25)',
                width: 'fit-content',
              }}
            >
              {[
                { value: '780+', label: 'Projects Done' },
                { value: '96%', label: 'Happy Clients' },
                { value: '200+', label: 'Team Experts' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="stat-card"
                  style={{
                    textAlign: 'left',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      fontSize: 'clamp(26px, 3vw, 32px)',
                      fontFamily: 'Outfit, sans-serif',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontWeight: 800,
                      lineHeight: 1,
                      letterSpacing: '0.04em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      filter: 'drop-shadow(0 0 15px rgba(37, 99, 235, 0.4))',
                    }}
                  >
                    <span>{stat.value}</span>
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      marginTop: '6px',
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      fontFamily: 'Outfit, sans-serif',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Embedded Component Styles & Keyframe Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.35); }
        }

        .hero-primary-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 40px rgba(37, 99, 235, 0.75), 0 0 25px rgba(124, 58, 237, 0.5) !important;
        }

        .hero-secondary-btn:hover {
          transform: translateY(-3px) scale(1.02);
          background: rgba(37, 99, 235, 0.2) !important;
          border-color: rgba(37, 99, 235, 0.8) !important;
          box-shadow: 0 8px 30px rgba(37, 99, 235, 0.3) !important;
        }

        .stat-card:hover {
          transform: translateY(-4px);
        }

        @media (max-width: 991px) {
          .hero-interactive-section {
            padding-top: 110px !important;
            padding-bottom: 60px !important;
          }
          .hero-content-col {
            text-align: center !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            margin-bottom: 30px !important;
          }
          .hero-badge-wrap {
            margin-inline: auto !important;
          }
          .hero-main-title {
            text-align: center !important;
          }
          .hero-subtext {
            text-align: center !important;
            margin-inline: auto !important;
          }
          .hero-buttons-wrapper {
            justify-content: center !important;
            width: 100% !important;
          }
          .hero-stats-row {
            margin-inline: auto !important;
            justify-content: center !important;
          }
          .stat-card {
            text-align: center !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          .stat-card > div {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
