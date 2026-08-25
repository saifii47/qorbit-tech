import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import PopupForm from '../components/PopupForm';
import Contact from '../components/Contact';

const ContactPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Inner Banner */}
      <section
        className="inner-banner"
        style={{
          background: 'url(https://www.pinnacledesignagency.com/assets/images/inner-banner/contact-bann.jpg) center center / cover no-repeat',
          padding: '160px 0 100px',
          color: '#ffffff',
          borderBottom: '1px solid rgba(37,99,235,0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container text-center">
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px', color: '#ffffff', textShadow: '0 4px 20px rgba(0,0,0,0.8)', fontFamily: 'Outfit, sans-serif' }}>
            Get In <span className="themecolor" style={{ color: '#2563eb', textShadow: 'none' }}>Touch</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#ffffff', maxWidth: '750px', margin: '0 auto 25px', textShadow: '0 2px 10px rgba(0,0,0,0.8)', fontWeight: 500, fontFamily: 'Outfit, sans-serif' }}>
            Have a project in mind or want to consult with our digital experts? We are available 24/7 to turn your ideas into reality.
          </p>
          <div style={{ fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#ffffff', fontWeight: 600, textShadow: '0 2px 8px rgba(0,0,0,0.8)', fontFamily: 'Outfit, sans-serif' }}>
            Home &nbsp;/&nbsp; <span style={{ color: '#2563eb', textShadow: 'none' }}>Contact Us</span>
          </div>
        </div>
      </section>

      {/* Info Cards Bar */}
      <section style={{ padding: '60px 0', background: 'linear-gradient(180deg, #080820 0%, #050510 100%)' }}>
        <div className="container">
          <div className="row justify-content-center">
            {[
              { icon: 'fa-phone-alt', title: 'Call Toll-Free', text: '+ 1 (510) 476-9126', href: 'tel:+15104769126' },
              { icon: 'fa-envelope', title: 'Send An Email', text: 'info@qorbittech.com', href: 'mailto:info@qorbittech.com' },
              { icon: 'fa-clock', title: 'Working Hours', text: 'Mon - Fri: 9:00 AM - 7:00 PM EST (Support 24/7)' },
            ].map((card, idx) => (
              <div key={idx} className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                <div
                  style={{
                    background: 'rgba(13,20,50,0.6)',
                    border: '1px solid rgba(37,99,235,0.12)',
                    borderRadius: '16px',
                    padding: '36px 24px',
                    textAlign: 'center',
                    height: '100%',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'rgba(37, 99, 235, 0.12)',
                      border: '1px solid rgba(37, 99, 235, 0.3)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '18px',
                    }}
                  >
                    <i className={`fas ${card.icon}`} style={{ fontSize: '1.5rem', color: '#3b82f6' }}></i>
                  </div>
                  <h4 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '10px', fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>{card.title}</h4>
                  {card.href ? (
                    <a href={card.href} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', textDecoration: 'none', fontFamily: 'Outfit, sans-serif' }}>
                      {card.text}
                    </a>
                  ) : (
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', margin: 0, fontFamily: 'Outfit, sans-serif' }}>{card.text}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <Contact />

      <Footer onOpenModal={() => setModalOpen(true)} />
      <PopupForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default ContactPage;
