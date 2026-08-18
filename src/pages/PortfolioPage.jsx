import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import PopupForm from '../components/PopupForm';
import Portfolio from '../components/Portfolio';
import CtaBanner from '../components/CtaBanner';

const featuredCaseStudies = [
  {
    title: 'Apex Financial Technologies',
    category: 'Fintech Web & Branding',
    result: '+320% Lead Conversion',
    img: 'https://www.pinnacledesignagency.com/assets/images/portfolio/web-app/img3.png',
    desc: 'Complete brand repositioning, UI/UX redesign, and high-performance Web app development for an enterprise Fintech startup.',
  },
  {
    title: 'Verve Luxury Apparel',
    category: 'E-Commerce & Digital Ads',
    result: '$1.4M Sales in 90 Days',
    img: 'https://www.pinnacledesignagency.com/assets/images/portfolio/ecommerce/img1.jpg',
    desc: 'High-converting Shopify Plus storefront combined with targeted social media ad campaigns and influencer marketing.',
  },
  {
    title: 'Aero Dynamics Motion Reel',
    category: '3D Animation & VFX',
    result: '2.5M Views & Award Winner',
    img: 'https://www.pinnacledesignagency.com/assets/images/portfolio/3d-model/img2.png',
    desc: 'A cinematic 3D product animation showcase engineered for product launch events and global advertising.',
  },
];

const PortfolioPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Inner Banner */}
      <section
        className="inner-banner"
        style={{
          background: 'url(https://www.pinnacledesignagency.com/assets/images/inner-banner/portfolio-bann.jpg) center center / cover no-repeat',
          padding: '160px 0 100px',
          color: '#ffffff',
          borderBottom: '1px solid rgba(37,99,235,0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container text-center">
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px', color: '#ffffff', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
            Our Creative <span className="themecolor" style={{ color: '#2563eb', textShadow: 'none' }}>Portfolio</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#ffffff', maxWidth: '750px', margin: '0 auto 25px', textShadow: '0 2px 10px rgba(0,0,0,0.8)', fontWeight: 500 }}>
            Discover how we have transformed businesses globally with bespoke logo design, cutting-edge websites, 3D animations, and mobile apps.
          </p>
          <div style={{ fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#ffffff', fontWeight: 600, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            Home &nbsp;/&nbsp; <span style={{ color: '#2563eb', textShadow: 'none' }}>Portfolio</span>
          </div>
        </div>
      </section>

      {/* Main Portfolio Grid */}
      <Portfolio />

      {/* Featured Case Studies */}
      <section style={{ padding: '90px 0', background: 'linear-gradient(180deg, #080820 0%, #050510 100%)' }}>
        <div className="container">
          <div className="text-center headingmain" style={{ marginBottom: '60px' }}>
            <h6 style={{ color: '#2563eb', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Impact &amp; Results</h6>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff' }}>
              Featured <span className="themecolor" style={{ color: '#2563eb' }}>Case Studies</span>
            </h2>
          </div>

          <div className="row">
            {featuredCaseStudies.map((study, idx) => (
              <div key={idx} className="col-lg-4 col-md-6 mb-4">
                <div
                  style={{
                    background: 'rgba(13,20,50,0.6)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid rgba(37,99,235,0.12)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img
                      src={study.img}
                      alt={study.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: 15,
                        right: 15,
                        background: '#2563eb',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        padding: '6px 12px',
                        borderRadius: '20px',
                      }}
                    >
                      {study.result}
                    </span>
                  </div>
                  <div style={{ padding: '25px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ color: '#2563eb', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
                      {study.category}
                    </div>
                    <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '12px' }}>{study.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', lineHeight: '1.6', flexGrow: 1 }}>{study.desc}</p>
                    <button
                      onClick={() => setModalOpen(true)}
                      style={{
                        background: 'transparent',
                        border: '1px solid #2563eb',
                        color: '#2563eb',
                        padding: '10px 20px',
                        borderRadius: '6px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginTop: '15px',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.color = '#ffffff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2563eb'; }}
                    >
                      Request Similar Project
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer onOpenModal={() => setModalOpen(true)} />
      <PopupForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default PortfolioPage;
