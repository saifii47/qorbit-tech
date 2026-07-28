import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Thank You!',
      text: 'Your message has been sent. We will get back to you shortly.',
      confirmButtonColor: '#f2b519',
    });
    setForm({ name: '', phone: '', email: '' });
  };

  return (
    <section className="footerform">
      <div className="container">
        <div className="row" data-aos="fade-up" data-aos-duration="1500">
          <div className="col-md-6 col-lg-4">
            <div className="hdstyle_01">
              <h6>Contact Us</h6>
              <h3>Let&apos;s Work <span className="themecolor">Together!</span></h3>
            </div>
            <div className="contactlist">
              <div className="listing_info">
                <div className="icondv"><i className="flaticon flaticon-location"></i></div>
                <div className="cont_details">
                  <h5>Office Address:</h5>
                  <p>123 E San Carlos St San Jose, CA 95112</p>
                </div>
              </div>
              <div className="listing_info">
                <div className="icondv"><i className="flaticon flaticon-call"></i></div>
                <div className="cont_details">
                  <h5>Phone number:</h5>
                  <p><a href="tel:+15104769126">+ 1 (510) 476-9126</a></p>
                </div>
              </div>
              <div className="listing_info">
                <div className="icondv"><i className="flaticon flaticon-chat"></i></div>
                <div className="cont_details">
                  <h5>Mail Address:</h5>
                  <p><a href="mailto:info@qorbit.tech">info@qorbit.tech</a></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1 col-lg-3 mobilehide"></div>
          <div className="col-md-6 col-lg-5">
            <div className="ct-contact-form" data-form-type="footer_form">
              <div className="ct-contact-meta">
                <h4 className="ct-meta--title"><span>Contact us</span></h4>
                <div className="ct-meta--desc">
                  We work with ambitious leaders who want to define the future, not hide from it.
                </div>
              </div>
              <div className="ct-contact-form-mm">
                <form className="leadForm" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="fieldinput">
                        <label>Name *</label>
                        <i className="fa fa-user input-icon"></i>
                        <input type="text" className="form-control" name="name" placeholder="Write Name ..." required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div className="fieldinput">
                        <label>Mobile number *</label>
                        <i className="fa fa-user input-icon"></i>
                        <input type="text" className="form-control" placeholder="+1 (___) __ ____" name="phone" maxLength={10} required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                      </div>
                      <div className="fieldinput">
                        <label>Email address *</label>
                        <i className="fa fa-user input-icon"></i>
                        <input type="email" className="form-control" placeholder="email@gmail.com" name="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-md-12 touc-sec-form">
                      <button type="submit" className="yellow_btn">
                        Let&apos;s Get to Work <i className="flaticon-right-arrows icon-space-left"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
