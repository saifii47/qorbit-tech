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
          background: 'linear-gradient(135deg, rgba(8,8,8,0.95) 0%, rgba(20,20,20,0.85) 100%), url(https://www.pinnacledesignagency.com/assets/images/inner-banner/contact-bann.jpg) center/cover no-repeat',
          padding: '160px 0 100px',
          color: '#fff',
        }}
      >
        <div className="container text-center">
          <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>
            Get In <span className="themecolor">Touch</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#b0b0b0', maxWidth: '750px', margin: '0 auto 25px' }}>
            Have a project in mind or want to consult with our digital experts? We are available 24/7 to turn your ideas into reality.
          </p>
          <div style={{ fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#f2b519' }}>
            Home &nbsp;/&nbsp; <span style={{ color: '#fff' }}>Contact Us</span>
          </div>
        </div>
      </section>

      {/* Info Cards Bar */}
      <section style={{ padding: '60px 0', background: '#0e0e0e' }}>
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
                    background: '#161616',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '30px 20px',
                    textAlign: 'center',
                    height: '100%',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: '50%',
                      background: 'rgba(242, 181, 25, 0.15)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '15px',
                    }}
                  >
                    <i className={`fas ${card.icon}`} style={{ fontSize: '1.5rem', color: '#f2b519' }}></i>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '10px' }}>{card.title}</h4>
                  {card.href ? (
                    <a href={card.href} style={{ color: '#aaa', fontSize: '0.95rem', textDecoration: 'none' }}>
                      {card.text}
                    </a>
                  ) : (
                    <p style={{ color: '#aaa', fontSize: '0.95rem', margin: 0 }}>{card.text}</p>
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
      <section style={{ padding: '80px 0', background: '#090909' }}>
        <div className="container">
          <div className="text-center headingmain" style={{ marginBottom: '40px' }}>
            <h6 style={{ color: '#f2b519', textTransform: 'uppercase', letterSpacing: '2px' }}>Visit Us</h6>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800 }}>
              San Jose <span className="themecolor">Headquarters</span>
            </h2>
          </div>

          <div
            style={{
              background: '#121212',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              height: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              backgroundImage: 'radial-gradient(circle at center, rgba(242,181,25,0.1) 0%, rgba(0,0,0,0.95) 70%)',
            }}
          >
            <div style={{ padding: '30px', maxWidth: '600px' }}>
              <i className="fas fa-building" style={{ fontSize: '3rem', color: '#f2b519', marginBottom: '20px' }}></i>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '10px' }}>Qorbit Tech USA</h3>
              <p style={{ color: '#ccc', fontSize: '1.05rem', marginBottom: '20px' }}>
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

      {/* CTA Banner */}
      <CtaBanner onOpenModal={() => setModalOpen(true)} />

      <Footer onOpenModal={() => setModalOpen(true)} />
      <PopupForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default ContactPage;
