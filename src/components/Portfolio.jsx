import React, { useState } from 'react';

const CDN = 'https://www.pinnacledesignagency.com/assets/images/portfolio';

const tabs = [
  { target: 'box-logo', label: 'Logos' },
  { target: 'box-website', label: 'WEBSITES' },
  { target: 'box-animations', label: 'ANIMATIONS' },
  { target: 'box-mobileapp', label: 'MOBILE APPS' },
  { target: 'box-printing', label: 'PRINTING' },
  { target: 'box-nftdesign', label: 'NFT Design' },
  { target: 'box-smm', label: 'SMM' },
];

const boxes = {
  'box-logo': [
    { type: 'img', src: `${CDN}/logo/logo1.jpg`, title: 'Brand Identity Logo' },
    { type: 'img', src: `${CDN}/3d-logo/port1.jpg`, title: '3D Emblem Design' },
    { type: 'img', src: `${CDN}/typography/port4.jpg`, title: 'Typography Logo' },
    { type: 'img', src: `${CDN}/animated-logo/port2.gif`, title: 'Animated Motion Logo' },
    { type: 'img', src: `${CDN}/illustrated-logo/port3.jpg`, title: 'Illustrated Mascot' },
  ],
  'box-website': [
    { type: 'img', src: `${CDN}/ecommerce/img1.jpg`, title: 'E-Commerce Platform' },
    { type: 'img', src: `${CDN}/b2b/img2.png`, title: 'B2B Corporate Portal' },
    { type: 'img', src: `${CDN}/web-app/img3.png`, title: 'Custom Web Application' },
    { type: 'img', src: `${CDN}/cms/img4.png`, title: 'WordPress / CMS Solution' },
    { type: 'img', src: `${CDN}/responsive/img5.png`, title: 'Responsive UI Web Design' },
  ],
  'box-animations': [
    { type: 'video', src: `${CDN}/2danim/01.mp4`, title: '2D Animation Showcase' },
    { type: 'video', src: `${CDN}/3danim/03.mp4`, height: 457, title: '3D Character Reel' },
    { type: 'video', src: `${CDN}/explainer/05.mp4`, title: 'Explainer Video Production' },
    { type: 'video', src: `${CDN}/motionvideo/01.mp4`, title: 'Motion Graphics Advert' },
    { type: 'video', src: `${CDN}/whiteboardanim/05.mp4`, title: 'Whiteboard Presentation' },
  ],
  'box-mobileapp': [
    { type: 'img', src: `${CDN}/ios/img1.jpg`, title: 'iOS Native App' },
    { type: 'img', src: `${CDN}/android/img2.png`, title: 'Android Ecosystem App' },
    { type: 'img', src: `${CDN}/cross/img3.png`, title: 'Flutter Cross-Platform' },
    { type: 'img', src: `${CDN}/webapps/img4.png`, title: 'Progressive Web App' },
    { type: 'img', src: `${CDN}/socialapp/img5.png`, title: 'Social Platform UI' },
  ],
  'box-printing': [
    { type: 'img', src: `${CDN}/business-cards/img1.jpg`, title: 'Premium Business Cards' },
    { type: 'img', src: `${CDN}/merchandise/img2.png`, title: 'Corporate Merchandise' },
    { type: 'img', src: `${CDN}/brouchers/img3.png`, title: 'Multi-fold Brochure' },
    { type: 'img', src: `${CDN}/banners/img4.png`, title: 'Outdoor Exhibition Banner' },
    { type: 'img', src: `${CDN}/stationery/img5.png`, title: 'Complete Brand Stationery' },
  ],
  'box-nftdesign': [
    { type: 'img', src: `${CDN}/2d-art/img1.jpg`, title: '2D NFT Collection' },
    { type: 'img', src: `${CDN}/3d-model/img2.png`, title: '3D Rendered Avatar' },
    { type: 'img', src: `${CDN}/environment/img3.png`, title: 'Metaverse Environment' },
    { type: 'img', src: `${CDN}/avatar/img4.png`, title: 'PFP Character Art' },
    { type: 'img', src: `${CDN}/3d-model/img5.png`, title: '3D Digital Collectible' },
  ],
  'box-smm': [
    { type: 'img', src: `${CDN}/content-creation/img1.jpg`, title: 'Social Content Strategy' },
    { type: 'img', src: `${CDN}/strategy/img2.png`, title: 'Ad Campaign Creative' },
    { type: 'img', src: `${CDN}/brandmonitor/img3.jpg`, title: 'Brand Identity Banner' },
    { type: 'img', src: `${CDN}/analytics/img1.jpg`, title: 'Instagram Feed Theme' },
    { type: 'img', src: `${CDN}/paidmarket/img1.jpg`, title: 'Performance Ad Design' },
  ],
};

