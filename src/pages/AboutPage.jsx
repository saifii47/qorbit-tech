import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import PopupForm from '../components/PopupForm';
import Counter from '../components/Counter';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import CtaBanner from '../components/CtaBanner';

const AboutPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Inner Banner */}
      <section
        className="inner-banner"
        style={{
          background: 'linear-gradient(135deg, rgba(8,8,8,0.95) 0%, rgba(20,20,20,0.85) 100%), url(https://www.pinnacledesignagency.com/assets/images/inner-banner/about-bann.jpg) center/cover no-repeat',
          padding: '160px 0 100px',
          color: '#fff',
        }}
      >
        <div className="container text-center">
          <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>
            About <span className="themecolor">Qorbit Tech</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#b0b0b0', maxWidth: '750px', margin: '0 auto 25px' }}>
            We are a full-service creative digital agency engineering iconic brand identities, bespoke web systems, and high-performance digital marketing campaigns worldwide.
          </p>
          <div style={{ fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#f2b519' }}>
            Home &nbsp;/&nbsp; <span style={{ color: '#fff' }}>About Us</span>
          </div>
        </div>
      </section>

      {/* About Main Component */}
      <About onOpenModal={() => setModalOpen(true)} />

      {/* Process Workflow Section */}
      <section style={{ padding: '90px 0', background: '#0e0e0e' }}>
        <div className="container">
          <div className="text-center headingmain" style={{ marginBottom: '60px' }}>
            <h6 style={{ color: '#f2b519', textTransform: 'uppercase', letterSpacing: '2px' }}>How We Work</h6>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              Our Simple <span className="themecolor">4-Step Process</span>
            </h2>
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
                    background: '#161616',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '35px 25px',
                    height: '100%',
                    transition: 'all 0.3s ease',
                  }}
                  className="step-card"
                >
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f2b519', marginBottom: '15px' }}>
                    {step.num}
                  </div>
                  <h4 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '12px' }}>{step.title}</h4>
                  <p style={{ color: '#999', fontSize: '0.95rem', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counter Statistics */}
      <Counter />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Banner */}
      <CtaBanner onOpenModal={() => setModalOpen(true)} />

      <Footer onOpenModal={() => setModalOpen(true)} />
      <PopupForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default AboutPage;
