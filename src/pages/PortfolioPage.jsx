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
          background: 'linear-gradient(135deg, rgba(8,8,8,0.95) 0%, rgba(20,20,20,0.85) 100%), url(https://www.pinnacledesignagency.com/assets/images/inner-banner/portfolio-bann.jpg) center/cover no-repeat',
          padding: '160px 0 100px',
          color: '#fff',
        }}
      >
        <div className="container text-center">
          <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>
            Our Creative <span className="themecolor">Portfolio</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#b0b0b0', maxWidth: '750px', margin: '0 auto 25px' }}>
            Discover how we have transformed businesses globally with bespoke logo design, cutting-edge websites, 3D animations, and mobile apps.
          </p>
          <div style={{ fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#f2b519' }}>
            Home &nbsp;/&nbsp; <span style={{ color: '#fff' }}>Portfolio</span>
          </div>
        </div>
      </section>

      {/* Main Portfolio Grid */}
      <Portfolio />

      {/* Featured Case Studies */}
      <section style={{ padding: '90px 0', background: '#0a0a0a' }}>
        <div className="container">
          <div className="text-center headingmain" style={{ marginBottom: '60px' }}>
            <h6 style={{ color: '#f2b519', textTransform: 'uppercase', letterSpacing: '2px' }}>Impact &amp; Results</h6>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              Featured <span className="themecolor">Case Studies</span>
            </h2>
          </div>

          <div className="row">
            {featuredCaseStudies.map((study, idx) => (
              <div key={idx} className="col-lg-4 col-md-6 mb-4">
                <div
                  style={{
                    background: '#141414',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.08)',
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
                        background: '#f2b519',
                        color: '#000',
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
                    <div style={{ color: '#f2b519', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
                      {study.category}
                    </div>
                    <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '12px' }}>{study.title}</h3>
                    <p style={{ color: '#999', fontSize: '0.95rem', lineHeight: '1.6', flexGrow: 1 }}>{study.desc}</p>
                    <button
                      onClick={() => setModalOpen(true)}
                      style={{
                        background: 'transparent',
                        border: '1px solid #f2b519',
                        color: '#f2b519',
                        padding: '10px 20px',
                        borderRadius: '6px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginTop: '15px',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#f2b519'; e.currentTarget.style.color = '#000'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#f2b519'; }}
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

      {/* CTA Banner */}
      <CtaBanner onOpenModal={() => setModalOpen(true)} />

      <Footer onOpenModal={() => setModalOpen(true)} />
      <PopupForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default PortfolioPage;
