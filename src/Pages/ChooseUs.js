import React from "react";
import '../Styles/Choose.css';
import { Link } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";
import { Zoom } from 'react-awesome-reveal';
import CountUp from 'react-countup';
import { Helmet } from "react-helmet-async";
import 'bootstrap/dist/css/bootstrap.min.css';

const stats = [
  { value: 99, suffix: '%', label: 'Happy Travelers', bg: '#ffede7', color: 'text-danger' },
  { value: 5, suffix: '+', label: 'Years of Travel Expertise', bg: '#f2ecff', color: 'text-primary' },
  { value: 350, suffix: '+', label: 'Tours Completed', bg: '#eaf7e8', color: 'text-success' },
  { value: 25, suffix: '+', label: 'Travel Experts', bg: '#e6ebff', color: 'text-primary' },
  { value: 50, suffix: '+', label: 'Destinations Covered', bg: '#e0f9f4', color: 'text-info' },
];


const reasons = [
  {
    icon: "fas fa-users",
    color: "#f5b300",
    title: "Expert Travel Team",
    description:
      "Our skilled travel consultants know Pakistan inside out, helping you plan every trip with precision and confidence for an unforgettable experience.",
  },
  {
    icon: "fas fa-hand-holding-usd",
    color: "#e63946",
    title: "Affordable Packages",
    description:
      "We offer competitive and transparent pricing on all tours and city drives, so you can explore Pakistan’s beauty without worrying about costs.",
  },
  {
    icon: "fas fa-clipboard-check",
    color: "#6f42c1",
    title: "Trusted Quality",
    description:
      "From accommodations to transport and guided tours, we ensure top-notch quality at every step of your journey across Pakistan.",
  },
  {
    icon: "fas fa-headset",
    color: "#2ca58d",
    title: "24/7 Support",
    description:
      "Our dedicated team is always available to answer your questions and provide assistance, so your travel plans go smoothly from start to finish.",
  },
  {
    icon: "fas fa-award",
    color: "#007bff",
    title: "Proven Experience",
    description:
      "Founded in 2022, The Journey Loop has successfully organized hundreds of trips, earning recognition for exceptional service and unforgettable adventures.",
  },
  {
    icon: "fas fa-star",
    color: "#fd7e14",
    title: "Trusted by Travelers",
    description:
      "Our clients rely on us to deliver memorable and safe experiences across Pakistan, creating lifelong memories and repeat journeys.",
  },
];



const teamData = [
  { label: 'Travel Consultants', percent: 40, color: 'purple' },
  { label: 'Tour Guides', percent: 25, color: 'blue' },
  { label: 'Customer Support Team', percent: 15, color: 'indigo' },
  { label: 'Marketing & Sales Team', percent: 10, color: 'orange' },
  { label: 'Operations Managers', percent: 5, color: 'teal' },
  { label: 'Content & Media Team', percent: 5, color: 'pink' },
];


