import React from 'react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../constants/assets';

const Footer = ({ onOpenModal }) => (
  <>
    <section className="footercta">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h2>Want to consult with our team?</h2>
          </div>
          <div className="col-md-4 text-right">
            <a className="btn btn-outline-gradient" href="#" onClick={(e) => { e.preventDefault(); onOpenModal?.(); }}>
              get a quote now
            </a>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <div className="main_footer">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-6">
                  <div className="flogo">
                    <Link to="/">
                      <img src={ASSETS.logo} alt="Qorbit Tech" style={{ maxHeight: '75px', width: 'auto', mixBlendMode: 'screen', filter: 'brightness(1.2) drop-shadow(0 0 10px rgba(37,99,235,0.4))', marginBottom: '15px' }} />
                    </Link>
                  </div>
                  <p>Our industry experts make sure to deliver bespoke designs and cutting-edge technology so that your brand stands out amongst competition.</p>
                </div>
                <div className="col-md-3">
                  <h3><span>Services</span></h3>
                  <ul>
                    <li><Link to="/logo-design">Logo Design</Link></li>
                    <li><Link to="/web-design-development">Website Design</Link></li>
                    <li><Link to="/mobile-app">Mobile Application</Link></li>
                    <li><Link to="/seo">Search Engine Optimization (SEO)</Link></li>
                    <li><Link to="/smm">Social Media Marketing</Link></li>
                    <li><Link to="/printing-services">Printing Design</Link></li>
                    <li><Link to="/animation">Animation</Link></li>
                    <li><Link to="/nft-services">NFT Design</Link></li>
                  </ul>
                </div>
                <div className="col-md-3">
                  <h3><span>Quick Link</span></h3>
                  <ul>
                    <li><Link to="/about-us">About</Link></li>
                    <li><Link to="/portfolio">Portfolio</Link></li>
                    <li><Link to="/pricing">Pricing</Link></li>
                    <li><Link to="/contact-us">Contact us</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <h3><span>Contact Us</span></h3>
              <ul className="cntinfos">
                <li><i className="fa fa-map"></i><p>123 E San Carlos St San Jose, CA 95112</p></li>
                <li><i className="fa fa-phone"></i><a href="tel:+15104769126">+ 1 (510) 476-9126</a></li>
                <li><i className="fa fa-envelope"></i><a href="mailto:info@qorbit.tech">info@qorbit.tech</a></li>
              </ul>
              <ul className="socialicons">
                <li><a href="https://www.facebook.com/qorbittech" target="_blank" rel="noreferrer" title="Facebook"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="https://www.linkedin.com/company/qorbittech" target="_blank" rel="noreferrer" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a></li>
                <li><a href="https://www.trustpilot.com/review/qorbit.tech" target="_blank" rel="noreferrer" title="Trustpilot"><i className="fab fa-x-twitter"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>© Qorbit Tech {new Date().getFullYear()} . All rights reserved.</p>
            </div>
            <div className="col-md-6">
              <div className="copylinks">
                <Link to="/portfolio">Sitemap</Link> |
                <Link to="/order/privacy">Privacy Policy</Link> |
                <Link to="/order/terms-of-use">Terms of Use</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
