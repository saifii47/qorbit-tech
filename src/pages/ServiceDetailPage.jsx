import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import PopupForm from '../components/PopupForm';
import CtaBanner from '../components/CtaBanner';
import PackageCard from '../components/shared/PackageCard';
import { pricingTabs } from '../data/packages';

const serviceDetailsConfig = {
  'logo-design': {
    title: 'Logo Design & Brand Identity',
    subtitle: 'Custom logos that capture the soul of your business and compel customer trust.',
    bannerImg: 'https://www.pinnacledesignagency.com/assets/images/inner-banner/about-bann.jpg',
    tabId: 'box-logo',
    features: [
      'Original vector design concepts tailored to your niche',
      'Full suite of formats (AI, PSD, SVG, EPS, PNG, PDF)',
      'Brand guideline manual including typography & color palette',
      '100% full copyright & ownership rights transferred',
    ],
    whyUs: 'A great logo isn\'t just art—it\'s your company\'s handshake. Our designers fuse brand psychology with modern aesthetic principles to craft unforgettable logos.',
  },
  'web-design-development': {
    title: 'Web Design & Development',
    subtitle: 'High-speed, responsive, conversion-focused websites engineered for business growth.',
    bannerImg: 'https://www.pinnacledesignagency.com/assets/images/inner-banner/website-bann.jpg',
    tabId: 'box-web',
    features: [
      'Bespoke UX/UI interface design with zero boilerplate templates',
      'Mobile-first responsive engineering optimized for all screen sizes',
      'SEO-friendly, fast page loading speeds and clean W3C standards',
      'Content Management System (CMS) integration for effortless updates',
    ],
    whyUs: 'We don\'t just build websites; we construct digital sales engines. From high-converting landing pages to complex enterprise web portals.',
  },
  'mobile-app': {
    title: 'Mobile Application Development',
    subtitle: 'Feature-packed native iOS and Android apps with fluid UI animation and robust backends.',
    bannerImg: 'https://www.pinnacledesignagency.com/assets/images/inner-banner/mobile-bann.jpg',
    tabId: 'box-web',
    features: [
      'iOS & Android native application engineering',
      'React Native cross-platform performance optimization',
      'Intuitive touch UX design with micro-interactions',
      'End-to-end App Store and Google Play deployment',
    ],
    whyUs: 'Turn your app vision into an App Store success story. Our mobile architects design silky-smooth mobile experiences that users love.',
  },
  'seo': {
    title: 'Search Engine Optimization (SEO)',
    subtitle: 'Dominate Google search results and drive high-intent organic traffic to your business.',
    bannerImg: 'https://www.pinnacledesignagency.com/assets/images/inner-banner/seo-bann.jpg',
    tabId: 'box-seo',
    features: [
      'In-depth technical SEO audits and on-page optimization',
      'High-converting keyword research and strategic mapping',
      'Authority backlink acquisition and digital PR campaigns',
      'Transparent monthly analytics and keyword position tracking',
    ],
    whyUs: 'Rank higher, outpace your competitors, and capture active customers searching for your products right now.',
  },
  'smm': {
    title: 'Social Media Marketing (SMM)',
    subtitle: 'Amplify your brand presence across Facebook, Instagram, LinkedIn, and TikTok.',
    bannerImg: 'https://www.pinnacledesignagency.com/assets/images/inner-banner/smm-bann.jpg',
    tabId: 'box-smm',
    features: [
      'Data-backed social media ad campaign strategy',
      'Custom post graphics, reels, and video ad creatives',
      'Audience demographic targeting and retargeting funnels',
      'Monthly engagement and ROI conversion reporting',
    ],
    whyUs: 'We turn casual scrollers into loyal customers with thumb-stopping social content and high-ROI ad funnels.',
  },
  'printing-services': {
    title: 'Printing & Packaging Design',
    subtitle: 'Tangible, high-grade print collateral that commands attention at every touchpoint.',
    bannerImg: 'https://www.pinnacledesignagency.com/assets/images/inner-banner/printing-bann.jpg',
    tabId: 'box-print',
    features: [
      'Luxury business cards, letterheads, and corporate stationery',
      'Tri-fold brochures, sales flyers, and event banners',
      'Product box packaging, labels, and apparel merchandise',
      'High-resolution print-ready files delivered with print specs',
    ],
    whyUs: 'In a digital world, premium physical print assets make an indelible impression on high-value clients.',
  },
  'animation': {
    title: '2D & 3D Video Animation',
    subtitle: 'Tell your story with breathtaking 2D/3D animated explainer videos and commercial reels.',
    bannerImg: 'https://www.pinnacledesignagency.com/assets/images/inner-banner/animation-bann.jpg',
    tabId: 'box-animation',
    features: [
      'Professional scriptwriting and storyboard development',
      'Native voiceover recording in multiple accents',
      'Cinematic 2D/3D motion graphics rendering in Full HD/4K',
      'Custom sound design and background music mastering',
    ],
    whyUs: 'Video is the most powerful medium on the web. We craft compelling animations that boost user engagement and sales conversions.',
  },
  'nft-services': {
    title: 'NFT Design & Metaverse Art',
    subtitle: '3D generative art, character models, and digital collectibles ready for Web3.',
    bannerImg: 'https://www.pinnacledesignagency.com/assets/images/inner-banner/nft-bann.jpg',
    tabId: 'box-logo',
    features: [
      '10k NFT collection trait generation & metadata coding',
      'High-detail 3D avatars, characters, and metaverse assets',
      'Solana & Ethereum smart contract ready deliverables',
      'Full promotional banner artwork and Discord graphics',
    ],
    whyUs: 'We empower Web3 creators with cutting-edge 2D and 3D digital artwork that dominates digital marketplaces.',
  },
};

