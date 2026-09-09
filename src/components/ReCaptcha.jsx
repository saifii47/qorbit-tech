import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const SCRIPT_ID = 'recaptcha-script-tag';
let isScriptLoading = false;
const readyCallbacks = [];

function loadRecaptchaScript(onReady) {
  if (typeof window === 'undefined') return;

  if (window.grecaptcha && window.grecaptcha.render) {
    onReady();
    return;
  }

  readyCallbacks.push(onReady);

  if (document.getElementById(SCRIPT_ID)) {
    return;
  }

  isScriptLoading = true;
  window.onRecaptchaLoaded = () => {
    isScriptLoading = false;
    while (readyCallbacks.length > 0) {
      const cb = readyCallbacks.shift();
      if (typeof cb === 'function') cb();
    }
  };

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoaded&render=explicit';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

const ReCaptcha = forwardRef(({
  sitekey,
  theme = 'dark',
  size = 'normal',
  onChange,
  onExpired,
  onError,
  className = '',
  style = {},
}, ref) => {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const effectiveSiteKey = sitekey || import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (e) {
          console.warn('reCAPTCHA reset error:', e);
        }
      }
      if (onChange) onChange('');
    },
    getResponse: () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          return window.grecaptcha.getResponse(widgetIdRef.current);
        } catch (e) {
          return '';
        }
      }
      return '';
    },
  }));

  useEffect(() => {
    let isMounted = true;

    const renderWidget = () => {
      if (!isMounted || !containerRef.current || !window.grecaptcha || !window.grecaptcha.render) return;

      // Avoid double render inside same container
      if (widgetIdRef.current !== null) {
        return;
      }

      try {
        containerRef.current.innerHTML = '';
        const id = window.grecaptcha.render(containerRef.current, {
          sitekey: effectiveSiteKey,
          theme: theme,
          size: size,
          callback: (token) => {
            if (isMounted && onChange) onChange(token);
          },
          'expired-callback': () => {
            if (isMounted && onExpired) onExpired();
            if (isMounted && onChange) onChange('');
          },
          'error-callback': () => {
            if (isMounted && onError) onError();
          },
        });
        widgetIdRef.current = id;
      } catch (err) {
        console.warn('reCAPTCHA render error:', err);
      }
    };

    loadRecaptchaScript(() => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(renderWidget);
      } else {
        renderWidget();
      }
    });

    return () => {
      isMounted = false;
      widgetIdRef.current = null;
    };
  }, [effectiveSiteKey, theme, size]);

  return (
    <div
      className={`recaptcha-wrapper ${className}`}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        overflow: 'hidden',
        minHeight: '78px',
        ...style,
      }}
    >
      <div
        ref={containerRef}
        style={{
          transformOrigin: '0 0',
          maxWidth: '100%',
        }}
      />
    </div>
  );
});

ReCaptcha.displayName = 'ReCaptcha';

export default ReCaptcha;
