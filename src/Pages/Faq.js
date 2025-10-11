import React, { useState } from 'react';
import "../Styles/Faq.css";
import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";
import { Slide, Zoom } from 'react-awesome-reveal';
import { Helmet } from "react-helmet-async";
import { FaQuestion } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const faqData = [
  {
    category: "General",
    icon: "🌍",
    questions: [
      "How do I book a tour?",
      "Can I customize my trip?",
      "What payment methods do you accept?",
      "Do you offer international tours?",
      "Is transportation included in the packages?",
      "Do I need travel insurance?",
      "What documents are required for booking?",
    ],
  },
  {
    category: "Booking & Cancellation",
    icon: "📅",
    questions: [
      "Can I cancel or reschedule my booking?",
      "Do I get a refund if I cancel?",
      "How early should I book my trip?",
      "Can I book for a group or family?",
      "Do you offer last-minute bookings?",
    ],
  },
  {
    category: "Accommodation",
    icon: "🏨",
    questions: [
      "What type of hotels do you provide?",
      "Is breakfast included in the package?",
      "Can I choose my own hotel?",
      "Do you offer homestays or resorts?",
    ],
  },
  {
    category: "Destinations & Activities",
    icon: "🗺️",
    questions: [
      "What destinations are available?",
      "Do you provide guided tours?",
      "Are adventure activities included?",
      "Can I request a special destination?",
      "Do you organize cultural tours?",
    ],
  },
  {
    category: "Support",
    icon: "📞",
    questions: [
      "How can I contact customer support?",
      "Do you have 24/7 assistance during trips?",
      "What happens if I face issues while traveling?",
    ],
  },
];



const faqAnswers = {
  // === General ===
  "How do I book a tour?":
    "You can book a tour directly through our website or mobile app. Simply choose your destination, select dates, and confirm your booking.",

  "Can I customize my trip?":
    "Yes! We offer fully customizable packages where you can choose hotels, destinations, and activities based on your preference.",

  "What payment methods do you accept?":
    "We accept credit/debit cards, bank transfers, Easypaisa, JazzCash, and PayPal for international customers.",

  "Do you offer international tours?":
    "Yes, we provide both domestic and international tour packages.",

  "Is transportation included in the packages?":
    "Most of our packages include transport. Details will be mentioned in each package description.",

  "Do I need travel insurance?":
    "Travel insurance is optional, but highly recommended for international trips.",

  "What documents are required for booking?":
    "For local trips, a valid CNIC is enough. For international tours, a valid passport and visa are required.",

  // === Booking & Cancellation ===
  "Can I cancel or reschedule my booking?":
    "Yes, you can cancel or reschedule before the deadline mentioned in your booking confirmation.",

  "Do I get a refund if I cancel?":
    "Refunds depend on the package policy. Some bookings may be fully refundable, while others may have cancellation charges.",

  "How early should I book my trip?":
    "We recommend booking at least 2–3 weeks in advance for local trips and 1–2 months for international tours.",

  "Can I book for a group or family?":
    "Absolutely! We provide group and family packages with special discounts.",

  "Do you offer last-minute bookings?":
    "Yes, last-minute bookings are available but depend on seat and hotel availability.",

  // === Accommodation ===
  "What type of hotels do you provide?":
    "We offer 3-star, 4-star, and 5-star hotel options depending on your package.",

  "Is breakfast included in the package?":
    "Yes, most of our packages include breakfast. Some may also include lunch or dinner.",

  "Can I choose my own hotel?":
    "Yes, you can select your preferred hotel if it’s available in the destination.",

  "Do you offer homestays or resorts?":
    "Yes, based on location, we can arrange homestays, resorts, or luxury stays.",

  // === Destinations & Activities ===
  "What destinations are available?":
    "We offer tours across Pakistan including Hunza, Skardu, Swat, Murree, and also international destinations like Dubai, Turkey, and Malaysia.",

  "Do you provide guided tours?":
    "Yes, most of our tours include professional guides for a better experience.",

  "Are adventure activities included?":
    "Some packages include trekking, rafting, paragliding, and other adventure activities. Details are provided in the package description.",

  "Can I request a special destination?":
    "Yes, you can request a custom destination and we’ll create a tailored package for you.",

  "Do you organize cultural tours?":
    "Yes, we offer heritage and cultural tours including historical sites, festivals, and local experiences.",

  // === Support ===
  "How can I contact customer support?":
    "You can reach us via phone, WhatsApp, email, or live chat on our website.",

  "Do you have 24/7 assistance during trips?":
    "Yes, our travel support team is available 24/7 during your trip.",

  "What happens if I face issues while traveling?":
    "Our support team will immediately assist you and resolve any issues regarding transport, accommodation, or activities.",
};



