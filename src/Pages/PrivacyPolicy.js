// src/Pages/PrivacyPolicy.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../Styles/Privacy.css';  // custom css if needed

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <div className="container py-5">
        <div className="text-center mb-5">
          <i className="bi bi-shield-lock fs-1 text-primary"></i>
          <h1 className="fw-bold mt-3" style={{fontFamily:"Playfair Display"}}>Privacy Policy</h1>
          <p className="text-muted">Last updated: 03/10/2025</p>
        </div>

        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Introduction</h4>
          <p>
            At <strong>The Journey Loop</strong>, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our website and use our services.
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy
            policy, please do not access the site.
          </p>
        </section>

        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Information We Collect</h4>
          <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
          <ul>
            <li><strong>Personal Data:</strong> Name, email address, phone number, postal address, and payment information.</li>
            <li><strong>Derivative Data:</strong> IP address, browser type, OS, and access times.</li>
            <li><strong>Financial Data:</strong> Credit card numbers and billing info (processed securely).</li>
            <li><strong>Mobile Device Data:</strong> Device info if you access via mobile.</li>
          </ul>
        </section>

        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Use of Your Information</h4>
          <p>We use the information we collect about you to:</p>
          <ul>
            <li>Process your bookings and transactions</li>
            <li>Send booking confirmations and updates</li>
            <li>Respond to inquiries and provide support</li>
            <li>Send marketing and promotional communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Monitor usage and trends</li>
            <li>Prevent fraud and protect against criminal activity</li>
          </ul>
        </section>

        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Disclosure of Your Information</h4>
          <p>We may share information in the following cases:</p>
          <ul>
            <li><strong>By Law or to Protect Rights:</strong> Legal obligations or protection of rights.</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition.</li>
            <li><strong>Third-Party Service Providers:</strong> Vendors who work on our behalf.</li>
            <li><strong>Marketing Communications:</strong> With your consent for marketing.</li>
            <li><strong>Tour Partners:</strong> Hotels, airlines, guides, etc.</li>
          </ul>
        </section>

        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Security of Your Information</h4>
          <p>
            We use administrative, technical, and physical security measures to protect your personal
            information. While we strive to use industry standards (SSL, PCI-compliant processors),
            absolute security cannot be guaranteed.
          </p>
        </section>

        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Your Privacy Rights</h4>
          <ul>
            <li><strong>Access:</strong> Request a copy of personal info we hold.</li>
            <li><strong>Correction:</strong> Request correction of inaccurate info.</li>
            <li><strong>Deletion:</strong> Request deletion of personal info.</li>
            <li><strong>Opt-Out:</strong> Unsubscribe from marketing at any time.</li>
            <li><strong>Data Portability:</strong> Request data in machine-readable format.</li>
          </ul>
        </section>

        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Cookies and Tracking Technologies</h4>
          <p>
            We use cookies and tracking technologies to monitor activity. You can refuse cookies, but
            some parts of our site may not work properly without them.
          </p>
        </section>

        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Third-Party Websites</h4>
          <p>
            Our site may contain links to third-party websites. We are not responsible for their privacy
            practices. Please review their policies when you visit them.
          </p>
        </section>

        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Children's Privacy</h4>
          <p>
            Our services are not intended for individuals under 18. We do not knowingly collect data from
            children. If you believe we have, contact us immediately.
          </p>
        </section>

        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Changes to This Policy</h4>
          <p>
            We may update this Privacy Policy periodically. Changes will be posted here with an updated
            "Last Updated" date.
          </p>
        </section>

        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Contact Us</h4>
          <p>If you have any questions, please contact us at:</p>
          <address>
            <strong>The Journey Loop</strong><br />
            The Journey Loop, Bahria Town<br />
            Lahore, 54000<br />
            Email: info@thejourneyloop.com<br />
            Phone: +92 (302) 671-6764
          </address>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
