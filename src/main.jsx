import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

/* Original site styles — imported directly to avoid PostCSS @import issues */
import './assets/css/sweetalert.css';
import './assets/css/plugin.css';
import './assets/css/custom-unmini.css';
import './assets/css/responsive-unmini.css';
import './assets/css/assets-fix.css';
import './assets/css/extra.css';
import './index.css';

import AOS from 'aos';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'sans-serif', color: '#c00' }}>
          <h1>Something went wrong</h1>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

// Init AOS after React mounts
requestAnimationFrame(() => {
  AOS.init({
    duration: 1200,
    once: true,
    easing: 'ease-out-cubic',
    offset: 80,
  });
});
