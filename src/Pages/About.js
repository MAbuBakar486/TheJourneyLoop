import React, { useEffect, useState } from 'react';
import '../Styles/About.css';  // using SCSS (you can convert to CSS) 
import CountUp from 'react-countup';
import classNames from 'classnames';
import { Fade } from "react-awesome-reveal";
import { Link } from 'react-router-dom';
import { Slide, Zoom } from 'react-awesome-reveal';

// const stats = [
//   { value: 100, suffix: '+', label: 'Premium Vehicles' },
//   { value: 50, suffix: '+', label: 'Destinations' },
//   { value: 10000, suffix: '+', label: 'Happy Customers' },
//   { value: 5, suffix: '+', label: 'Years Experience' },
// ];

// const values = [
//   {
//     title: 'Safety First',
//     description: 'All our vehicles undergo rigorous safety checks and maintenance to ensure your peace of mind.',
//     iconClass: 'fas fa-shield-alt',
//   },
//   {
//     title: 'Customer Care',
//     description: '24/7 customer support and personalized service to make your journey memorable.',
//     iconClass: 'fas fa-headset',
//   },
//   {
//     title: 'Innovation',
//     description: 'Latest technology and modern fleet to provide you with the best travel experience possible.',
//     iconClass: 'fas fa-lightbulb',
//   },
//   {
//     title: 'Reliability',
//     description: 'Punctual service and dependable vehicles that get you to your destination on time, every time.',
//     iconClass: 'fas fa-handshake',
//   },
// ];

// const team = [
//   {
//     name: 'Hassan Ahmed',
//     role: 'Founder & CEO',
//     description: '10+ years in travel industry, passionate about creating exceptional travel experiences.',
//   },
//   {
//     name: 'Sarah Khan',
//     role: 'Operations Manager',
//     description: 'Expert in logistics and customer service, ensuring smooth operations across all services.',
//   },
//   {
//     name: 'Ahmed Ali',
//     role: 'Fleet Manager',
//     description: 'Automotive specialist ensuring all vehicles meet the highest standards of quality and safety.',
//   },
// ];

// const About = () => {
//   return (
//     <div className="about-page">

//       {/* Hero / Banner */}
//       <section className="hero-section text-center d-flex align-items-center justify-content-center">
//         <div className="overlay"></div>
//         <div className="hero-content container">
//           <h1 className="hero-title">Your Journey Starts Here</h1>
//           <p className="hero-subtitle">
//             Founded with a passion for travel and adventure, Hassan Travel Agency has been creating unforgettable experiences for travelers around the world. We combine premium services, expert local knowledge, and personalized attention to make every journey extraordinary.
//           </p>
//         </div>
//       </section>

//       {/* Stats Section */}
// <section className="stats-section py-5">
//   <div className="container">
//     <div className="row text-center">
//       {stats.map((stat, index) => (
//         <div key={index} className="col-md-3 col-sm-6 mb-4">
//           <h3 className="stat-value">
//             <CountUp
//               end={stat.value}
//               duration={2}
//               delay={0.3}
//               suffix={stat.suffix}
//             />
//           </h3>
//           <p className="stat-label">{stat.label}</p>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>


//       {/* Our Story Section */}
//       <section className="story-section py-5">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-6">
//               <h2 className="section-heading">Our Story</h2>
//               <p className="story-text">
//                 Hassan Travel Agency was born from a simple belief that travel should be more than just getting from point A to point B. It should be an experience that enriches your life, broadens your horizons, and creates memories that last a lifetime.
//               </p>
//               <p className="story-text">
//                 Starting as a small car rental service in Sialkot, we’ve grown into a comprehensive travel agency offering premium car rentals, curated tour packages, and reliable courier services. Our success is built on trust, quality, and an unwavering commitment to customer satisfaction.
//               </p>
//               <button className="btn btn-primary">Start Your Journey</button>
//             </div>
//             <div className="col-md-6">
//               <div className="story-image-wrap">
//                 <img
//                   className="story-image img-fluid rounded"
//                   src="https://preview--wheels-and-wanderlust.lovable.app/assets/hero-travel-destinations-3BercFGM.jpg"
//                   alt="Our Story"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Our Values */}
// <section className="values-section py-5 bg-light">
//   <div className="container text-center">
//     <h2 className="section-heading">Our Values</h2>
//     <p className="section-subheading mb-5">
//       We’re driven by these core values to deliver an extraordinary experience every time.
//     </p>
//     <div className="row justify-content-center g-4">
//       {values.map((v, idx) => (
//         <div key={idx} className="col-md-6 col-lg-3">
//           <div className="value-card-modern p-4 h-100 shadow-sm rounded-4 bg-white">
//             <div className="icon-wrapper mb-3">
//               <i className={`${v.iconClass} value-icon`}></i>
//             </div>
//             <h5 className="fw-semibold">{v.title}</h5>
//             <p className="text-muted small mt-2">{v.description}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>


