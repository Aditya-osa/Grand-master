import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', comment: '' });
    }, 700);
  };

  return (
    <div className="gm-contact-page-wrapper" id="contact">
      {/* Global Brand Navbar */}
      <Navbar />

      {/* ====================================================================
          HALF BANNER (SIMPLE & CLASSIC LIGHT PALETTE)
          ==================================================================== */}
      <section className="gm-half-banner" aria-label="Grand Master Contact Banner">
        <div className="banner-bg-layer" aria-hidden="true" />
        <div className="banner-mesh-overlay" aria-hidden="true" />

        {/* Giant Anton Typography matching Home Page */}
        <h1 className="banner-giant-text">CONTACT US</h1>

        <div className="banner-bottom-fade" aria-hidden="true" />
      </section>

      {/* ====================================================================
          MAIN CONTENT SECTION (SWAPPED: INFO LEFT, FORM RIGHT)
          ==================================================================== */}
      <main className="gm-contact-body" role="main">
        {/* Intro Tagline Header - Left aligned with the cards */}
        <div className="raise-standard">
          <h1 className="raise-standard-title">RAISE THE STANDARD</h1>
          <p className="raise-standard-desc">
            Connect with the Grand Master team and discover a <br/>spirit crafted for
            those who appreciate exceptional<br/> quality, character, and distinction.
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
                  <div className="gm-info-details">
                    <span className="gm-info-label">Head Office</span>
                    <p className="gm-info-text">
                      B1, Daffodil Building, Hiranandani Gardens, Powai, Mumbai- 400076
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="gm-info-item">
                  <div className="gm-info-details">
                    <span className="gm-info-label">Email id</span>
                    <a href="mailto:mail@Grandmasters.co" className="gm-info-link">
                      mail@Grandmasters.co
                    </a>
                  </div>
                </div>

                {/* Customer Care */}
                <div className="gm-info-item">
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
              We’d love to hear from you! Whether it’s to share your thoughts about our brand or let us know how much you enjoy our flavours.
            </p>

            {isSubmitted ? (
              <div className="gm-form-alert-success" role="alert">
                <i className="ri-checkbox-circle-fill" aria-hidden="true"></i>
                <div>
                  <strong>Thank You!</strong> Your message has been sent to Grand Master. We will get back to you shortly.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="gm-simple-form" noValidate>
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
                      placeholder="Enter first name"
                      className="gm-form-input"
                      required
                    />
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
                      placeholder="Enter last name"
                      className="gm-form-input"
                      required
                    />
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
                    placeholder="Enter your email address"
                    className="gm-form-input"
                    required
                  />
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
