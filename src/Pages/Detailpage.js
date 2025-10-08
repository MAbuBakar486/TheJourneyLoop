// TourDetail.jsx
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/TourDetail.css";
import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";
import { Slide, Zoom } from 'react-awesome-reveal';
import { Container, Row, Col, Button, Card } from "react-bootstrap";



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

};



const TourDetail = () => {
    const text = "Frequently Asked Questions".split("");
    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (id) => {
        setOpenQuestion(openQuestion === id ? null : id);
    };

    const [showShare, setShowShare] = useState(false);

    const currentUrl = window.location.href;

    const shareOptions = [
        {
            name: "Facebook",
            icon: "bi bi-facebook",
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        },
        {
            name: "WhatsApp",
            icon: "bi bi-whatsapp",
            url: `https://api.whatsapp.com/send?text=Check%20this%20trip!%20${encodeURIComponent(currentUrl)}`,
        },
        {
            name: "Twitter",
            icon: "bi bi-twitter-x",
            url: `https://twitter.com/intent/tweet?text=Explore%20this%20trip!&url=${encodeURIComponent(currentUrl)}`,
        },
    ];



    return (
        <div className="tour-detail">

            {/* ===== HERO SECTION ===== */}
            <section className="hero-section py-5">
                <Container>
                    <Row className="align-items-center">

                        {/* LEFT SIDE DETAILS */}
                        <Col lg={6} md={12} className="mb-4 mb-lg-0">
                            <div className="hero-text">
                                <span className="badge bg-gradient fw-semibold mb-3">5 Days</span>
                                <h1 className="tour-title mb-2">Tropical Paradise</h1>
                                <p className="text-muted mb-3">
                                    <i className="bi bi-geo-alt-fill text-primary"></i> Maldives &nbsp; | &nbsp;
                                    ⭐ 5 (189 reviews) &nbsp; | &nbsp; 👥 2–4 people
                                </p>
                                <p className="lead text-secondary">
                                    Escape to paradise in the stunning Maldives. Experience pristine white-sand beaches,
                                    crystal-clear turquoise waters, and world-class luxury resorts.
                                </p>
                                <Button className="book-now mt-3">Book Now</Button>
                            </div>
                        </Col>

                        {/* RIGHT SIDE IMAGE GRID */}
                        <Col lg={6} md={12}>
                            <div className="hero-images-grid">
                                <img src="https://nexusideaspk.com/wp-content/uploads/2024/12/Swat-Valley.webp" alt="Maldives" />
                                <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/f3/a1/36.jpg" alt="Maldives" />
                                <img src="https://pak-tours.com/wp-content/uploads/2017/05/1ea1566ffd5e14587d68263c8fe0dc5e-600x400.jpg" alt="Maldives" />
                                <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/f3/a1/36.jpg" alt="Maldives" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* ===== MAIN DETAILS SECTION ===== */}
            <Container className="my-5">
                <Row>
                    {/* LEFT CONTENT */}
                    <Col lg={8} md={12}>

                        <Card className="mb-4 p-4">
                            <h4>Tour Overview</h4>
                            <p>
                                Escape to paradise in the stunning Maldives. Experience pristine
                                white-sand beaches, crystal-clear turquoise waters, and
                                world-class luxury resorts. This tropical getaway offers the
                                perfect blend of relaxation, adventure, and romantic experiences.
                            </p>
                        </Card>

                        <Card className="mb-4 p-4">
                            <h4>Tour Highlights</h4>
                            <ul className="highlights-list">
                                <li>🏡 Stay in an overwater villa with private deck</li>
                                <li>🐬 Sunset dolphin cruise</li>
                                <li>🌊 Water sports: kayaking, paddleboarding</li>
                                <li>🐠 Snorkeling in vibrant coral reefs</li>
                                <li>🍽️ Private beach dinner under the stars</li>
                                <li>💆 Spa treatments with ocean views</li>
                            </ul>
                        </Card>

                        <Card className="mb-4 p-4">
                            <h4>Daily Itinerary</h4>
                            <ol className="itinerary-list">
                                <li><strong>Arrival in Paradise:</strong> Seaplane transfer, welcome cocktail, and villa check-in.</li>
                                <li><strong>Beach & Reef Exploration:</strong> Snorkeling excursion and beach relaxation.</li>
                                <li><strong>Water Sports & Spa:</strong> Morning water activities, afternoon spa treatment.</li>
                                <li><strong>Dolphin Cruise & Dinner:</strong> Sunset dolphin watching and private beach dinner.</li>
                                <li><strong>Departure:</strong> Leisure morning and seaplane transfer back.</li>
                            </ol>
                        </Card>

                        <Card className="p-4">
                            <h4>What's Included</h4>
                            <ul className="included-list">
                                <li>🏖️ 4 nights in luxury overwater villa</li>
                                <li>🍴 All meals and premium beverages</li>
                                <li>✈️ Seaplane transfers</li>
                                <li>🚣 Daily water sports activities</li>
                                <li>🌅 Sunset cruise</li>
                                <li>💑 Couples spa treatment</li>
                            </ul>
                        </Card>
                    </Col>

                    {/* RIGHT SIDEBAR */}
                    <Col lg={4} md={12}>
                        <Card className="p-4 mb-4 price-card text-center">
                            <h6>From</h6>
                            <h2 className="text-success fw-bold">$2,499</h2>
                            <p className="text-muted">per person</p>

                            <hr />
                            <div className="text-start mb-3">
                                <p><strong>Next Departure:</strong> June 1, 2025</p>
                                <p><strong>Duration:</strong> 5 Days</p>
                                <p><strong>Group Size:</strong> 2–4 people</p>
                            </div>

                            <Button className="w-100 mb-3 book-now">Book Now</Button>
                            {/* <Button
                                variant="outline-secondary"
                                className="w-100"
                                onClick={() => setShowShare(!showShare)}
                            >
                                Share
                            </Button> */}

                            {/* Share Popup */}
                            {/* {showShare && ( */}
                                <div className="share-popup mt-3 p-3 text-center">
                                    <h6 className="mb-2">Share this tour</h6>
                                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                                        {shareOptions.map((opt, index) => (
                                            <a
                                                key={index}
                                                href={opt.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="share-icon"
                                                title={`Share on ${opt.name}`}
                                            >
                                                <i className={opt.icon}></i>
                                            </a>
                                        ))}
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(currentUrl);
                                                alert("Link copied to clipboard!");
                                            }}
                                            className="share-icon"
                                            title="Copy link"
                                        >
                                            <i className="bi bi-link-45deg"></i>
                                        </button>
                                    </div>
                                </div>
                            


                            <div className="mt-3 best-price">
                                <p className="small text-muted mb-0">
                                    💰 <strong>Best Price Guarantee</strong> — Found a better
                                    price? We’ll match it and give you 10% off!
                                </p>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <section className="text-center">
                <div className="container">
                    <h1 className="mt-4" style={{ fontFamily: "Playfair Displays" }}>{text.map((char, index) => (
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
            <section className="faq-contact-footer text-center py-5">
                <div className="container">
                    <h4 className="mb-3" style={{ fontFamily: "Playfair Displays" }}><Fade>Still Have Questions?</Fade></h4>
                    <p className="mb-4 text-muted">
                        Our friendly customer support team is here to help you with any questions not covered in our FAQ section.
                    </p>
                    <Zoom>
                        <div className="row justify-content-center">
                            <div className="col-md-3 col-sm-6 mb-4">
                                <div className="contact-box">
                                    <i className="fas fa-phone fa-2x mb-2"></i>
                                    <p><strong>Call Us</strong></p>
                                    <p> <a href='tel:(92) 306-8629918' style={{ textDecoration: "none", color: "#0C3A2E" }}>(92) 306-8629918</a><br />Available 24/7</p>
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

                </div>
            </section>

        </div>
    );
};

export default TourDetail;