// {/* Meet Our Team */}
// <section className="team-section py-5 bg-white">
//   <div className="container text-center">
//     <h2 className="section-heading">Meet Our Team</h2>
//     <p className="section-subheading mb-5">
//       A passionate team committed to making your travel dreams come true.
//     </p>
//     <div className="row justify-content-center g-4">
//       {team.map((member, idx) => (
//         <div key={idx} className="col-md-6 col-lg-4">
//           <div className="team-card-modern p-4 h-100 text-start rounded-4 shadow-sm bg-light">
//             <div className="team-initials mb-3">
//               {member.name.split(' ').map(n => n[0]).join('')}
//             </div>
//             <h5 className="fw-bold mb-1">{member.name}</h5>
//             <p className="text-primary small fw-semibold mb-2">{member.role}</p>
//             <p className="text-muted small">{member.description}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>


//       {/* CTA / Footer Hero */}
//       <section className="footer-cta text-center py-5">
//         <div className="container">
//           <h2 className="cta-title">Ready to Start Your Adventure?</h2>
//           <p className="cta-subtitle">
//             Join thousands of satisfied customers who trust Hassan Travel Agency for their journeys. Let us help you create memories that will last a lifetime.
//           </p>
//           <button className="btn btn-light">Book Your Trip</button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;

const testimonials = [
  {
    name: "Johanna Doe",
    title: "Brandname CEO",
    avatar: 'https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png',
    text: "Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimoting terminated day everything"
  },
  {
    name: "Guy Hawkins",
    title: "founder @ google",
    avatar: 'https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png',
    text: "Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimoting terminated day everything"
  },
  {
    name: "Robert Fox",
    title: "founder @ google",
    avatar: 'https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png',
    text: "Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimoting terminated day everything"
  }
];

