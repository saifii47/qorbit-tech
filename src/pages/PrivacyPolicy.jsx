import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import PopupForm from '../components/PopupForm';

const PrivacyPolicy = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Inner Banner */}
      <section
        className="inner-banner"
        style={{
          background: 'linear-gradient(135deg, rgba(8,8,8,0.95) 0%, rgba(20,20,20,0.85) 100%)',
          padding: '160px 0 80px',
          color: '#fff',
        }}
      >
        <div className="container text-center">
          <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>
            Privacy <span className="themecolor">Policy</span>
          </h1>
          <div style={{ fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#f2b519' }}>
            Home &nbsp;/&nbsp; Legal &nbsp;/&nbsp; <span style={{ color: '#fff' }}>Privacy Policy</span>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#0a0a0a', color: '#ccc', lineHeight: '1.8' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ background: '#121212', padding: '40px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '20px' }}>Qorbit Tech Privacy Policy</h2>
            <p style={{ marginBottom: '20px' }}>
              Effective Date: January 1, {new Date().getFullYear()}
            </p>
            <p>
              At <strong>Qorbit Tech</strong>, accessible from https://qorbit.tech, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Qorbit Tech and how we use it.
            </p>

            <h3 style={{ color: '#f2b519', fontSize: '1.3rem', marginTop: '30px', marginBottom: '15px' }}>1. Information We Collect</h3>
            <p>
              When you submit an inquiry, request a quote, or sign up for services on our website, we may collect personal information including your name, email address, phone number, company name, and project specifications.
            </p>

            <h3 style={{ color: '#f2b519', fontSize: '1.3rem', marginTop: '30px', marginBottom: '15px' }}>2. How We Use Your Information</h3>
            <p>We use the collected information to:</p>
            <ul style={{ paddingLeft: '20px' }}>
              <li>Provide, operate, and maintain our design &amp; digital marketing services</li>
              <li>Improve, personalize, and expand our website offerings</li>
              <li>Understand and analyze how you use our website</li>
              <li>Communicate with you regarding project updates, quotes, and support</li>
              <li>Send email newsletters and promotional updates (with opt-out capability)</li>
            </ul>

            <h3 style={{ color: '#f2b519', fontSize: '1.3rem', marginTop: '30px', marginBottom: '15px' }}>3. Data Security &amp; Copyright Ownership</h3>
            <p>
              We implement industry-standard encryption protocols (SSL/TLS) and secure database storage to safeguard your data. Furthermore, upon full payment for design deliverables, all proprietary brand assets, source files, and intellectual property belong exclusively to the client.
            </p>

            <h3 style={{ color: '#f2b519', fontSize: '1.3rem', marginTop: '30px', marginBottom: '15px' }}>4. Third-Party Services</h3>
            <p>
              Qorbit Tech does not sell, trade, or transfer your personally identifiable information to outside third parties without prior consent, except as required to fulfill services or comply with law.
            </p>

            <h3 style={{ color: '#f2b519', fontSize: '1.3rem', marginTop: '30px', marginBottom: '15px' }}>5. Contact Us</h3>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at: <a href="mailto:info@qorbit.tech" style={{ color: '#f2b519' }}>info@qorbit.tech</a> or call <a href="tel:+15104769126" style={{ color: '#f2b519' }}>+1 (510) 476-9126</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer onOpenModal={() => setModalOpen(true)} />
      <PopupForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default PrivacyPolicy;
