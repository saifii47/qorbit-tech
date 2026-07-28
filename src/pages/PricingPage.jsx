import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import PopupForm from '../components/PopupForm';
import Pricing from '../components/Pricing';
import CtaBanner from '../components/CtaBanner';

const faqs = [
  {
    q: 'Do I get 100% ownership rights of my design & code assets?',
    a: 'Yes, absolutely! Once your project is completed and final payments are cleared, you own 100% full copyright and ownership rights to all source files, logos, codebases, and vector assets.',
  },
  {
    q: 'What is the standard turnaround time for logo and web projects?',
    a: 'Initial logo concepts are delivered within 24 to 48 hours. Website design mockups are usually presented within 3-5 business days depending on complexity.',
  },
  {
    q: 'Are there any hidden recurring fees?',
    a: 'No hidden fees whatsoever. Our package pricing is completely transparent. For custom web hosting or maintenance, we provide itemized plans up front.',
  },
  {
    q: 'What formats will I receive for my design files?',
    a: 'You will receive vector master files (AI, EPS, SVG), high-res raster formats (PNG, JPG, TIFF, PSD), and web-optimized assets along with font files.',
  },
  {
    q: 'What if I am not satisfied with the initial design concepts?',
    a: 'We offer unlimited revisions on most packages until you are 100% satisfied. If we are unable to meet your requirements, we offer a 100% Money Back Guarantee.',
  },
];

const PricingPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <CustomCursor />
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Inner Banner */}
      <section
        className="inner-banner"
        style={{
          background: 'linear-gradient(135deg, rgba(8,8,8,0.95) 0%, rgba(20,20,20,0.85) 100%), url(https://www.pinnacledesignagency.com/assets/images/inner-banner/printing-bann.jpg) center/cover no-repeat',
          padding: '160px 0 100px',
          color: '#fff',
        }}
      >
        <div className="container text-center">
          <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>
            Transparent <span className="themecolor">Pricing &amp; Packages</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#b0b0b0', maxWidth: '750px', margin: '0 auto 25px' }}>
            Choose from our budget-friendly, value-packed design &amp; development packages. Premium quality without the corporate markup.
          </p>
          <div style={{ fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#f2b519' }}>
            Home &nbsp;/&nbsp; <span style={{ color: '#fff' }}>Pricing</span>
          </div>
        </div>
      </section>

      {/* Pricing Main Component */}
      <Pricing onOpenModal={() => setModalOpen(true)} />

      {/* Value Badges */}
      <section style={{ padding: '60px 0', background: '#111' }}>
        <div className="container">
          <div className="row text-center">
            {[
              { icon: 'fa-shield-alt', title: '100% Money Back Guarantee', desc: 'Risk-free investment backed by satisfaction commitment.' },
              { icon: 'fa-file-signature', title: '100% Ownership Rights', desc: 'You hold complete legal copyright to all deliverables.' },
              { icon: 'fa-clock', title: '24-48 Hour Turnaround', desc: 'Lightning fast initial concept deliveries by industry pros.' },
              { icon: 'fa-headset', title: '24/7 Dedicated Support', desc: 'Personal account manager available for guidance anytime.' },
            ].map((badge, i) => (
              <div key={i} className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                <div style={{ padding: '25px', background: '#181818', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <i className={`fas ${badge.icon}`} style={{ fontSize: '2.5rem', color: '#f2b519', marginBottom: '15px' }}></i>
                  <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '10px' }}>{badge.title}</h4>
                  <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section style={{ padding: '90px 0', background: '#090909' }}>
        <div className="container">
          <div className="text-center headingmain" style={{ marginBottom: '50px' }}>
            <h6 style={{ color: '#f2b519', textTransform: 'uppercase', letterSpacing: '2px' }}>Got Questions?</h6>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              Frequently Asked <span className="themecolor">Questions</span>
            </h2>
          </div>

          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: '#141414',
                  borderRadius: '10px',
                  marginBottom: '15px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                }}
              >
                <div
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  style={{
                    padding: '20px 25px',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{faq.q}</span>
                  <i className={`fas fa-chevron-${openFaq === idx ? 'up' : 'down'}`} style={{ color: '#f2b519' }}></i>
                </div>
                {openFaq === idx && (
                  <div style={{ padding: '0 25px 20px', color: '#aaa', fontSize: '0.95rem', lineHeight: '1.7' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
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

export default PricingPage;