const values = [
  {
    title: 'Safety First',
    description: 'We prioritize the safety and well-being of our clients by delivering solutions that meet the highest industry standards and ensure long-term protection for homes and businesses.',
    iconClass: 'fas fa-shield-alt',
  },
  {
    title: 'Customer Care',
    description: 'We are committed to exceptional service, offering professional guidance, transparent communication, and tailored energy solutions to meet every client’s unique needs.',
    iconClass: 'fas fa-headset',
  },
  {
    title: 'Innovation',
    description: 'We embrace the latest technologies in insulation, renewable energy, and heating systems to deliver smarter, greener, and more efficient solutions.',
    iconClass: 'fas fa-lightbulb',
  },
  {
    title: 'Reliability',
    description: 'From consultation to project completion, we stand by our promise of dependable service, on-time delivery, and consistent quality you can trust.',
    iconClass: 'fas fa-handshake',
  },
];

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleActive = (idx) => {
    setActiveIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      {/* Hero / Banner */}
      <section className="hero-section1 text-center d-flex align-items-center justify-content-center">
        <div className="overlay"></div>
        <div className="hero-content container">
          <h1 className="hero-title">About Us</h1>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <div className="stat-card shadow-sm rounded-4 p-4">
                <h2 className="stat-value">4B+</h2>
                <p className="stat-label">AI Avatars Generated</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-card shadow-sm rounded-4 p-4">
                <h2 className="stat-value">400M+</h2>
                <p className="stat-label">User Interactions</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-card shadow-sm rounded-4 p-4">
                <h2 className="stat-value">190+</h2>
                <p className="stat-label">Countries Reached</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-card shadow-sm rounded-4 p-4">
                <h2 className="stat-value">4.9</h2>
                <p className="stat-label">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="our-story-section py-5">
        <div className="container">
          <h2 className="fw-bold mb-4" style={{color:"#0C3A2E"}}>
            JOurney
          </h2>
          <div className="row">
            <div className="col-12">
              <div className="our-story-content px-4 px-md-5">
                <p>
                  Our story began with a shared passion for innovation and a desire to create something truly impactful.
                  From humble beginnings, we’ve grown into a dynamic team committed to pushing boundaries and delivering value.
                </p>
                <p>
                  Every step of our journey has been driven by curiosity, collaboration, and a relentless pursuit of excellence.
                  We believe in crafting experiences that inspire and empower, while staying true to our core values.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row align-items-center">
          {/* Right Column */}
          <div className="col-md-6 text-center">
            <img src='https://travelwithzunair.pk/assets/images/about/Image-3.webp' alt="Travel Van" className="img-fluid rounded shadow" />
          </div>
          {/* Left Column */}
          <div className="col-md-6 mt-4 mb-4">
            <h2 className="fw-bold mb-4" style={{color:"#0C3A2E"}}>
              Our Mission
            </h2>
            <p className="text-muted">
              Experience worry-free adventures with our trusted agency, where over 80% of our customers return — thanks to our uncompromising standards, seamless service, and commitment to listening to your feedback. Discover exceptional planning and unforgettable travel experiences, tailored just for you.
            </p>
            <p className="text-muted">
              Experience worry-free adventures with our trusted agency, where over 80% of our customers return — thanks to our uncompromising standards, seamless service, and commitment to listening to your feedback. Discover exceptional planning and unforgettable travel experiences, tailored just for you.
            </p>
            <a href="/destinations" className="btn btn-primary btn-modern fw-bold px-4 py-2 mt-3 btn-modern">
              Explore Destinations <i className="bi bi-arrow-up-right ms-2 mb-4"></i>
            </a>
          </div>


        </div>
      </div>






      {/* SERVICES */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <span className="badge bg-light text-primary px-3 py-2 mb-2">Our Services</span>
          <h2 className="fw-bold" style={{color:"#0C3A2E"}}><Fade>Comprehensive Energy Solutions</Fade></h2>
          <Zoom>
            <p className="text-muted mb-5">
              From insulation to renewable energy, we provide complete energy efficiency solutions backed Under linked by the UK Government's ECO4 scheme.
            </p>
          </Zoom>

          <Fade>
            <div className="row g-4 justify-content-center">
              {/* Submission Administrator */}
              <div className="col-md-5">
                <div className="service-card h-100 p-4 text-start">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="icon-box">
                      <i className="bi bi-person-badge-fill"></i>
                    </div>
                    <span className="badge bg-primary-subtle text-primary">Core Service</span>
                  </div>
                  <h5 className="fw-bold">Submission Administrator</h5>
                  <p className="text-muted">
                    Ensuring timely and accurate submissions of all project-related documents.
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li>✅ Document Preparation</li>
                    <li>✅ Accurate Filing</li>
                    <li>✅ Deadline Management</li>
                    <li>✅ Stakeholder Coordination</li>
                  </ul>
                  <div className="star-divider d-flex align-items-center justify-content-center my-3">
                    <span className="star mx-2">★</span>
                    <span className="line"></span>
                    <span className="star mx-2">★</span>
                  </div>

                </div>
              </div>

              {/* Project Handling */}
              <div className="col-md-5">
                <div className="service-card h-100 p-4 text-start">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="icon-box">
                      <i className="bi bi-diagram-3-fill text-success"></i>
                    </div>
                    <span className="badge bg-success-subtle text-success">Management</span>
                  </div>
                  <h5 className="fw-bold">Project Handling</h5>
                  <p className="text-muted">
                    Comprehensive project oversight to ensure smooth execution from start to finish.
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li>✅ Task Delegation</li>
                    <li>✅ Progress Monitoring</li>
                    <li>✅ Risk Management</li>
                    <li>✅ Efficient Delivery</li>
                  </ul>
                  <div className="star-divider d-flex align-items-center justify-content-center my-3">
                    <span className="star mx-2">★</span>
                    <span className="line"></span>
                    <span className="star mx-2">★</span>
                  </div>
                </div>
              </div>
            </div>
          </Fade>

          <div className="mb-4 mt-4"></div>

          <Fade>
            <div className="row g-4 justify-content-center">
              {/* Building Layout Expertise */}
              <div className="col-md-5">
                <div className="service-card h-100 p-4 text-start">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="icon-box">
                      <i className="bi bi-building-fill"></i>
                    </div>
                    <span className="badge bg-info-subtle text-info">Expertise</span>
                  </div>
                  <h5 className="fw-bold">Building Layout Expertise</h5>
                  <p className="text-muted">
                    Professional planning and layout design tailored for efficiency and safety.
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li>✅ Structural Planning</li>
                    <li>✅ Optimized Layouts</li>
                    <li>✅ Space Utilization</li>
                    <li>✅ Modern Design Standards</li>
                  </ul>
                  <div className="star-divider d-flex align-items-center justify-content-center my-3">
                    <span className="star mx-2">★</span>
                    <span className="line"></span>
                    <span className="star mx-2">★</span>
                  </div>
                </div>
              </div>

              {/* Compliance Expertise */}
              <div className="col-md-5">
                <div className="service-card h-100 p-4 text-start">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="icon-box">
                      <i className="bi bi-shield-check text-warning"></i>
                    </div>
                    <span className="badge bg-warning-subtle text-warning">Trusted</span>
                  </div>
                  <h5 className="fw-bold">Compliance Expertise</h5>
                  <p className="text-muted">
                    Ensuring adherence to regulations, legal standards, and safety protocols.
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li>✅ Regulatory Compliance</li>
                    <li>✅ Safety Standards</li>
                    <li>✅ Risk Assessment</li>
                    <li>✅ Legal Documentation</li>
                  </ul>
                  <div className="star-divider d-flex align-items-center justify-content-center my-3">
                    <span className="star mx-2">★</span>
                    <span className="line"></span>
                    <span className="star mx-2">★</span>
                  </div>
                </div>
              </div>
            </div>
          </Fade>

        </div>
      </section>


      <div className="container py-5">
        <div className="row align-items-center">
          {/* Left Column */}
          <div className="col-md-6 mb-4">
            <h2 className="fw-bold mb-4" style={{color:"#0C3A2E"}}>
              Confidence In Every Kilometer – Why Our Travelers Keep Coming Back!
            </h2>
            <p className="text-muted">
              Experience worry-free adventures with our trusted agency, where over 80% of our customers return — thanks to our uncompromising standards, seamless service, and commitment to listening to your feedback. Discover exceptional planning and unforgettable travel experiences, tailored just for you.
            </p>
            <p className="text-muted">
              Experience worry-free adventures with our trusted agency, where over 80% of our customers return — thanks to our uncompromising standards, seamless service, and commitment to listening to your feedback. Discover exceptional planning and unforgettable travel experiences, tailored just for you.
            </p>
            <a href="/destinations" className="btn btn-primary btn-modern fw-bold px-4 py-2 mt-3">
              Explore Destinations <i className="bi bi-arrow-up-right ms-2 mb-4"></i>
            </a>
          </div>

          {/* Right Column */}
          <div className="col-md-6 text-center">
            <img src='https://travelwithzunair.pk/assets/images/about/Image-3.webp' alt="Travel Van" className="img-fluid rounded shadow" />
          </div>
        </div>
      </div>

      <section className="values-section py-5 bg-light">
        <div className="container text-center">
          <h2 className="section-heading fw-bold" style={{color:"#0C3A2E"}}><Fade>Our Values</Fade></h2>
          <p className="section-subheading mb-5" style={{color:"black"}}>
            We’re driven by these core values to deliver an extraordinary experience every time.
          </p>
          <Zoom>
            <div className="row justify-content-center g-4">
              {values.map((v, idx) => (
                <div key={idx} className="col-md-6 col-lg-3">
                  <div
                    className={`value-card-modern p-4 h-100 shadow-sm rounded-4 bg-white ${activeIndex === idx ? 'active' : ''}`}
                    onClick={() => toggleActive(idx)}
                  >
                    <div className="icon-wrapper mb-3">
                      <i className={`${v.iconClass} value-icon`}></i>
                    </div>
                    <h5 className="fw-semibold">{v.title}</h5>
                    <p className="text-muted small mt-2">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Zoom>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonials py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-5" style={{color:"#0C3A2E"}}>What Customers say about Us</h2>

          <div className="row justify-content-center g-4">
            {testimonials.map((item, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm p-4 h-100">
                  <img src={item.avatar} alt={item.name} className="rounded-circle mb-3 avatar" />
                  <h6 className="fw-bold">{item.name}</h6>
                  <p className="text-muted small mb-2">{item.title}</p>
                  <p className="text-muted">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* See All Reviews Link */}
          <div
            className="see-all-link mt-4"
            onClick={() =>
              window.open("https://www.trustpilot.com/review/pgs-website.vercel.app", "_blank")
            }
          >
            See all Reviews
          </div>
        </div>
      </section>


      {/* Blog Section */}
      {/* <section className="blog-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">
            From Pixels to Personality: Our AI Blog
          </h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="blog-card rounded-4 shadow-sm overflow-hidden">
                <img
                  src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/f3/a1/36.jpg"
                  alt="blog"
                  className="img-fluid"
                />
                <div className="p-4">
                  <h5>Top 7 AI Avatar Styles You Need to Try in 2025</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="blog-card rounded-4 shadow-sm overflow-hidden">
                <img
                  src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/f3/a1/36.jpg"
                  alt="blog"
                  className="img-fluid"
                />
                <div className="p-4">
                  <h5>How to Make Your Profile Picture Stand Out Online</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="blog-card rounded-4 shadow-sm overflow-hidden">
                <img
                  src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/f3/a1/36.jpg"
                  alt="blog"
                  className="img-fluid"
                />
                <div className="p-4">
                  <h5>The Future of Digital Identity and AI Creativity</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="cta-section py-5 text-center">
        <div className="container rounded-4 p-5 shadow">
          <h2 className="mb-4">Ready to Create Your AI Avatar?</h2>
          <button className="btn btn-primary px-5 py-2">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;