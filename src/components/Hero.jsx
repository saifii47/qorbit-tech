import React from 'react';
import { Link } from 'react-router-dom';
import heroBannerImg from '../assets/images/hero-banner.png';

const Hero = ({ onOpenModal }) => (
  <section className="bannermain" style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
    {/* Clean, Full HD Background Image */}
    <img
      src={heroBannerImg}
      alt="Hero Background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'none',
        WebkitFilter: 'none',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
      }}
    />
    <div className="container" style={{ position: 'relative', zIndex: 4, paddingTop: '100px' }}>
      <div className="row align-items-center">
        <div className="col-md-12 col-lg-7 texture1">
          <h1 style={{ fontSize: '58px', lineHeight: '1.08', fontWeight: 900, marginBottom: '0' }}>
            We Build
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Digital Experiences
            </span>
            That Matter
          </h1>

          <p style={{
            fontSize: '17px', fontWeight: 400, lineHeight: '1.8',
            color: 'rgba(255,255,255,0.7)', margin: '24px 0',
            maxWidth: '480px',
          }}>
            Full-service creative digital agency collaborating with brands
            all over the world to craft stunning digital identities.
          </p>

          <div className="btnstyle-bann" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              className="fill-btn"
              href="#"
              onClick={(e) => { e.preventDefault(); onOpenModal(); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                color: '#fff', padding: '14px 32px', borderRadius: '8px',
                fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px',
                letterSpacing: '0.08em', textDecoration: 'none',
                boxShadow: '0 4px 25px rgba(37,99,235,0.4)',
                transition: 'all 0.3s ease',
                border: 'none',
              }}
            >
              Talk To An Expert <i className="fa fa-arrow-right" />
            </a>

            <Link
              to="/about-us"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', padding: '14px 32px', borderRadius: '8px',
                fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px',
                letterSpacing: '0.08em', textDecoration: 'none',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
              }}
            >
              About Us <i className="fa fa-angle-right" />
            </Link>
          </div>

          {/* Micro-stats row */}
          <div style={{
            display: 'flex', gap: '32px', marginTop: '48px',
            paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.08)',
          }}>
            {[
              { value: '780+', label: 'Projects Done' },
              { value: '96%', label: 'Happy Clients' },
              { value: '200+', label: 'Team Experts' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontSize: '28px', fontFamily: 'Bebas Neue, sans-serif',
                  background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text', lineHeight: 1,
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <style>{`
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      .fill-btn:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 35px rgba(37,99,235,0.55) !important;
      }
    `}</style>
  </section>
);

export default Hero;
