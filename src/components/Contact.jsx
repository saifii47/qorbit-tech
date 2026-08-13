import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Thank You!',
      text: 'Your message has been sent. We will get back to you shortly.',
      confirmButtonColor: '#2563eb',
    });
    setForm({ name: '', phone: '', email: '' });
  };

  return (
    <section
      className="footerform"
      style={{
        background: 'linear-gradient(180deg, #050510 0%, #080820 100%)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative glows */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(ellipse, rgba(56,189,248,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row" data-aos="fade-up" data-aos-duration="1500">
          <div className="col-md-6 col-lg-4">
            <div className="hdstyle_01" style={{ marginBottom: '35px' }}>
              <h6 style={{ color: '#2563eb', fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Contact Us</h6>
              <h3 style={{ color: '#ffffff', fontSize: '40px' }}>
                Let&apos;s Work <span style={{ color: '#2563eb' }}>Together!</span>
              </h3>
            </div>
            <div className="contactlist">
              {[
                { icon: 'fas fa-map-marker-alt', label: 'Office Address:', text: '123 E San Carlos St San Jose, CA 95112', href: null },
                { icon: 'fas fa-phone-alt', label: 'Phone number:', text: '+ 1 (510) 476-9126', href: 'tel:+15104769126' },
                { icon: 'fas fa-envelope', label: 'Mail Address:', text: 'info@qorbit.tech', href: 'mailto:info@qorbit.tech' },
              ].map((item) => (
                <div key={item.label} className="listing_info" style={{ marginBottom: '28px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    width: '54px', height: '54px', minWidth: '54px',
                    background: 'linear-gradient(135deg, #4f46e5, #2563eb)',
                    border: 'none',
                    borderRadius: '14px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(79,70,229,0.4)'
                  }}>
                    <i className={item.icon} style={{ color: '#ffffff', fontSize: '22px' }} />
                  </div>
                  <div>
                    <h5 style={{ color: '#ffffff', fontSize: '20px', marginBottom: '4px' }}>{item.label}</h5>
                    {item.href
                      ? <a href={item.href} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px' }}>{item.text}</a>
                      : <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px' }}>{item.text}</p>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-1 col-lg-3 mobilehide" />

          <div className="col-md-6 col-lg-5">
            <div style={{
              background: 'rgba(13,20,50,0.7)',
              border: '1px solid rgba(37,99,235,0.25)',
              borderRadius: '20px',
              padding: '40px 36px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            }}>
              <div className="ct-contact-meta" style={{ textAlign: 'center', marginBottom: '28px' }}>
                <h4 style={{ color: '#ffffff', fontSize: '28px', marginBottom: '8px' }}>Contact us</h4>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.6 }}>
                  We work with ambitious leaders who want to define the future, not hide from it.
                </div>
              </div>
              <div className="ct-contact-form-mm">
                <form className="leadForm" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      {[{ label: 'Name *', type: 'text', name: 'name', placeholder: 'Write Name ...' },
                        { label: 'Mobile number *', type: 'text', name: 'phone', placeholder: '+1 (___) __ ____' },
                        { label: 'Email address *', type: 'email', name: 'email', placeholder: 'email@gmail.com' },
                      ].map((field) => (
                        <div key={field.name} style={{ marginBottom: '14px', position: 'relative' }}>
                          <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.label}
                            required
                            value={form[field.name]}
                            onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                            style={{
                              width: '100%', height: '52px', background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
                              color: '#ffffff', fontSize: '15px', padding: '0 16px',
                              outline: 'none', transition: 'border-color 0.3s',
                              fontFamily: 'Poppins,sans-serif',
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'rgba(56,189,248,0.6)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="col-md-12" style={{ marginTop: '8px' }}>
                      <button
                        type="submit"
                        style={{
                          width: '100%', height: '52px',
                          background: 'linear-gradient(135deg, #1d4ed8, #2563eb, #38bdf8)',
                          border: 'none', borderRadius: '8px', color: '#ffffff',
                          fontSize: '16px', fontFamily: 'Bebas Neue,sans-serif',
                          letterSpacing: '0.08em', cursor: 'pointer',
                          boxShadow: '0 4px 20px rgba(37,99,235,0.45)',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 30px rgba(56,189,248,0.6)'; }}
                        onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 20px rgba(37,99,235,0.45)'; }}
                      >
                        Let&apos;s Get to Work →
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
