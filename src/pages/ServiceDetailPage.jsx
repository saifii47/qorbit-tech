import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import PopupForm from '../components/PopupForm';
import CtaBanner from '../components/CtaBanner';
import PackageCard from '../components/shared/PackageCard';
import { pricingTabs } from '../data/packages';
import { servicesDataMap } from '../data/servicesData';
import '../components/ServiceShowcase.css';

const ServiceDetailPage = ({ serviceKey }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTabId, setActiveTabId] = useState('');
  const [activePortTabId, setActivePortTabId] = useState('');
  const [zoomedMedia, setZoomedMedia] = useState(null);
  const location = useLocation();
  const params = useParams();

  // Determine active service slug from route props or path
  const rawSlug = serviceKey || params.slug || location.pathname.replace(/^\//, '');
  const currentSlug = servicesDataMap[rawSlug] ? rawSlug : 'logo-design';
  const serviceData = servicesDataMap[currentSlug];

  // Set default active tab when service changes
  useEffect(() => {
    if (serviceData && serviceData.tabs && serviceData.tabs.length > 0) {
      setActiveTabId(serviceData.tabs[0].id);
    }
    if (
      serviceData &&
      serviceData.portfolioSection &&
      serviceData.portfolioSection.tabs &&
      serviceData.portfolioSection.tabs.length > 0
    ) {
      setActivePortTabId(serviceData.portfolioSection.tabs[0].id);
    }
  }, [currentSlug, serviceData]);

  // Find packages tab
  const packageTab = pricingTabs.find((t) => t.id === serviceData.tabId) || pricingTabs[0];
  const packages = packageTab ? packageTab.packages : [];

  // Active tab data for Section 2 (Dark Showcase)
  const currentTab = serviceData.tabs.find((t) => t.id === activeTabId) || serviceData.tabs[0];

  // Active tab data for Section 3 (White Portfolio Showcase)
  const portConfig = serviceData.portfolioSection;
  const currentPortTab =
    portConfig && portConfig.tabs
      ? portConfig.tabs.find((t) => t.id === activePortTabId) || portConfig.tabs[0]
      : null;

  return (
    <>
      <CustomCursor />
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Inner Banner - Clear Background Image without Heavy Overlay */}
      <section
        className="service-inner-banner"
        style={{
          backgroundImage: `url(${serviceData.bannerImg || 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1920&q=80'})`,
        }}
      >
        <div className="service-banner-overlay" />

        <div className="container text-center" style={{ position: 'relative', zIndex: 3 }}>
          <div className="service-banner-glass-box">
            <h1 className="service-banner-title">{serviceData.bannerTitle}</h1>
            <p className="service-banner-subtitle">{serviceData.bannerSubtitle}</p>
            <div className="service-banner-breadcrumbs">
              Home &nbsp;/&nbsp; Services &nbsp;/&nbsp; <span style={{ color: '#ffffff' }}>{serviceData.bannerTitle}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 & 2 Main Showcase Container */}
      <section className="services-sec-container">
        <div className="container">
          {/* Section 1: Overview Card */}
          <div className="sec1-header-card">
            <div className="row align-items-center">
              <div className="col-lg-5 mb-4 mb-lg-0">
                <span className="sec1-badge">
                  <i className="fas fa-layer-group mr-2"></i>
                  {serviceData.sec1Tag || 'OUR EXPERTISE'}
                </span>
                <h2 className="sec1-title">
                  {serviceData.sec1Heading.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {i === 2 ? <span className="sec1-title-highlight">{word} </span> : word + ' '}
                    </React.Fragment>
                  ))}
                </h2>
              </div>
              <div className="col-lg-7">
                <p className="sec1-desc">{serviceData.sec1Desc}</p>
              </div>
            </div>
          </div>

          {/* Section 2: Dark Theme Interactive Showcase Tabs */}
          {serviceData.tabs && serviceData.tabs.length > 0 && (
            <div className="tabs-services-wrapper">
              <div className="row">
                {/* Left Sidebar: Tabs List */}
                <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
                  <ul className="service-tabs-nav">
                    {serviceData.tabs.map((tab) => (
                      <li key={tab.id}>
                        <button
                          type="button"
                          className={`service-tab-btn ${activeTabId === tab.id ? 'active' : ''}`}
                          onClick={() => setActiveTabId(tab.id)}
                        >
                          <span>{tab.title}</span>
                          <i className="fas fa-chevron-right active-indicator"></i>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Side: Tab Panel Content & Showcase */}
                <div className="col-lg-9 col-md-8">
                  {currentTab && (
                    <div className="row">
                      {/* Category Description & CTA */}
                      <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="tab-content-panel">
                          <div>
                            <h3
                              style={{
                                color: '#ffffff',
                                fontSize: '1.5rem',
                                fontWeight: 800,
                                marginBottom: '15px',
                                textTransform: 'uppercase',
                                borderBottom: '1px solid rgba(37,99,235,0.2)',
                                paddingBottom: '10px',
                              }}
                            >
                              {currentTab.title}
                            </h3>
                            <p className="tab-detail-text">{currentTab.description}</p>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="btn-cta-starter"
                              onClick={() => setModalOpen(true)}
                            >
                              Let’s Get Started <i className="fas fa-arrow-right ml-2"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Showcase Image / Grid */}
                      <div className="col-lg-6">
                        {currentTab.images && currentTab.images.length > 1 ? (
                          <div className="showcase-grid-wrapper">
                            {currentTab.images.map((imgUrl, idx) => (
                              <div
                                key={idx}
                                className="showcase-item-card"
                                onClick={() => setZoomedMedia(imgUrl)}
                                style={{ cursor: 'pointer' }}
                              >
                                <img src={imgUrl} alt={`${currentTab.title} ${idx + 1}`} loading="lazy" />
                                <div className="showcase-item-overlay">
                                  <span className="showcase-zoom-badge">
                                    <i className="fas fa-search-plus"></i> View Artwork
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : currentTab.images && currentTab.images.length === 1 ? (
                          <div
                            className="showcase-single-card"
                            onClick={() => setZoomedMedia(currentTab.images[0])}
                            style={{ cursor: 'pointer' }}
                          >
                            <img src={currentTab.images[0]} alt={currentTab.title} loading="lazy" />
                            <div className="showcase-item-overlay">
                              <span className="showcase-zoom-badge">
                                <i className="fas fa-search-plus"></i> Enlarge Showcase
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="tab-content-panel text-center d-flex align-items-center justify-content-center"
                            style={{ minHeight: '280px' }}
                          >
                            <div>
                              <i className="fas fa-layer-group text-primary" style={{ fontSize: '3rem', marginBottom: '15px' }}></i>
                              <h5 className="text-white">Custom {currentTab.title} Showcase</h5>
                              <p className="text-muted small">Contact us to view full portfolio work</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2nd Showcase Section: Pure White Theme Portfolio with Animated Floating Graffiti & Particles */}
      {portConfig && portConfig.tabs && portConfig.tabs.length > 0 && (
        <section className="white-portfolio-sec">
          {/* Animated Background Graffiti Watermark */}
          <div className="graffiti-watermark-text">
            {portConfig.graffitiText || 'CREATIVE DESIGN'}
          </div>

          {/* Animated Background Blur Shapes */}
          <div className="floating-graffiti-shape shape-1" />
          <div className="floating-graffiti-shape shape-2" />

          {/* Animated Floating Tech Icons */}
          <div className="floating-icon-accent icon-accent-1">
            <i className="fas fa-compass" />
          </div>
          <div className="floating-icon-accent icon-accent-2">
            <i className="fas fa-[#2563eb] fa-vector-square" />
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="white-portfolio-header">
              <h6>{portConfig.subTitle || 'Have A Look At'}</h6>
              <h2>
                OUR <span className="themecolor">PORTFOLIO</span>
              </h2>
            </div>

            <div className="row">
              {/* Left Column: Filter Category Tabs */}
              <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
                <ul className="white-tabs-nav">
                  {portConfig.tabs.map((ptab) => (
                    <li key={ptab.id}>
                      <button
                        type="button"
                        className={`white-tab-item ${activePortTabId === ptab.id ? 'active' : ''}`}
                        onClick={() => setActivePortTabId(ptab.id)}
                      >
                        <span className="tab-line" />
                        {ptab.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: White Portfolio Grid Gallery */}
              <div className="col-lg-9 col-md-8">
                {currentPortTab && currentPortTab.images && currentPortTab.images.length > 0 ? (
                  <div className="white-gallery-grid">
                    {currentPortTab.images.map((mediaUrl, idx) => (
                      <div
                        key={idx}
                        className="white-gallery-card"
                        onClick={() => setZoomedMedia(mediaUrl)}
                      >
                        {mediaUrl.endsWith('.mp4') ? (
                          <video src={mediaUrl} autoPlay loop muted playsInline />
                        ) : (
                          <img src={mediaUrl} alt={`${currentPortTab.title} ${idx + 1}`} loading="lazy" />
                        )}
                        <div className="white-gallery-overlay">
                          <div className="white-zoom-icon">
                            <i className="fas fa-search-plus" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-5 text-muted">
                    <i className="fas fa-images fa-3x mb-3 text-primary"></i>
                    <h5>Selected Portfolio Gallery Coming Soon</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Packages for this Service */}
      <section style={{ padding: '90px 0', background: 'linear-gradient(180deg, #080820 0%, #050510 100%)' }}>
        <div className="container">
          <div className="text-center headingmain" style={{ marginBottom: '50px' }}>
            <h6 style={{ color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>
              Value Investment
            </h6>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase' }}>
              {serviceData.bannerTitle} <span className="themecolor" style={{ color: '#2563eb' }}>Packages</span>
            </h2>
          </div>

          <div className="row">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} onOpenModal={() => setModalOpen(true)} isGrid={true} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CtaBanner onOpenModal={() => setModalOpen(true)} />

      {/* Footer */}
      <Footer onOpenModal={() => setModalOpen(true)} />

      {/* Popup Form Modal */}
      <PopupForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Image / Video Zoom Modal */}
      {zoomedMedia && (
        <div className="image-zoom-modal-backdrop" onClick={() => setZoomedMedia(null)}>
          <div className="image-zoom-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-zoom-close-btn" onClick={() => setZoomedMedia(null)}>
              <i className="fas fa-times"></i>
            </button>
            {zoomedMedia.endsWith('.mp4') ? (
              <video src={zoomedMedia} controls autoPlay loop style={{ width: '100%', maxHeight: '85vh' }} />
            ) : (
              <img src={zoomedMedia} alt="Showcase artwork zoomed" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceDetailPage;