const Portfolio = () => {
  const [active, setActive] = useState('box-logo');
  const [lightboxItem, setLightboxItem] = useState(null);

  return (
    <section className="portfolio_main" data-aos="fade-up" data-aos-duration="1500" style={{ position: 'relative' }}>
      {/* Giant Transparent Outlined QORBIT Watermark */}
      <div
        style={{
          position: 'absolute',
          top: '25px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 'clamp(90px, 16vw, 200px)',
          fontWeight: 900,
          letterSpacing: '10px',
          color: 'transparent',
          WebkitTextStroke: '2px rgba(37, 99, 235, 0.08)',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          lineHeight: 0.85,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        QORBIT
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="text-center headingmain">
          <h6>What We Do</h6>
          <h2>OUR <span className="themecolor">Portfolio</span></h2>
        </div>
        <div className="filterport">
          <div className="row">
            <div className="col-md-4">
              <ul>
                {tabs.map((tab) => (
                  <li
                    key={tab.target}
                    data-targetit={tab.target}
                    className={active === tab.target ? 'active' : ''}
                    onClick={() => setActive(tab.target)}
                  >
                    <a href="#" onClick={(e) => e.preventDefault()} title="">
                      {tab.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-8">
              {Object.entries(boxes).map(([boxId, items]) => (
                <div
                  key={boxId}
                  className={`${boxId}${active === boxId ? ' showfirst' : ''} porfolio-dv`}
                >
                  {items.map((item, i) => (
                    <div
                      className="items"
                      key={i}
                      data-cursor-label="PREVIEW"
                      onClick={() => setLightboxItem(item)}
                      style={{ cursor: 'pointer', position: 'relative' }}
                    >
                      {item.type === 'img' ? (
                        <img src={item.src} alt={item.title || 'Portfolio item'} loading="lazy" />
                      ) : (
                        <video width="360" height={item.height || 213} controls className="videoplay">
                          <source src={item.src} type="video/mp4" />
                        </video>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="modal fade show"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(5, 5, 16, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 999999,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            padding: 20,
          }}
          onClick={() => setLightboxItem(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(37,99,235,0.2)',
              background: 'rgba(13,20,50,0.95)',
              backdropFilter: 'blur(20px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxItem(null)}
              style={{
                position: 'absolute',
                top: 15,
                right: 20,
                color: '#ffffff',
                fontSize: 28,
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: 40,
                height: 40,
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,99,235,0.4)'; e.currentTarget.style.borderColor = 'rgba(37,99,235,0.6)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            >
              &times;
            </button>
            {lightboxItem.type === 'img' ? (
              <img
                src={lightboxItem.src}
                alt={lightboxItem.title}
                style={{ maxWidth: '85vw', maxHeight: '80vh', objectFit: 'contain', display: 'block' }}
              />
            ) : (
              <video
                controls
                autoPlay
                style={{ maxWidth: '85vw', maxHeight: '80vh', display: 'block' }}
              >
                <source src={lightboxItem.src} type="video/mp4" />
              </video>
            )}
            <div style={{ padding: '15px 20px', background: 'rgba(37,99,235,0.1)', color: '#ffffff', borderTop: '1px solid rgba(37,99,235,0.2)', textAlign: 'center', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
              {lightboxItem.title}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
