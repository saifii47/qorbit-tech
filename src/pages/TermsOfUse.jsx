import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import PopupForm from '../components/PopupForm';

const TermsOfUse = () => {
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
            Terms Of <span className="themecolor">Use</span>
          </h1>
          <div style={{ fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#f2b519' }}>
            Home &nbsp;/&nbsp; Legal &nbsp;/&nbsp; <span style={{ color: '#fff' }}>Terms Of Use</span>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#0a0a0a', color: '#ccc', lineHeight: '1.8' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ background: '#121212', padding: '40px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '20px' }}>Terms &amp; Conditions of Service</h2>
            <p style={{ marginBottom: '20px' }}>
              Effective Date: January 1, {new Date().getFullYear()}
            </p>
            <p>
              Welcome to <strong>Qorbit Tech</strong>. By accessing our website, purchasing design packages, or contracting our digital services, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <h3 style={{ color: '#f2b519', fontSize: '1.3rem', marginTop: '30px', marginBottom: '15px' }}>1. Scope of Services &amp; Deliverables</h3>
            <p>
              Qorbit Tech agrees to deliver creative design, web development, mobile applications, video animation, and digital marketing services as specified in the agreed-upon project package or contract invoice.
            </p>

            <h3 style={{ color: '#f2b519', fontSize: '1.3rem', marginTop: '30px', marginBottom: '15px' }}>2. Revisions &amp; Approval</h3>
            <p>
              We pride ourselves on 100% customer satisfaction. Revisions will be made strictly according to the scope of your selected package. Any requests beyond original project specifications may be subject to additional fees.
            </p>

            <h3 style={{ color: '#f2b519', fontSize: '1.3rem', marginTop: '30px', marginBottom: '15px' }}>3. Ownership Rights &amp; Copyright</h3>
            <p>
              Upon final project payment clearance, the client holds 100% full ownership and copyright of all approved final deliverables (logos, source files, website code, animations). Qorbit Tech retains the right to display completed projects in its agency portfolio unless an explicit Non-Disclosure Agreement (NDA) is executed.
            </p>

            <h3 style={{ color: '#f2b519', fontSize: '1.3rem', marginTop: '30px', marginBottom: '15px' }}>4. Money Back Guarantee Policy</h3>
            <p>
              Our 100% Money Back Guarantee applies to initial concept phases before revision requests are initiated or final vector files are delivered. Refund requests must be made in writing within 30 days of initial order date.
            </p>

            <h3 style={{ color: '#f2b519', fontSize: '1.3rem', marginTop: '30px', marginBottom: '15px' }}>5. Contact Information</h3>
            <p>
              For legal inquiries or clarifications regarding these terms, please contact our administrative team at <a href="mailto:info@qorbit.tech" style={{ color: '#f2b519' }}>info@qorbit.tech</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer onOpenModal={() => setModalOpen(true)} />
      <PopupForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default TermsOfUse;
