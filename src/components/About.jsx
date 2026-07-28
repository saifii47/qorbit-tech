import React from 'react';
import { ASSETS } from '../constants/assets';

const About = ({ onOpenModal }) => (
  <section className="sec_02">
    <div className="container" data-aos="fade-up" data-aos-duration="1500">
      <div className="row">
        <div className="col-md-6">
          <h6>Who We are?</h6>
          <h2>
            We&apos;re a Globally RECOGNIZED <br />
            <strong>Digital Design Agency</strong>
          </h2>
          <p>
            Our industry experts make sure to deliver bespoke designs so that your brand stands out amongst competition.
          </p>
          <div className="liststeps_li">
            <div className="row">
              <div className="col-md-6">
                <h4><i className="fa fa-angle-double-right"></i> Strategic vision</h4>
                <p>A client once told us that where the others focus on one star one issue we see the whole sky.</p>
              </div>
              <div className="col-md-6">
                <h4><i className="fa fa-angle-double-right"></i> Networks that span sectors</h4>
                <p>Over more than 20 years, we&apos;ve fostered trusted relationships across government, industry and global forums.</p>
              </div>
              <div className="col-md-6">
                <h4><i className="fa fa-angle-double-right"></i> ATTENTION TO DETAIL</h4>
                <p>It&apos;s our attention to the small stuff, scheduling of timelines & keen project management that makes us stand out from the rest.</p>
              </div>
              <div className="col-md-6">
                <div className="requestbtn">
                  <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal?.(); }} title="">
                    GET a quote <i className="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="ct-image-single img-hover-added">
            <div className="ct-image-single--inner">
              <img width="465" height="678" src={`${ASSETS.cdn}/light-bulb-1.png`} className="img-main attachment-full" alt="" />
              <img width="465" height="678" src={`${ASSETS.cdn}/light-bulb-2.png`} className="img-hover attachment-full" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
