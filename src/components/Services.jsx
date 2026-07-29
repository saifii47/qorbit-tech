import React from 'react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../constants/assets';

const Services = () => {
  const [activeTab, setActiveTab] = React.useState('logos');

  const categories = [
    { id: 'logos', label: 'Logos', icon: 'fa-paint-brush' },
    { id: 'websites', label: 'Websites', icon: 'fa-laptop-code' },
    { id: 'animations', label: 'Animations', icon: 'fa-film' },
    { id: 'mobileapps', label: 'Mobile Apps', icon: 'fa-mobile-alt' },
    { id: 'printing', label: 'Printing', icon: 'fa-print' },
    { id: 'nftdesign', label: 'NFT Design', icon: 'fa-cube' },
    { id: 'smm', label: 'SMM', icon: 'fa-share-alt' },
  ];

  const renderContent = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          style={{
            background: 'rgba(13,20,50,0.6)',
            border: '1px solid rgba(37,99,235,0.12)',
            borderRadius: '16px',
            aspectRatio: '16/10',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(16px)',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.borderColor = 'rgba(37,99,235,0.45)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(37,99,235,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(37,99,235,0.12)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(37,99,235,0.04), rgba(124,58,237,0.04))',
          }} />
          <span style={{
            color: 'rgba(255,255,255,0.45)', fontWeight: 600, textTransform: 'capitalize',
            fontFamily: 'Poppins, sans-serif', fontSize: '14px', zIndex: 1,
          }}>
            {activeTab} {item}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section style={{ padding: '90px 0', background: 'linear-gradient(180deg, #080820 0%, #050510 100%)', position: 'relative' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="text-center headingmain" style={{ marginBottom: '56px' }}>
          <h6>What We Do</h6>
          <h2>OUR <span className="themecolor">Services</span></h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '40px', alignItems: 'flex-start' }}>
          {/* Sidebar tabs */}
          <div style={{ minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '12px 20px', borderRadius: '10px',
                  border: `1px solid ${activeTab === cat.id ? 'rgba(37,99,235,0.5)' : 'rgba(255,255,255,0.06)'}`,
                  background: activeTab === cat.id
                    ? 'linear-gradient(135deg, rgba(37,99,235,0.25), rgba(124,58,237,0.15))'
                    : 'rgba(13,20,50,0.4)',
                  color: activeTab === cat.id ? '#ffffff' : 'rgba(255,255,255,0.55)',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '14px',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.25s ease',
                  backdropFilter: 'blur(10px)',
                  boxShadow: activeTab === cat.id ? '0 4px 20px rgba(37,99,235,0.2)' : 'none',
                }}
              >
                <i className={`fas ${cat.icon}`} style={{ color: activeTab === cat.id ? '#3b82f6' : 'rgba(255,255,255,0.35)', fontSize: '15px' }} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid content */}
          <div style={{ flex: 1 }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
