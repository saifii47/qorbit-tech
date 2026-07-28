import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import PricingPage from './pages/PricingPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import ScrollToTop from './components/shared/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/logo-design" element={<ServiceDetailPage serviceKey="logo-design" />} />
        <Route path="/web-design-development" element={<ServiceDetailPage serviceKey="web-design-development" />} />
        <Route path="/mobile-app" element={<ServiceDetailPage serviceKey="mobile-app" />} />
        <Route path="/seo" element={<ServiceDetailPage serviceKey="seo" />} />
        <Route path="/smm" element={<ServiceDetailPage serviceKey="smm" />} />
        <Route path="/printing-services" element={<ServiceDetailPage serviceKey="printing-services" />} />
        <Route path="/animation" element={<ServiceDetailPage serviceKey="animation" />} />
        <Route path="/nft-services" element={<ServiceDetailPage serviceKey="nft-services" />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/order/privacy" element={<PrivacyPolicy />} />
        <Route path="/order/terms-of-use" element={<TermsOfUse />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
