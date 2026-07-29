import React from 'react';
import { ASSETS } from '../constants/assets';

const About = ({ onOpenModal }) => (
  <section
    className="sec_02"
    style={{
      background: '#000000',
      padding: '90px 0',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Background decorative glow */}
    <div style={{
      position: 'absolute', top: '-200px', right: '-100px',
      width: '500px', height: '500px',
      background: 'radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, transparent 70%)',
      pointerEvents: 'none',
    }} />

    <div className="container" data-aos="fade-up" data-aos-duration="1500" style={{ position: 'relative', zIndex: 1 }}>
      <div className="row">
        <div className="col-md-6">
          <h6 style={{ color: '#2563eb', fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Who We Are?
          </h6>
          <h2 style={{ color: '#ffffff', fontSize: '44px', lineHeight: '1.1', marginBottom: '20px', fontWeight: 900 }}>
            We&apos;re a Globally RECOGNIZED <br />
            <strong style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Digital Design Agency
            </strong>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: '32px' }}>
            Our industry experts make sure to deliver bespoke designs so that your brand stands out amongst competition.
          </p>

          <div className="liststeps_li">
            <div className="row">
              {[
                { icon: 'fa-angle-double-right', title: 'Strategic Vision', desc: 'A client once told us where others focus on one star, we see the whole sky.' },
                { icon: 'fa-angle-double-right', title: 'Networks That Span Sectors', desc: "Over 20 years, we've fostered trusted relationships across government, industry and global forums." },
                { icon: 'fa-angle-double-right', title: 'Attention To Detail', desc: "It's our attention to the small stuff, timelines & keen project management that makes us stand out." },
              ].map((item) => (
                <div key={item.title} className="col-md-6" style={{ marginBottom: '24px' }}>
                  <h4 style={{ color: '#ffffff', fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: 600, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className={`fa ${item.icon}`} style={{ color: '#2563eb', fontSize: '14px' }} />
                    {item.title}
                  </h4>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
              <div className="col-md-6">
                <div className="requestbtn">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onOpenModal?.(); }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                      color: '#fff', padding: '12px 28px', borderRadius: '8px',
                      fontFamily: 'Bebas Neue,sans-serif', fontSize: '18px',
                      letterSpacing: '0.06em', textDecoration: 'none',
                      boxShadow: '0 4px 20px rgba(37,99,235,0.35)',
                    }}
                  >
                    GET A QUOTE <i className="fa fa-angle-right" />
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
