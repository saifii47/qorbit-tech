import React, { useRef, useEffect } from 'react';
import ReCaptcha from './ReCaptcha';

const ReCaptchaModal = ({ isOpen, onClose, onVerify, title = "Security Verification", subtitle = "Please check the box below to verify you are human." }) => {
  const recaptchaRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleVerify = (token) => {
    if (!token) return;
    // Brief delay to let the user see the green checkmark before modal closes
    setTimeout(() => {
      onVerify(token);
    }, 450);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 5, 16, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000005,
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(13, 20, 50, 0.96)',
          border: '1px solid rgba(37, 99, 235, 0.35)',
          borderRadius: '20px',
          padding: '32px 28px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(37, 99, 235, 0.2)',
          textAlign: 'center',
          position: 'relative',
          animation: 'scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily: 'Outfit, sans-serif',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '32px',
            height: '32px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '50%',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
          }}
        >
          &times;
        </button>

        {/* Shield Icon */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(56, 189, 248, 0.15))',
            border: '1px solid rgba(37, 99, 235, 0.4)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            boxShadow: '0 8px 25px rgba(37, 99, 235, 0.3)',
          }}
        >
          <i className="fas fa-shield-alt" style={{ color: '#38bdf8', fontSize: '24px' }} />
        </div>

        <h3
          style={{
            color: '#ffffff',
            fontSize: '22px',
            fontWeight: 700,
            marginBottom: '8px',
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '14px',
            lineHeight: 1.5,
            marginBottom: '22px',
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          {subtitle}
        </p>

        {/* ReCaptcha Container */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '12px',
            overflow: 'hidden',
          }}
        >
          <ReCaptcha
            ref={recaptchaRef}
            theme="dark"
            onChange={handleVerify}
            onExpired={() => {}}
          />
        </div>

        <p
          style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.45)',
            margin: '12px 0 0',
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          Secured by Google reCAPTCHA
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ReCaptchaModal;
