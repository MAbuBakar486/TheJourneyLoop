// ContactPage.jsx
import React,{useState} from "react";
import { db } from "../firebase.js";
import { Helmet } from "react-helmet-async";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Contact.css";


const ContactPage = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    confirm: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.confirm) {
      alert("Please confirm you’re not soliciting paid services.");
      return;
    }

    const fullName = `${formData.firstName} ${formData.lastName}`;

    try {
      await addDoc(collection(db, "Suggestion"), {
        fullName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        createdAt: Timestamp.now(),
      });

      alert("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        confirm: false,
      });
    } catch (error) {
      console.error("Error saving message:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <>
    <Helmet>
  <title>Contact Us | The Journey Loop</title>
  <meta
    name="description"
    content="Get in touch with The Journey Loop for bookings, support or custom trip requests. Reach us via phone, email, or our contact form — we're here 24/7."
  />
</Helmet>

    <div className="contact-page">
      {/* Header */}
      <section className="contact-header py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left text */}
            <div className="col-lg-6">
              <h2 className="fw-bold contact-title" style={{ fontFamily: "Playfair Display" }}>Contact us</h2>
              <p className="lead text-muted">We would love to hear from you.</p>
            </div>

            {/* Right illustration */}
            <div className="col-lg-6 text-center">
              <img
                src="https://img.freepik.com/premium-vector/video-conference-scene-illustration-people-characters-flat-design-concept_9209-4923.jpg"
                alt="Contact Illustration"
                className="header-img img-fluid"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section className="contact-section py-5">
        <div className="container">
          <div className="row g-5">
            {/* Left Form */}
            <div className="col-lg-7">
              <h3>Have a question?</h3>
              <p className="text-muted">
                Please do not fill out this form for any purpose other than
                partnerships. We are not looking for any services at this time.
              </p>
              <form onSubmit={handleSubmit}>
  <div className="row">
    <div className="col-md-6 mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
    </div>
    <div className="col-md-6 mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  <div className="mb-3">
    <input
      type="email"
      className="form-control"
      placeholder="Email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
    />
  </div>

  <div className="mb-3">
    <input
      type="tel"
      className="form-control"
      placeholder="Phone"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <input
      type="text"
      className="form-control"
      placeholder="Subject"
      name="subject"
      value={formData.subject}
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <textarea
      rows="4"
      className="form-control"
      placeholder="Write your message here"
      name="message"
      value={formData.message}
      onChange={handleChange}
    ></textarea>
  </div>

  <div className="form-check mb-3">
    <input
      className="form-check-input"
      type="checkbox"
      id="confirmCheck"
      name="confirm"
      checked={formData.confirm}
      onChange={handleChange}
    />
    <label className="form-check-label small text-muted" htmlFor="confirmCheck">
      I confirm that I am reaching out for a partnership and not soliciting any paid services.
    </label>
  </div>

  <button type="submit" className="btn btn-primary px-4">
    Send Message
  </button>
</form>

            </div>

            {/* Right Info + Map + WhatsApp */}
            <div className="col-lg-5">
              <div className="info-box p-4 shadow-sm rounded">
                <h5 className="fw-bold mb-3">Get in touch</h5>
                <div className="mb-3">
                  <strong>Address:</strong>
                  <br />
                  Plot 491, Cc Block, Bahria Town LHR
                </div>
                <div className="mb-3">
                  <strong>Phone:</strong>
                  <br />
                  <a href="tel:+923026716764" className="text-decoration-none text-black">+92 (302) 6716764</a>
                </div>
                <div className="mb-3">
                  <strong>Email:</strong>
                  <br />
                  <a href="mailto:support@Hassantravel.com" className="text-decoration-none text-black">support@Hassantravel.com</a>
                </div>

                {/* Google Map Embed */}
                <iframe
                  title="office-location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d851.7312853209925!2d74.1870953!3d31.361044900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918ff79c9d317ab%3A0xa766ec0dea422b28!2sHASSAN%20RENT%20A%20CAR%20AND%20TOUR%20AGENCY!5e0!3m2!1sen!2s!4v1759569251507!5m2!1sen!2s"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* WhatsApp Call-to-Action (full width) */}
          <div className="row mt-4">
            <div className="col-12">
              <a
                href="https://wa.me/+923026716764"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-cta d-block text-center"
              >
                💬 Quick response on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default ContactPage;