const ServiceDetailPage = ({ serviceKey }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const params = useParams();

  // Determine active service slug from route props or path
  const currentSlug = serviceKey || params.slug || location.pathname.replace(/^\//, '');
  const config = serviceDetailsConfig[currentSlug] || serviceDetailsConfig['logo-design'];

  const packageTab = pricingTabs.find((t) => t.id === config.tabId) || pricingTabs[0];
  const packages = packageTab.packages;

  return (
    <>
      <CustomCursor />
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Inner Hero Banner */}
      <section
        className="inner-banner"
        style={{
          background: `linear-gradient(135deg, rgba(8,8,8,0.95) 0%, rgba(20,20,20,0.85) 100%), url(${config.bannerImg}) center/cover no-repeat`,
          padding: '160px 0 100px',
          color: '#fff',
        }}
      >
        <div className="container text-center">
          <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>
            {config.title}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#b0b0b0', maxWidth: '750px', margin: '0 auto 25px' }}>
            {config.subtitle}
          </p>
          <div style={{ fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#f2b519' }}>
            Home &nbsp;/&nbsp; Services &nbsp;/&nbsp; <span style={{ color: '#fff' }}>{config.title}</span>
          </div>
        </div>
      </section>

      {/* Overview & Key Highlights */}
      <section style={{ padding: '90px 0', background: '#0a0a0a' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h6 style={{ color: '#f2b519', textTransform: 'uppercase', letterSpacing: '2px' }}>Why Choose Qorbit Tech</h6>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '20px', color: '#fff' }}>
                Excellence in <span className="themecolor">{config.title}</span>
              </h2>
              <p style={{ color: '#aaa', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
                {config.whyUs}
              </p>

              <div style={{ background: '#141414', borderRadius: '12px', padding: '25px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '15px' }}>Key Service Features:</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {config.features.map((feat, idx) => (
                    <li key={idx} style={{ color: '#d0d0d0', marginBottom: '10px', fontSize: '0.95rem', display: 'flex', alignItems: 'center' }}>
                      <i className="fas fa-check-circle" style={{ color: '#f2b519', marginRight: '12px', fontSize: '1rem' }}></i>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '30px' }}>
                <button
                  className="btn btn-outline-gradient mr-3"
                  onClick={() => setModalOpen(true)}
                  style={{ textTransform: 'uppercase' }}
                >
                  Get A Free Quote <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>

            <div className="col-lg-6">
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(242, 181, 25, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.8)' }}>
                <img
                  src={config.bannerImg}
                  alt={config.title}
                  style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages for this Service */}
      <section style={{ padding: '80px 0', background: '#0e0e0e' }}>
        <div className="container">
          <div className="text-center headingmain" style={{ marginBottom: '50px' }}>
            <h6 style={{ color: '#f2b519', textTransform: 'uppercase', letterSpacing: '2px' }}>Value Investment</h6>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              {config.title} <span className="themecolor">Packages</span>
            </h2>
          </div>

          <div className="row">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} onOpenModal={() => setModalOpen(true)} isGrid={true} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner onOpenModal={() => setModalOpen(true)} />
      <Footer onOpenModal={() => setModalOpen(true)} />
      <PopupForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default ServiceDetailPage;
