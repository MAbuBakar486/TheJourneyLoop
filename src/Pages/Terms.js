import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../Styles/Privacy.css';  

const TermsOfService = () => {
  return (
    <div className="terms-of-service">
      <div className="container py-5">
        <div className="text-center mb-5">
          <i className="bi bi-file-text fs-1 text-primary"></i>
          <h1 className="fw-bold mt-3" style={{fontFamily:"Playfair Display"}}>Terms of Service</h1>
          <p className="text-muted">Last updated: 03/10/2025</p>
        </div>

        {/* Agreement */}
        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Agreement to Terms</h4>
          <p>
            These Terms of Service constitute a legally binding agreement between you and
            TourVenture (“Company,” “we,” “us,” or “our”), concerning your access to and
            use of our website and services. By accessing or using our services, you agree
            to be bound by these Terms. If you disagree with any part, you may not access
            our services.
          </p>
        </section>

        {/* Booking */}
        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Booking and Payment</h4>
          <p>When you book a tour through our services, the following terms apply:</p>
          <ul>
            <li>All bookings are subject to availability and confirmation</li>
            <li>Prices are subject to change until booking is confirmed</li>
            <li>A deposit may be required to secure your booking</li>
            <li>Full payment is due 30 days before the tour departure date</li>
            <li>Payment must be made in the specified currency</li>
            <li>All prices include taxes unless otherwise stated</li>
            <li>We reserve the right to cancel bookings if payment is not received on time</li>
          </ul>
        </section>

        {/* Cancellation */}
        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Cancellation and Refund Policy</h4>
          <p>Our cancellation policy is as follows:</p>
          <ul>
            <li><strong>More than 30 days before departure:</strong> Full refund minus $50 admin fee</li>
            <li><strong>15–30 days before departure:</strong> 50% refund</li>
            <li><strong>Less than 15 days before departure:</strong> No refund</li>
            <li><strong>No-Shows:</strong> No refund</li>
          </ul>
          <p>
            Cancellations must be submitted in writing via email. Refunds are processed within
            14 business days. We recommend purchasing travel insurance for unforeseen cancellations.
          </p>
        </section>

        {/* Travel Documents */}
        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Travel Documents and Requirements</h4>
          <p>You must ensure that:</p>
          <ul>
            <li>Your passport has at least 6 months validity</li>
            <li>You obtain all necessary visas and permits</li>
            <li>You meet health requirements and vaccinations</li>
            <li>You have adequate travel insurance</li>
            <li>You inform us of any medical or dietary conditions</li>
          </ul>
        </section>

        {/* Modifications */}
        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Tour Modifications and Cancellations by Us</h4>
          <p>We reserve the right to:</p>
          <ul>
            <li>Modify itineraries due to weather, safety, or unforeseen circumstances</li>
            <li>Cancel tours if minimum participants not met (full refund)</li>
            <li>Substitute hotels or services with equal or higher standard</li>
            <li>Change tour guides if necessary</li>
            <li>Cancel tours due to force majeure (natural disasters, pandemics, etc.)</li>
          </ul>
          <p>
            If we cancel, you will receive a full refund or option to transfer to another tour.
          </p>
        </section>

        {/* Liability */}
        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Limitation of Liability</h4>
          <p>
            To the maximum extent permitted by law, TourVenture shall not be liable for indirect,
            incidental, or consequential damages, including loss of data, profits, or goodwill,
            arising from your use of our services. Our total liability will not exceed the amount
            paid for the tour.
          </p>
        </section>

        {/* Insurance */}
        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Travel Insurance</h4>
          <p>
            While some tours may include travel insurance, we strongly recommend purchasing
            comprehensive coverage. The basic insurance may not cover all situations.
          </p>
        </section>

        {/* Conduct */}
        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Conduct and Responsibilities</h4>
          <p>As a participant, you agree to:</p>
          <ul>
            <li>Follow tour guide instructions and local laws</li>
            <li>Respect other participants and local communities</li>
            <li>Take responsibility for your personal belongings</li>
            <li>Not engage in illegal or dangerous behavior</li>
            <li>Arrive on time for activities and departures</li>
          </ul>
        </section>

        {/* IP */}
        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Intellectual Property</h4>
          <p>
            All website content (text, graphics, logos, images, software) is the property of
            TourVenture and protected by copyright and trademark laws. You may not reproduce
            or distribute content without permission.
          </p>
        </section>

        {/* Dispute */}
        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Dispute Resolution</h4>
          <p>
            Any disputes shall first be addressed through good-faith negotiation. If unresolved,
            disputes will be handled by binding arbitration under the American Arbitration Association.
            The arbitration will take place in Travel City, TC, and be conducted in English.
          </p>
        </section>

        {/* Law */}
        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Governing Law</h4>
          <p>
            These Terms shall be governed by the laws of the State of TC, without regard to conflict of law provisions.
          </p>
        </section>

        {/* Changes */}
        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Changes to Terms</h4>
          <p>
            We may update these Terms at any time. Changes are effective upon posting to our website.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-5">
          <h4 className="fw-semibold" style={{color:"#0C3A2E"}}>Contact Information</h4>
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

export default TermsOfService;
