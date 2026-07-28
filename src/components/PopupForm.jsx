import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const PopupForm = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    Swal.fire({
      icon: 'success',
      title: 'Thank You!',
      text: 'An expert will contact you shortly.',
      confirmButtonColor: '#f2b519',
      background: '#121212',
      color: '#ffffff',
    });
    setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  return (
    <div
      className="modal fade show"
      id="popup_form"
      style={{ display: 'block', background: 'rgba(0,0,0,0.85)', zIndex: 99999 }}
      role="dialog"
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="entry-box" data-form-type="signup_form">
          <form className="offr-frm leadForm" onSubmit={handleSubmit}>
            <div className="row h-100 justify-content-center">
              <div className="col-lg-6 col-md-5 col-sm-5 popup_top px-0 bg_popup"></div>
              <div className="col-lg-6 col-md-7 col-sm-10 entry-right py-5">
                <div className="row">
                  <div className="col-sm-12 p-lg-0">
                    <button type="button" className="close" onClick={onClose}>&times;</button>
                    <div className="text_topfr">
                      <h2>Looking for an amazing offer?</h2>
                      <p>Fill out the form and get in touch with an expert!</p>
                    </div>
                  </div>
                  <div className="col-sm-6 pl-lg-0">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Your Name"
                        required
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 pl-lg-0">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email Address"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        maxLength={15}
                        placeholder="Phone Number"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 pl-lg-0">
                    <div className="form-group">
                      <textarea
                        name="message"
                        placeholder="Tell us about your project..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-sm-12 pl-lg-0">
                    <div className="form-group mb-0">
                      <button type="submit" className="yellow_btn" name="signupForm">
                        Get In Touch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
