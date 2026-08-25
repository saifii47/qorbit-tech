import React from 'react';

const CtaBanner = ({ onOpenModal }) => (
  <section className="ctamm">
    <div className="container" data-aos="fade-up" data-aos-duration="1500">
      <h2>
        Take The First Step Towards The <strong>RIGHT DIRECTION!</strong>
      </h2>
      <div className="btnctas">
        <div className="callcta">
          <div className="call-holder text-right">
            <p>
              Call toll free
              <a href="tel:+15104769126">+ 1 (510) 476-9126</a>
            </p>
          </div>
          <div className="icos"><i className="fas fa-phone-alt"></i></div>
        </div>
        <div className="simplebtn_request">
          <a className="btn btn-black-cta" href="#" onClick={(e) => { e.preventDefault(); onOpenModal?.(); }}>
            Request a Quote
          </a>
        </div>
        <div className="callcta">
          <div className="icos"><i className="fas fa-comments"></i></div>
          <div className="call-holder text-left">
            <p>
              Need help?
              <a href="#" className="chat" onClick={(e) => e.preventDefault()}>Live Chat Now</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CtaBanner;
