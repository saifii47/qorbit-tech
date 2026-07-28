import React from 'react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../constants/assets';

const Hero = ({ onOpenModal }) => (
  <section className="bannermain">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-12 col-lg-5 texture1">
          <h1>
            We are the most prestigious <span className="themecolor">Design Agency</span> in town
          </h1>
          <p>
            We&apos;re a full-service creative digital marketing agency,<br />
            collaborating with brands all over the world.
          </p>
          <div className="btnstyle-bann">
            <Link className="bd-btn" to="/about-us">
              <span className="btn btn-outline-gradient">
                About us <i className="fa fa-angle-right space-left"></i>
              </span>
            </Link>
            <a className="fill-btn" href="#" onClick={(e) => { e.preventDefault(); onOpenModal(); }}>
              <span className="btn btn-slider1">
                Talk TO An Expert <i className="fa fa-arrow-right space-left"></i>
              </span>
            </a>
          </div>
        </div>
        <div className="col-md-12 col-lg-5 posinitial">
          <img src={ASSETS.bannerPeople} alt="Qorbit Tech Team" />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
