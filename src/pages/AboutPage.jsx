import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import PopupForm from '../components/PopupForm';
import Counter from '../components/Counter';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import MeetTheFounders from '../components/MeetTheFounders';
import CtaBanner from '../components/CtaBanner';

const AboutPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Inner Banner */}
      <section
        className="inner-banner inner_bann"
        style={{
          background: 'url(https://www.pinnacledesignagency.com/assets/images/inner-banner/about-bann.jpg) center center / cover no-repeat',
          padding: '160px 0 100px',
          color: '#ffffff',
          borderBottom: '1px solid rgba(37,99,235,0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(37,99,235,0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div className="container text-center" style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px', color: '#ffffff', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
            About <span className="themecolor" style={{ color: '#3b82f6', textShadow: 'none' }}>Qorbit Tech</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#ffffff', maxWidth: '700px', margin: '0 auto 25px', lineHeight: 1.7, textShadow: '0 2px 10px rgba(0,0,0,0.8)', fontWeight: 500 }}>
            We are a full-service creative digital agency engineering iconic brand identities, bespoke web systems, and high-performance digital marketing campaigns worldwide.
          </p>
          <div style={{ fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#ffffff', fontWeight: 600, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            Home &nbsp;/&nbsp; <span style={{ color: '#3b82f6', textShadow: 'none' }}>About Us</span>
          </div>
        </div>
      </section>

      {/* About Main Component */}
      <About onOpenModal={() => setModalOpen(true)} />

      {/* Meet The Founders Section */}
      <MeetTheFounders onOpenModal={() => setModalOpen(true)} />

      {/* Process Workflow Section */}
      <section style={{ padding: '90px 0', background: 'linear-gradient(180deg, #080820 0%, #050510 100%)', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(56,189,248,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center headingmain" style={{ marginBottom: '60px' }}>
            <h6>How We Work</h6>
            <h2>Our Simple <span className="themecolor">4-Step Process</span></h2>
          </div>

          <div className="row">
            {[
              { num: '01', title: 'Discovery & Research', desc: 'We dissect your business goals, target audience, and market landscape to build a bulletproof creative roadmap.' },
              { num: '02', title: 'Conceptual Design', desc: 'Our elite designers produce bespoke concepts, mood boards, and prototypes tailored to your brand identity.' },
              { num: '03', title: 'Engineering & Refinement', desc: 'We build pixel-perfect digital experiences with clean code, smooth animations, and unlimited revisions.' },
              { num: '04', title: 'Launch & Growth', desc: 'Deploying your assets to live production with SEO, analytics, and ongoing dedicated account support.' },
            ].map((step, idx) => (
              <div key={idx} className="col-lg-3 col-md-6 mb-4">
                <div
                  style={{
                    background: 'rgba(13,20,50,0.6)',
                    border: '1px solid rgba(37,99,235,0.12)',
                    borderRadius: '16px',
                    padding: '35px 25px',
                    height: '100%',
                    backdropFilter: 'blur(16px)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(37,99,235,0.45)'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(37,99,235,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{
                    fontSize: '2.5rem', fontWeight: 900, marginBottom: '15px',
                    background: 'linear-gradient(135deg,#3b82f6,#7c3aed)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>
                    {step.num}
                  </div>
                  <h4 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '12px', fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>{step.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', lineHeight: '1.7' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Counter />
      <Testimonials />
      <Footer onOpenModal={() => setModalOpen(true)} />
      <PopupForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default AboutPage;