const FaqPage = () => {
  const text = "Frequently Asked Questions".split("");
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | The Journey Loop</title>
        <meta
          name="description"
          content="Answers to common questions about bookings, custom trips, payments, and services at The Journey Loop — your travel partner across Pakistan."
        />
      </Helmet>

      <div className="faq-wrapper">
        {/* Header */}
        <section className="faq-header text-center">
          <div className="container">
            <div className="icon-circle mb-3 mt-4">
              <FaQuestion size={36} style={{ color: '#000000' }} />
            </div>
            <h1 className="mt-4" style={{fontFamily:"Playfair Displays"}}>{text.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.025, type: "spring", stiffness: 500, damping: 30 }}
              >
                {char}
              </motion.span>
            ))}</h1>
            <p>
              <Fade>
                Find answers to common questions about our services. Can’t find what you're looking for?
                Contact our support team anytime.
              </Fade>
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <Fade>
          <section className="faq-section container my-5">
            {faqData.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-5">
                <h5 className="faq-category-title">
                  <span className="faq-icon">{group.icon}</span> {group.category}
                </h5>

                <div className="accordion" id={`accordion-${groupIndex}`}>
                  {group.questions.map((question, questionIndex) => {
                    const id = `q-${groupIndex}-${questionIndex}`;
                    const isOpen = openQuestion === id;

                    return (
                      <div className="accordion-item" key={id}>
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button custom-toggle d-flex justify-content-between align-items-center ${!isOpen ? 'collapsed' : ''}`}
                            type="button"
                            onClick={() => toggleQuestion(id)}
                          >
                            <span>{question}</span>
                            <span className="toggle-icon ms-auto">{isOpen ? '−' : '+'}</span>
                          </button>
                        </h2>
                        <div
                          className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
                        >
                          <div className="accordion-body">
                            <p>{faqAnswers[question] || "Answer coming soon. Please contact our support team for more details."}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        </Fade>

        {/* Contact Footer */}
        <section className="faq-contact-footer text-center py-5">
          <div className="container">
            <h4 className="mb-3" style={{fontFamily:"Playfair Displays"}}><Fade>Still Have Questions?</Fade></h4>
            <p className="mb-4 text-muted">
              Our friendly customer support team is here to help you with any questions not covered in our FAQ section.
            </p>
            <Zoom>
              <div className="row justify-content-center">
                <div className="col-md-3 col-sm-6 mb-4">
                  <div className="contact-box">
                    <i className="fas fa-phone fa-2x mb-2"></i>
                    <p><strong>Call Us</strong></p>
                    <p> <a href='tel:(92)302-6716764' style={{ textDecoration: "none", color:"#0C3A2E" }}>(92) 302-676764</a><br />Available 24/7</p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                  <div className="contact-box">
                    <i className="fas fa-comments fa-2x mb-2"></i>
                    <p><strong>Live Chat</strong></p>
                    <p>Instant support<br />1PM – 10PM</p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                  <div className="contact-box">
                    <i className="fas fa-map-marker-alt fa-2x mb-2"></i>
                    <p><strong>Visit Us</strong></p>
                    <p>Lahore Office<br />Mon–Sat 9AM–6PM</p>
                  </div>
                </div>
              </div>
            </Zoom>

            <div className="mt-4">
              <button className="btn btn-outline-secondary btn-modern me-3">Contact Support</button>
              <button
                className="btn btn-primary btn-modern"
                onClick={() => window.location.href = '/Contactus'}
              >
                Send us a Message
              </button>
            </div>


          </div>
        </section>
      </div>
    </>
  );
};


export default FaqPage;
