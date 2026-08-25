import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const inputStyle = {
  width: '100%', height: '44px', padding: '0 14px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '8px', color: '#ffffff',
  fontSize: '14px', fontFamily: 'Outfit, sans-serif',
  outline: 'none', transition: 'border-color 0.3s ease',
};

const PopupForm = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    Swal.fire({
      icon: 'success',
      title: 'Thank You!',
      text: 'An expert will contact you shortly.',
      confirmButtonColor: '#2563eb',
      background: '#0d1432',
      color: '#ffffff',
    });
    setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(5,5,16,0.85)',
        backdropFilter: 'blur(12px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'Outfit, sans-serif',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%', maxWidth: '500px',
          background: 'rgba(13,20,50,0.95)',
          border: '1px solid rgba(37,99,235,0.25)',
          borderRadius: '20px',
          padding: '48px 40px',
          position: 'relative',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(37,99,235,0.1)',
          animation: 'popupIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          fontFamily: 'Outfit, sans-serif',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            width: '36px', height: '36px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '18px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,99,235,0.3)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
        >
          &times;
        </button>

        {/* Top glow */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '200px', height: '2px',
          background: 'linear-gradient(90deg, transparent, #2563eb, #7c3aed, transparent)',
          borderRadius: '2px',
        }} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.15))',
            border: '1px solid rgba(37,99,235,0.3)',
            marginBottom: '16px',
          }}>
            <i className="fas fa-rocket" style={{ color: '#3b82f6', fontSize: '22px' }} />
          </div>
          <h2 style={{ color: '#ffffff', fontSize: '24px', fontFamily: 'Outfit, sans-serif', fontWeight: 800, marginBottom: '8px' }}>
            Get an Amazing Offer
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.6, fontFamily: 'Outfit, sans-serif' }}>
            Fill out the form and an expert will reach out shortly!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <input
              type="text" placeholder="First Name" required
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'rgba(37,99,235,0.6)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
            />
            <input
              type="text" placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'rgba(37,99,235,0.6)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <input
              type="email" placeholder="Email Address" required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'rgba(37,99,235,0.6)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
            />
            <input
              type="tel" placeholder="Phone Number" required maxLength={15}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'rgba(37,99,235,0.6)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
            />
          </div>
          <textarea
            placeholder="Tell us about your project..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={3}
            style={{
              ...inputStyle, height: 'auto', padding: '12px 14px',
              resize: 'none', width: '100%', marginBottom: '16px',
              display: 'block',
            }}
            onFocus={(e) => e.target.style.borderColor = 'rgba(37,99,235,0.6)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
          />
          <button
            type="submit"
            style={{
              width: '100%', height: '52px',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              border: 'none', borderRadius: '10px',
              color: '#ffffff', fontSize: '16px',
              fontFamily: 'Outfit, sans-serif', fontWeight: 700, letterSpacing: '0.04em',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(37,99,235,0.4)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,99,235,0.6)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,99,235,0.4)'; }}
          >
            Get In Touch Now →
          </button>
        </form>

        <style>{`
          @keyframes popupIn {
            from { opacity: 0; transform: scale(0.9) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default PopupForm;
