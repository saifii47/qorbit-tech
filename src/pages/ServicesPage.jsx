import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import PopupForm from '../components/PopupForm';
import CtaBanner from '../components/CtaBanner';
import Counter from '../components/Counter';

const servicesData = [
  {
    slug: 'logo-design',
    title: 'Logo & Brand Identity',
    banner: 'https://www.pinnacledesignagency.com/assets/images/inner-banner/about-bann.jpg',
    icon: 'fas fa-drafting-compass',
    desc: 'Memorable 2D, 3D, typography, and mascot logo designs that define your corporate identity.',
    features: ['Vector Master Files', 'Brand Guidelines Book', '3D & Animated Logos', 'Unlimited Revisions'],
  },
  {
    slug: 'web-design-development',
    title: 'Web Design & Development',
    banner: 'https://www.pinnacledesignagency.com/assets/images/inner-banner/website-bann.jpg',
    icon: 'fas fa-laptop-code',
    desc: 'High-speed, custom web apps, e-commerce storefronts, and responsive CMS solutions.',
    features: ['Custom React / Next UI', 'Shopify & WooCommerce', 'W3C Certified Code', 'SEO-Optimized Architecture'],
  },
  {
    slug: 'mobile-app',
    title: 'Mobile Application',
    banner: 'https://www.pinnacledesignagency.com/assets/images/inner-banner/mobile-bann.jpg',
    icon: 'fas fa-mobile-alt',
    desc: 'Native iOS and Android mobile app development with engaging UI/UX and seamless APIs.',
    features: ['iOS & Android Apps', 'Cross-Platform React Native', 'App Store Publishing', 'Backend API Integration'],
  },
  {
    slug: 'seo',
    title: 'Search Engine Optimization',
    banner: 'https://www.pinnacledesignagency.com/assets/images/inner-banner/seo-bann.jpg',
    icon: 'fas fa-search-dollar',
    desc: 'Data-driven technical SEO, on-page optimization, content marketing, and backlink strategies.',
    features: ['Top 10 Keyword Ranking', 'Technical SEO Audits', 'High-Authority Backlinks', 'Monthly Progress Reports'],
  },
  {
    slug: 'smm',
    title: 'Social Media Marketing',
    banner: 'https://www.pinnacledesignagency.com/assets/images/inner-banner/smm-bann.jpg',
    icon: 'fas fa-hashtag',
    desc: 'Targeted social media ad campaigns, creative posts, brand management across FB, IG & LinkedIn.',
    features: ['Social Campaign Strategy', 'Ad Spend Optimization', 'Custom Graphics & Videos', 'Audience Growth & Leads'],
  },
  {
    slug: 'printing-services',
    title: 'Print Media & Packaging',
    banner: 'https://www.pinnacledesignagency.com/assets/images/inner-banner/printing-bann.jpg',
    icon: 'fas fa-print',
    desc: 'Bespoke print collateral including luxury business cards, brochures, banners, and merchandise.',
    features: ['Print-Ready PDF Files', 'Packaging & Label Design', 'Apparel & Merchandise', 'Physical Print Delivery'],
  },
  {
    slug: 'animation',
    title: '2D / 3D Video Animation',
    banner: 'https://www.pinnacledesignagency.com/assets/images/inner-banner/animation-bann.jpg',
    icon: 'fas fa-film',
    desc: 'Captivating 2D/3D animated explainer videos, logo stings, and motion graphics commercials.',
    features: ['Professional Voiceover', 'Script & Storyboarding', 'HD 1080p / 4K Render', 'Unlimited Storyboard Edits'],
  },
  {
    slug: 'nft-services',
    title: 'NFT & Metaverse Art',
    banner: 'https://www.pinnacledesignagency.com/assets/images/inner-banner/nft-bann.jpg',
    icon: 'fas fa-cubes',
    desc: 'Exclusive 2D/3D NFT collections, 10k generator art, avatars, and Metaverse 3D environments.',
    features: ['10k NFT Generative Art', '3D Character Rigging', 'Smart Contract Readiness', 'Metaverse Asset Modeling'],
  },
];

const ServicesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Inner Banner */}
      <section
        className="inner-banner"
        style={{
          background: 'linear-gradient(135deg, rgba(8,8,8,0.95) 0%, rgba(20,20,20,0.85) 100%), url(https://www.pinnacledesignagency.com/assets/images/inner-banner/services-bann.jpg) center/cover no-repeat',
          padding: '160px 0 100px',
          color: '#fff',
        }}
      >
        <div className="container text-center">
          <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>
            Our Digital <span className="themecolor">Services</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#b0b0b0', maxWidth: '750px', margin: '0 auto 25px' }}>
            End-to-end creative digital solutions engineered to scale your revenue, brand reputation, and user engagement.
          </p>
          <div style={{ fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#f2b519' }}>
            Home &nbsp;/&nbsp; <span style={{ color: '#fff' }}>Services</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '90px 0', background: '#0a0a0a' }}>
        <div className="container">
          <div className="row">
            {servicesData.map((svc) => (
              <div key={svc.slug} className="col-lg-4 col-md-6 mb-4">
                <div
                  style={{
                    background: '#141414',
                    borderRadius: '16px',
                    padding: '35px 30px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                  }}
                  className="service-card-box"
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 12,
                      background: 'rgba(242, 181, 25, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <i className={svc.icon} style={{ fontSize: '1.8rem', color: '#f2b519' }}></i>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>{svc.title}</h3>
                  <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>{svc.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 25px 0', flexGrow: 1 }}>
                    {svc.features.map((feat, idx) => (
                      <li key={idx} style={{ color: '#d0d0d0', fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                        <i className="fas fa-check-circle" style={{ color: '#f2b519', marginRight: '10px', fontSize: '0.85rem' }}></i>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/${svc.slug}`}
                    className="btn btn-outline-gradient"
                    style={{ width: '100%', textAlign: 'center', textTransform: 'uppercase', fontSize: '0.85rem' }}
                  >
                    Explore Service <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Counter />
      <CtaBanner onOpenModal={() => setModalOpen(true)} />
      <Footer onOpenModal={() => setModalOpen(true)} />
      <PopupForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default ServicesPage;
