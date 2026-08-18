import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import PopupForm from '../components/PopupForm';
import Contact from '../components/Contact';
import CtaBanner from '../components/CtaBanner';

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
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px', color: '#ffffff', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
            Get In <span className="themecolor" style={{ color: '#2563eb', textShadow: 'none' }}>Touch</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#ffffff', maxWidth: '750px', margin: '0 auto 25px', textShadow: '0 2px 10px rgba(0,0,0,0.8)', fontWeight: 500 }}>
            Have a project in mind or want to consult with our digital experts? We are available 24/7 to turn your ideas into reality.
          </p>
          <div style={{ fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#ffffff', fontWeight: 600, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            Home &nbsp;/&nbsp; <span style={{ color: '#2563eb', textShadow: 'none' }}>Contact Us</span>
          </div>
        </div>
      </section>

      {/* Info Cards Bar */}
      <section style={{ padding: '60px 0', background: 'linear-gradient(180deg, #080820 0%, #050510 100%)' }}>
        <div className="container">
          <div className="row">
            {[
              { icon: 'fa-map-marker-alt', title: 'Office Location', text: '123 E San Carlos St San Jose, CA 95112, USA' },
              { icon: 'fa-phone-alt', title: 'Call Toll-Free', text: '+ 1 (510) 476-9126', href: 'tel:+15104769126' },
              { icon: 'fa-envelope', title: 'Send An Email', text: 'info@qorbit.tech', href: 'mailto:info@qorbit.tech' },
              { icon: 'fa-clock', title: 'Working Hours', text: 'Mon - Fri: 9:00 AM - 7:00 PM EST (Support 24/7)' },
            ].map((card, idx) => (
              <div key={idx} className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                <div
                  style={{
                    background: 'rgba(13,20,50,0.6)',
                    border: '1px solid rgba(37,99,235,0.12)',
                    borderRadius: '12px',
                    padding: '30px 20px',
                    textAlign: 'center',
                    height: '100%',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: '50%',
                      background: 'rgba(80, 11, 40, 0.08)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '15px',
                    }}
                  >
                    <i className={`fas ${card.icon}`} style={{ fontSize: '1.5rem', color: '#2563eb' }}></i>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '10px' }}>{card.title}</h4>
                  {card.href ? (
                    <a href={card.href} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', textDecoration: 'none' }}>
                      {card.text}
                    </a>
                  ) : (
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', margin: 0 }}>{card.text}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <Contact />

      {/* Office Location Map Mockup Section */}
      <section style={{ padding: '80px 0', background: 'rgba(13,20,50,0.6)' }}>
        <div className="container">
          <div className="text-center headingmain" style={{ marginBottom: '40px' }}>
            <h6 style={{ color: '#2563eb', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Visit Us</h6>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff' }}>
              San Jose <span className="themecolor" style={{ color: '#2563eb' }}>Headquarters</span>
            </h2>
          </div>

          <div
            style={{
              background: 'linear-gradient(180deg, #080820 0%, #050510 100%)',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(37,99,235,0.12)',
              position: 'relative',
              height: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              backgroundImage: 'radial-gradient(circle at center, rgba(80,11,40,0.05) 0%, rgba(248,250,252,0.95) 70%)',
            }}
          >
            <div style={{ padding: '30px', maxWidth: '600px' }}>
              <i className="fas fa-building" style={{ fontSize: '3rem', color: '#2563eb', marginBottom: '20px' }}></i>
              <h3 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '10px' }}>Qorbit Tech USA</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', marginBottom: '20px' }}>
                123 E San Carlos St, San Jose, CA 95112, United States
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-gradient"
                style={{ textTransform: 'uppercase' }}
              >
                Get Directions on Map <i className="fas fa-directions ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer onOpenModal={() => setModalOpen(true)} />
      <PopupForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default ContactPage;