const ChooseUs = () => {
  return (
    <>
      <Helmet>
        <title>Why Choose Us || The Journey Loop</title>
        <meta name="description" content="Free heating, insulation, and solar panel grants across the UK. Transform your home’s energy efficiency today." />
      </Helmet>

      {/* Header Section */}
      <section className="about-header text-center mb-5">
        <div className="header-overlay" style={{ marginTop: "120px" }}>
          <h1>Why Choose Us</h1>
          {/* <p>Home &gt; About Us</p> */}
        </div>
      </section>
<div className="container my-5">
  <div className="row">
    {/* Left Text Section */}
    <div className="col-md-6">
      <h2 className="fw-bold mb-3">Why Choose <span style={{color:"#0C3A2E"}}>The Journey Loop</span></h2>
      <p>
        At <strong ><Link to="/" className="text-decoration-none" style={{color:"#0C3A2E"}}>The Journey Loop</Link></strong>, we specialize in creating unforgettable travel experiences across Pakistan. From the majestic mountains of the north to serene beaches in the south, we handle every detail so you can travel with confidence.
      </p>
      <strong>Our value-added benefits include:</strong>
      <div className="row mt-3">
        <div className="col-6">
          <ul className="list-unstyled">
            <li>• Expertly Curated Tours</li>
            <li>• Flexible & Customized Itineraries</li>
            <li>• Experienced Local Guides</li>
            <li>• Memorable Travel Experiences</li>
          </ul>
        </div>
        <div className="col-6">
          <ul className="list-unstyled">
            <li>• Safe & Reliable Travel</li>
            <li>• Affordable Packages</li>
            <li>• 24/7 Customer Support</li>
            <li>• Insider Access to Hidden Gems</li>
          </ul>
        </div>
      </div>
      <button className="btn btn-primary btn-modern mt-4 mb-4">
        <Link to="/Contactus/" className="text-white text-decoration-none">Plan Your Journey ➔</Link>
      </button>
    </div>

    {/* Right Stats Section */}
    <div className="col-md-6">
      <div className="d-flex flex-wrap justify-content-between">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 mb-3 text-center rounded"
            style={{ backgroundColor: stat.bg, flexBasis: "48%" }}
          >
            <h2 className={`fw-bold ${stat.color}`}>
              <CountUp start={0} end={stat.value} duration={2} suffix={stat.suffix}>
                {({ countUpRef }) => (
                  <span ref={countUpRef} />
                )}
              </CountUp>
            </h2>
            <p className="fw-semibold">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


      <div className="text-center mt-5" style={{ marginBottom: "80px" }}>
        <h6 className="text-success fade-in ">DRIVING SUCCESS WITH EXPERTISE</h6>
        <h2 className="fw-bold mb-5 fade-in delay-1">Team Stats</h2>
      </div>

      <div className="team-stats-section container text-center py-5 d-none d-lg-block">


        <div className="team-stats-circle-container fade-in delay-2">
          <div className="center-circle">
            <div className="main-circle">
              <h3 className="mb-0">25+</h3>
              <p>Experts</p>
            </div>
          </div>

          {/* Connecting lines */}
          <div className="connecting-line line-0" />
          <div className="connecting-line line-1" />
          <div className="connecting-line line-2" />
          <div className="connecting-line line-3" />
          <div className="connecting-line line-4" />
          <div className="connecting-line line-5" />

          {teamData.map((item, index) => (
            <div className={`stat-circle position-${index}`} key={index}>
              <div
                className={`circle-progress ${item.color}`}
                style={{ '--value': item.percent }}
              >
                <div className="circle-inner">
                  <h4>
                    <CountUp end={item.percent} duration={3.5} delay={0.5} />%
                  </h4>
                  <p>{item.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <section className="choose-reasons-section text-center py-5">
        <div className="container">
          <p className="fw-semibold mb-2" style={{ letterSpacing: '1px',color:"#E76F51" }}>
            — LET’S GROW TOGETHER —
          </p>
          <h2 className="fw-bold mb-3" style={{ color: '#0C3A2E', fontSize: '2rem' }}>
            <Fade>Few Reasons to Choose us</Fade>
          </h2>
          <p className="text-muted mb-4" style={{ maxWidth: '700px', margin: '0 auto' }}>
            Our professional teams enable our clients to stay ahead in the game by taking advantage of innovative technologies, tools, and practices. We craft customized solutions precisely designed for your business and operational needs. Some more reasons:
          </p>
          {/* <button className="btn btn-success px-4 py-2 rounded-pill fw-semibold">
                        View Testimonials
                    </button> */}
        </div>
      </section>
            <Zoom>
                    <section className="py-5 reasons-grid-section">
        <div className="container">
          <div className="row g-4">
            {reasons.map((reason, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm p-4">
                  <div className="icon mb-3" style={{ color: reason.color, fontSize: '2rem' }}>
                    <i className={reason.icon}></i>
                  </div>
                  <h5 className="fw-bold" style={{color: '#0C3A2E'}}>{reason.title}</h5>
                  <p className="text-muted">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
            </Zoom>
    </>

  );
};

export default ChooseUs;
