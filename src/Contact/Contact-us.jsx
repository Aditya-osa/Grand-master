import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bannerImg from '../assets/image.png';
import bannerVideo from '../assets/6a4659235173f72a046a6f90_6a5e3a721a51901c488abdee_banner video _mp4.mp4';
import './Contact-us.css';

const COUNTRIES = [
  'East Africa',
  'India',
  'Middle East',
  'West Africa',
  'Central Africa'
];

const CITIES = [
  'Mumbai',
  'Nashik',
  'Pune',
  'Kolhapur',
  'Ahmadnagar',
  'Jalgaon',
  'Nagpur',
  'Thane',
];

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    comment: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateField = (name, value) => {
    const trimmed = (value || '').trim();

    if (name === 'firstName') {
      if (!trimmed) return 'First name is required.';
      if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return 'First name can only contain letters.';
      if (trimmed.length < 2) return 'First name must be at least 2 characters.';
    }

    if (name === 'lastName') {
      if (!trimmed) return 'Last name is required.';
      if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return 'Last name can only contain letters.';
      if (trimmed.length < 2) return 'Last name must be at least 2 characters.';
    }

    if (name === 'email') {
      if (!trimmed) return 'Email address is required.';
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(trimmed)) return 'Please enter a valid email address (e.g. name@domain.com).';
    }

    return '';
  };

  const validateAll = () => {
    const newErrors = {};
    const fNameErr = validateField('firstName', formData.firstName);
    if (fNameErr) newErrors.firstName = fNameErr;

    const lNameErr = validateField('lastName', formData.lastName);
    if (lNameErr) newErrors.lastName = lNameErr;

    const emailErr = validateField('email', formData.email);
    if (emailErr) newErrors.email = emailErr;

    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      firstName: true,
      lastName: true,
      email: true,
    });

    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];
      const el = document.getElementById(firstErrorField);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      email: formData.email.trim(),
      phone: 'Website Inquiry',
      company: "Grand Master's Vodka",
      service: 'General Inquiry',
      message: formData.comment ? formData.comment.trim() : 'No comment provided',
      comment: formData.comment ? formData.comment.trim() : 'No comment provided',
    };

    try {
      // Ensure anti-bot challenge cookie is present
      try {
        document.cookie = 'humans_21909=1; path=/; max-age=31536000; SameSite=Lax';
      } catch (_) {}

      const formDataToSend = new FormData();
      Object.entries(payload).forEach(([key, val]) => {
        formDataToSend.append(key, val);
      });

      let response = await fetch('/sendmail.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
        body: formDataToSend,
      });

      // If server returns anti-bot challenge 409, set cookie and retry
      if (response.status === 409) {
        try {
          const text = await response.text();
          const match = text.match(/document\.cookie\s*=\s*["']([^"']+)["']/);
          if (match && match[1]) {
            document.cookie = `${match[1]}; path=/; max-age=31536000; SameSite=Lax`;
          } else {
            document.cookie = 'humans_21909=1; path=/; max-age=31536000; SameSite=Lax';
          }
          response = await fetch('/sendmail.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'include',
            body: formDataToSend,
          });
        } catch (_) {}
      }

      const rawText = await response.text();
      let data = {};
      try {
        data = JSON.parse(rawText);
      } catch (_) {}

      if (response.ok && (data.success === true || data.status === 'success')) {
        setIsSubmitted(true);
        setFormData({ firstName: '', lastName: '', email: '', comment: '' });
        setErrors({});
        setTouched({});
        setErrorMessage('');
      } else {
        const errorMsg = data.message || data.debug || data.error || `Server responded with status ${response.status}`;
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setErrorMessage(err.message || 'Unable to send message. Please email mail@grandmasters.co directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="gm-contact-page-wrapper" id="contact">
      {/* Global Brand Navbar */}
      <Navbar />

      {/* ====================================================================
          HALF BANNER (SIMPLE & CLASSIC LIGHT PALETTE)
          ==================================================================== */}
      <section className="gm-half-banner" aria-label="Grand Master Contact Banner">
        <div className="banner-video-overlay" aria-hidden="true" />
        <video
          className="banner-bg-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          
        >
          <source src={bannerVideo} type="video/mp4" />
          
        </video>

        {/* Foreground Hero Content Lockup */}
        <div className="contact-banner-content">
          <span className="contact-banner-subtitle">WE'RE HERE TO CONNECT</span>
          <h1 className="contact-banner-title">LET'S TALK</h1>
          <p className="contact-banner-desc">
            Have a question or want to connect with Grand Master's?<br/> We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* ====================================================================
          MAIN CONTENT SECTION (SWAPPED: INFO LEFT, FORM RIGHT)
          ==================================================================== */}
      <main className="gm-contact-body" role="main">
        {/* Intro Tagline Header - Left aligned with the cards */}
        <div className="raise-standard">
          <h1 className="raise-standard-title">CONNECT WITH GRAND MASTER'S</h1>
          <p className="raise-standard-desc">
            Have a question or need assistance? Get in touch with the Grand Master's team. <br/>We're here to help with your enquiries, feedback, and brand-related questions.
          </p>
        </div>

        <div className="gm-contact-split">
          {/* ------------------------------------------------------------------
              LEFT COLUMN: CONTACT US
              ------------------------------------------------------------------ */}
          <div className="gm-info-column">
            {/* Contact Details Card */}
            <section className="gm-contact-card" aria-labelledby="contact-info-title">
              <h2 className="gm-section-title-main" id="contact-info-title">
                CONTACT US
              </h2>

              <div className="gm-info-list">
                {/* Head Office */}
                <div className="gm-info-item">
                  <div className="gm-info-icon-box" aria-hidden="true">
                    <i className="ri-map-pin-2-line"></i>
                  </div>
                  <div className="gm-info-details">
                    <span className="gm-info-label">Head Office</span>
                    <p className="gm-info-text">
                      B1, Daffodil Building, Hiranandani Gardens, Powai, Mumbai- 400076
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="gm-info-item">
                  <div className="gm-info-icon-box" aria-hidden="true">
                    <i className="ri-mail-line"></i>
                  </div>
                  <div className="gm-info-details">
                    <span className="gm-info-label">Email id</span>
                    <a href="mailto:mail@Grandmasters.co" className="gm-info-link">
                      mail@Grandmasters.co
                    </a>
                  </div>
                </div>

                {/* Customer Care */}
                <div className="gm-info-item">
                  <div className="gm-info-icon-box" aria-hidden="true">
                    <i className="ri-phone-line"></i>
                  </div>
                  <div className="gm-info-details">
                    <span className="gm-info-label">Customer Care</span>
                    <a href="tel:022-25709440" className="gm-info-link">
                      022-25709440
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Presence Card */}
            <section className="gm-presence-card" aria-labelledby="our-presence-title">
              <h2 className="gm-section-title-main" id="our-presence-title">
                OUR PRESENCE
              </h2>

              <div className="gm-presence-grid">
                {/* Countries */}
                <div className="gm-presence-section">
                  <h3 className="gm-presence-subheading">
                    <i className="ri-global-line" aria-hidden="true"></i>
                    <span>Countries</span>
                  </h3>
                  <ul className="gm-presence-list">
                    {COUNTRIES.map((country) => (
                      <li key={country} className="gm-presence-item">
                        <span className="gm-presence-bullet" aria-hidden="true"></span>
                        <span>{country}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cities in Maharashtra */}
                <div className="gm-presence-section">
                  <h3 className="gm-presence-subheading">
                    <i className="ri-map-pin-line" aria-hidden="true"></i>
                    <span>Cities in Maharashtra</span>
                  </h3>
                  <ul className="gm-cities-grid">
                    {CITIES.map((city) => (
                      <li key={city} className="gm-city-item">
                        <span className="gm-presence-bullet" aria-hidden="true"></span>
                        <span>{city}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* ------------------------------------------------------------------
              RIGHT COLUMN: SEND US A MESSAGE
              ------------------------------------------------------------------ */}
          <section className="gm-message-card" aria-labelledby="send-message-title">
            <h2 className="gm-section-title-main" id="send-message-title">
              SEND US A MESSAGE
            </h2>
            <p className="gm-message-desc">
           We'd love to hear from you. Share your questions, feedback, or thoughts with our team.
            </p>

            {isSubmitted ? (
              <div className="gm-form-alert-success" role="alert">
                <i className="ri-checkbox-circle-fill" aria-hidden="true"></i>
                <div>
                  <strong>Thank You!</strong> Your message has been sent to Grand Master. We will get back to you shortly.
                  <div style={{ marginTop: '12px' }}>
                    <button
                      type="button"
                      className="gm-send-another-btn"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form
                action="/sendmail.php"
                method="POST"
                onSubmit={handleSubmit}
                className="gm-simple-form"
                noValidate
              >

                {errorMessage && (
                  <div className="gm-form-alert-error" role="alert">
                    <i className="ri-error-warning-fill" aria-hidden="true"></i>
                    <div>
                      {errorMessage}{' '}
                      <a href="mailto:adityasahu15571@gmail.com">Send Email Directly</a>
                    </div>
                  </div>
                )}
                {/* First Name & Last Name */}
                <div className="gm-form-row">
                  <div className="gm-form-group">
                    <label htmlFor="firstName" className="gm-form-label">
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="First Name"
                      className={`gm-form-input ${touched.firstName && errors.firstName ? 'gm-input-error' : ''}`}
                      aria-invalid={Boolean(touched.firstName && errors.firstName)}
                      aria-describedby={touched.firstName && errors.firstName ? 'firstName-error' : undefined}
                      required
                    />
                    {touched.firstName && errors.firstName && (
                      <span className="gm-field-error" id="firstName-error" role="alert">
                        <i className="ri-error-warning-fill" aria-hidden="true"></i>
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div className="gm-form-group">
                    <label htmlFor="lastName" className="gm-form-label">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Last Name"
                      className={`gm-form-input ${touched.lastName && errors.lastName ? 'gm-input-error' : ''}`}
                      aria-invalid={Boolean(touched.lastName && errors.lastName)}
                      aria-describedby={touched.lastName && errors.lastName ? 'lastName-error' : undefined}
                      required
                    />
                    {touched.lastName && errors.lastName && (
                      <span className="gm-field-error" id="lastName-error" role="alert">
                        <i className="ri-error-warning-fill" aria-hidden="true"></i>
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email* */}
                <div className="gm-form-group">
                  <label htmlFor="email" className="gm-form-label">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your email address"
                    className={`gm-form-input ${touched.email && errors.email ? 'gm-input-error' : ''}`}
                    aria-invalid={Boolean(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                    required
                  />
                  {touched.email && errors.email && (
                    <span className="gm-field-error" id="email-error" role="alert">
                      <i className="ri-error-warning-fill" aria-hidden="true"></i>
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Comment */}
                <div className="gm-form-group">
                  <label htmlFor="comment" className="gm-form-label">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write your comments or thoughts here..."
                    className="gm-form-textarea"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="gm-submit-button"
                  disabled={isSubmitting}
                  id="submit-message-btn"
                >
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line ri-spin" aria-hidden="true"></i>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </form>
            )}
          </section>
        </div>
      </main>

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
}
