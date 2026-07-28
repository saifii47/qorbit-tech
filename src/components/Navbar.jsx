import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ASSETS } from '../constants/assets';

const servicesList = [
  { path: '/services', label: 'All Services' },
  { path: '/logo-design', label: 'Logo Design' },
  { path: '/web-design-development', label: 'Web Design Development' },
  { path: '/mobile-app', label: 'Mobile Application' },
  { path: '/seo', label: 'Search Engine Optimization (SEO)' },
  { path: '/smm', label: 'Social Media Marketing' },
  { path: '/printing-services', label: 'Printing Design' },
  { path: '/animation', label: 'Animation' },
  { path: '/nft-services', label: 'NFT Design' },
];

const Navbar = ({ onOpenModal }) => {
  const [sticky, setSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  const isServiceActive = servicesList.some((s) => s.path === location.pathname);

  return (
    <header className={`fixed${sticky ? ' sticky' : ''}`}>
      <div className="main-header">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <Link to="/" className="logo" onClick={closeMenu}>
              <img src={ASSETS.logo} alt="Qorbit Tech" style={{ maxHeight: '55px', width: 'auto' }} />
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse${mobileOpen ? ' show' : ''}`}>
              <div className="mainnavs">
                <nav>
                  <ul>
                    <li className="nav-item">
                      <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/" onClick={closeMenu}>
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${location.pathname === '/about-us' ? 'active' : ''}`} to="/about-us" onClick={closeMenu}>
                        About Us
                      </Link>
                    </li>
                    <li
                      className={`nav-item dropdown${servicesOpen || isServiceActive ? ' show' : ''}`}
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <Link
                        className={`nav-link dropdown-toggle ${isServiceActive ? 'active' : ''}`}
                        to="/services"
                        onClick={(e) => {
                          if (window.innerWidth < 992) {
                            e.preventDefault();
                            setServicesOpen(!servicesOpen);
                          } else {
                            closeMenu();
                          }
                        }}
                      >
                        Services
                      </Link>
                      <div className={`dropdown-menu${servicesOpen ? ' show' : ''}`}>
                        {servicesList.map((service) => (
                          <Link
                            key={service.path}
                            className={`dropdown-item ${location.pathname === service.path ? 'active' : ''}`}
                            to={service.path}
                            onClick={closeMenu}
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${location.pathname === '/portfolio' ? 'active' : ''}`} to="/portfolio" onClick={closeMenu}>
                        Portfolio
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${location.pathname === '/pricing' ? 'active' : ''}`} to="/pricing" onClick={closeMenu}>
                        Pricing
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${location.pathname === '/contact-us' ? 'active' : ''}`} to="/contact-us" onClick={closeMenu}>
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </nav>

                <div className="calltopdv" onClick={onOpenModal} style={{ cursor: 'pointer' }}>
                  <div className="ct-info-icon"><i className="fa fa-phone"></i></div>
                  <div className="ct-info-holder">
                    <div className="ct-info-label">Call us:</div>
                    <div className="ct-info-title">+ 1 (510) 476-9126</div>
                    <a href="tel:+15104769126" onClick={(e) => e.stopPropagation()}></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
