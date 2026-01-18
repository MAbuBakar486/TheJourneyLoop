import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import "../Styles/Home.css";
import Clients from "../Widgets/clients";
import { FaStar, FaClock, FaGlobeAmericas, FaComments, FaPiggyBank, FaCalendarAlt } from "react-icons/fa";
// import { FaHeart, FaCalendarAlt, FaStar, FaUsers } from "react-icons/fa";


const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");

  const cityImages = {
    col1: [
      'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/f3/a1/36.jpg',
      'https://nexusideaspk.com/wp-content/uploads/2024/12/Swat-Valley.webp',
    ],
    col2: [
      'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/f3/a1/36.jpg',
      'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/31/aa/1c.jpg',
      'https://pak-tours.com/wp-content/uploads/2017/05/1ea1566ffd5e14587d68263c8fe0dc5e-600x400.jpg',
    ],
    col3: [
      'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/f3/a1/36.jpg',
      'https://nexusideaspk.com/wp-content/uploads/2024/12/Swat-Valley.webp',
      'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/31/aa/1c.jpg',
    ]
  };

  const blogs = [
    {
      img: "https://i.brecorder.com/primary/2025/03/2405055424e1b34.jpg",
      title: "Experience the iconic Times Square ball drop or a scenic river cruise.",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Shangrila_resort_skardu.jpg",
      title: "Marvel at extravagant displays near Burj Khalifa and enjoy lavish parties.",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/7/70/Neeulm_Valley_AJK_%28Arang_Kel%29.jpg",
      title: "Revel in riverside festivities and rooftop views of the fireworks.",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Karachi_Port_Trust_Building-1.jpg",
      title: "8 Amazing Places to Celebrate New Year 2024.",
    },
    {
      img: "https://cdn-blog.zameen.com/blog/wp-content/uploads/2020/01/Cover-29-01.jpg",
      title: "Book a hotel with Eiffel Tower views for a romantic stay.",
    },
  ];

  const items = [
    {
      icon: <FaGlobeAmericas size={40} />,
      title: "Every destination",
      text: "We can plan your holidays across the globe. Confidently explore SA, Australia and the world.",
    },
    {
      icon: <FaComments size={40} />,
      title: "Expert advice",
      text: "We’ve been travel experts for over 60 years. Our consultants can book every element of your trip.",
    },
    {
      icon: <FaPiggyBank size={40} />,
      title: "Member savings",
      text: "Book select holidays and become an tripmate member, unlocking exclusive offers and discounts.",
    },
    {
      icon: <FaCalendarAlt size={40} />,
      title: "Flexible booking",
      text: "Choose how you want to plan your trip, Book online, in-store and by phone with our local consultants.",
    },
  ];

  const deals = [
    {
      id: 1,
      title: "Kashmir, Gilgit-Baltistan",
      city: "Kashmir",
      discount: "30% off",
      days: "7 days and 6 nights",
      flight: "Return international flights*",
      date: "6 Mar - Nov 2025",
      bookBy: "30 Oct 2025",
      rating: 4.5,
      oldPrice: "20000",
      newPrice: "16,595",
      img: "https://upload.wikimedia.org/wikipedia/commons/7/70/Neeulm_Valley_AJK_%28Arang_Kel%29.jpg",
    },
    {
      id: 2,
      title: "Islamabad, ICT",
      city: "Islamabad",
      discount: "20% off",
      days: "3 days and 2 nights",
      flight: "Free accommodation and touring",
      date: "Mar - Apr 2026",
      bookBy: "16 Mar 2025",
      rating: 4.5,
      oldPrice: "7000",
      newPrice: "4000",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/King_Faisal_Mosque.jpg/1200px-King_Faisal_Mosque.jpg",
    },
    {
      id: 3,
      title: "Lahore, PK",
      city: "Lahore",
      discount: "40% off",
      days: "3days and 2 nights",
      flight: "Last minute sale - save 500 pp",
      date: "Aug - Dec 2026",
      bookBy: "24 Jul 2026",
      rating: 4.5,
      oldPrice: "5000",
      newPrice: "3000",
      img: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Badshahi_Mosquee%2C_Lahore.jpg",
    },
  ];

  const steps = [
    {
      title: "Choose",
      desc: "Select your ride type and destination details",
      icon: "👆",
    },
    {
      title: "Book",
      desc: "Pick date and time and enter pickup location",
      icon: "📅",
    },
    {
      title: "Pay",
      desc: "Pay using debit, credit, or cash to driver",
      icon: "💳",
    },
    {
      title: "Ride",
      desc: "Travel with professional drivers on best routes",
      icon: "🚖",
    },
  ];

  const trustData = [
    {
      title: "Local Expertise with a Friendly Touch",
      desc: "We have expertise in serving the specific transportation requirements of residents in the Reading area. Any destination within Reading's urban and rural areas is accessible through our experienced drivers, who create direct routes according to your needs. Your Taxi in Reading operates a reliable service that lets you reach all locations precisely when scheduled.",
      icon: "🤝",
    },
    {
      title: "Competitive Pricing",
      desc: "The Praise Cars policy states that exceptional service as a Reading taxi does not require additional expenses when compared to other options. Customers experience sincere pricing transparency that eliminates any additional fees. Your payment amounts will never surprise you while using our Reading airport taxi service or any short local route.",
      icon: "💷",
    },
    {
      title: "Round-the-Clock Availability",
      desc: "Lazy travelers in Reading can contact Praise Cars to get transportation throughout the day and night. We’ve got you covered. The continuous 24-hour availability of our service ensures transportation access at all times during the day and night. Our service enables both journey pre-bookings .", icon: "⏰",
    },
    {
      title: "Safe and Comfortable Journeys",
      desc: "The security of your well-being stands as our main organizational concern. Each taxi in our Reading fleet undergoes scheduled maintenance and cleaning, and all operators hold proper licenses and professional certifications. Your journey will be calm because our professional drivers will take care of you.",
      icon: "📍",
    },
  ];

  const testimonials = [
    {
      name: "Ayesha Khan",
      title: "Travel Enthusiast",
      avatar: 'https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png',
      text: "The Journey Loop made our Northern Pakistan trip unforgettable! From Hunza to Skardu, every detail was perfectly planned. I felt confident every step of the way."
    },
    {
      name: "Bilal Ahmed",
      title: "Adventure Seeker",
      avatar: 'https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png',
      text: "Booking with The Journey Loop was smooth and stress-free. Their expert guidance and flexible options made exploring Pakistan a breeze!"
    },
    {
      name: "Sara Malik",
      title: "Family Traveler",
      avatar: 'https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png',
      text: "Our family had the most amazing experience touring Pakistan. The Journey Loop’s attention to detail and local knowledge gave us total confidence."
    }
  ];


  const cities = ["All", ...new Set(deals.map((d) => d.city))];

  // Filter based on selected tag or search
  const filteredDeals = deals.filter(
    (d) =>
      (selectedCity === "All" || d.city === selectedCity) &&
      d.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay" />

        <div className="container hero-inner">
          <div className="hero-text">
            <h1 className="hero-title">
              Lets Explore Pakistan
              <br />
              <span className="hero-sub">Your Adventure Awaits</span>
            </h1>

            <p className="discount">GET 30% DISCOUNT</p>

            <p className="hero-desc">
              Explore unforgettable journeys with our expertly crafted tours, city drives, and customized trips. Discover hidden gems, experience local culture, and make every adventure truly memorable.
            </p>


            <div className="hero-buttons">
              <button className="btn btn-outline-secondary text-white  me-3" onClick={() => window.location.href = 'https://wa.me/923026716464'} target="_blank">Contact Support</button>
              <button
                className="btn btn-primary btn-modern"
                onClick={() => window.location.href = '/Contactus/'}
              >
                Send us a Message
              </button>
            </div>
          </div>
        </div>

        {/* Bottom-left rounded panel */}
        <div className="floating-panel">
          <div className="panel-inner container-fluid">
            <div className="row gx-3 align-items-start">

              {/* Northern Pakistan */}
              <div className="col-12 col-md-6 panel-item mb-3 mb-md-0">
                <div className="num-and-text d-flex align-items-start">
                  <div className="num-badge me-3">01</div>
                  <div className="panel-text">
                    <div className="panel-title">Northern Pakistan</div>
                    <div className="panel-sub">Majestic Mountains & Scenic Valleys</div>
                    <div className="panel-desc d-none d-md-block">
                      Explore the breathtaking landscapes of Northern Pakistan, including Hunza, Skardu, and Murree. Experience pristine valleys, majestic peaks, and unforgettable adventures.
                    </div>
                  </div>
                </div>
              </div>

              {/* Southern Pakistan */}
              <div className="col-12 col-md-6 panel-item">
                <div className="num-and-text d-flex align-items-start">
                  <div className="num-badge me-3">02</div>
                  <div className="panel-text">
                    <div className="panel-title">Southern Pakistan</div>
                    <div className="panel-sub">Beautiful Beaches & Coastal Escapes</div>
                    <div className="panel-desc d-none d-md-block">
                      Discover Pakistan’s stunning southern coast, including Karachi and Gwadar. Relax on pristine beaches, explore vibrant coastal cities, and enjoy unforgettable seaside adventures.
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>


      <section className="why-trust py-5">
        <div className="container">
          <h2 className="text-center section-title mb-4">
            Why Our Customers Trust Us
          </h2>

          <div className="row g-4">
            {trustData.map((item, index) => (
              <div key={index} className="col-lg-6 col-md-6 col-sm-12">
                <div className="trust-card">
                  <div className="trust-icon">{item.icon}</div>
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="best-deals container my-5">
        {/* Top heading + search */}
        <div className="row align-items-center mb-4">
          <div className="col-md-6">
            <h2 className="section-title" style={{ fontFamily: "Playfair Displays" }}>Best holiday deals</h2>
          </div>
          <div className="col-md-6 d-flex justify-content-md-end justify-content-center mt-3 mt-md-0">
            <div className="search-bar d-flex align-items-center">
              <input
                type="text"
                placeholder="Search your next city"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="search-btn">Search</button>
            </div>
          </div>
        </div>

        {/* Filter tags */}
        <div className="tags mb-5 text-center text-md-start">
          {cities.map((city) => (
            <button
              key={city}
              className={`tag-btn ${selectedCity === city ? "active" : ""
                }`}
              onClick={() => setSelectedCity(city)}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Deals row */}
        <div className="row g-4">
          {filteredDeals.map((deal) => (
            <div className="col-lg-4 col-md-6" key={deal.id}>
              <div className="deal-card shadow-sm h-100">
                <div className="img-wrapper">
                  <img src={deal.img} alt={deal.title} className="img-fluid rounded-top" />
                  <div className="discount-badge">{deal.discount}</div>
                </div>
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3">{deal.title}</h5>
                  <ul className="list-unstyled small text-muted mb-3">
                    <li><FaClock className="me-2" /> {deal.days}</li>
                    <li><span className="me-2">✈️</span> {deal.flight}</li>
                    <li><FaCalendarAlt className="me-2" /> {deal.date}</li>
                    <li><FaClock className="me-2" /> Book by {deal.bookBy}</li>
                  </ul>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="text-warning fw-bold">
                      <FaStar className="me-1" />
                      {deal.rating}
                    </div>
                    <div className="text-end">
                      <small className="text-muted d-block">
                        From <del>{deal.oldPrice}</del>
                      </small>
                      <span className="fw-bold fs-5">{deal.newPrice}</span>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-modern w-100">Enquire Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore button */}
        <div className="text-center mt-5">
          <button className="btn btn-outline-dark explore-btn contact-btn" onClick={() => window.location.href = '/Cities/'}>
            Explore All Cities 
          </button>
        </div>
      </section>

      <section className="how-to-book py-5">
        <div className="container">
          <h2 className="text-center section-title mb-4" style={{ color: "Playfair Display" }}>How to Book Your Ride</h2>
          <p className="text-center text-muted mb-5">
            Book your ride in just four simple steps
          </p>

          <div className="row justify-content-center">
            {steps.map((step, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="step-card">
                  <div className="step-circle">
                    <div className="step-content">
                      <div className="step-icon">{step.icon}</div>
                      <h5>{step.title}</h5>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="container my-5 popular-cities">
        <div className="text-center mb-5">
          <h2 className="section-title" style={{ color: "Playfair Display" }}>Our Trip's Gallery</h2>
          <p className="section-subtitle">
            Explore best city photos below and see the beauty
          </p>
        </div>

        <div className="row g-lg-4 g-md-3 g-2">
          {/* --- Column 1 --- */}
          <div className="col-lg-4 col-md-12">
            <div className="d-flex flex-column gap-4">
              {cityImages.col1.map((img, idx) => (
                <div className="city-box" key={idx}>
                  <img
                    src={img}
                    alt={`City ${idx}`}
                    className="city-img"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* --- Column 2 --- */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex flex-column gap-4">
              {/* Row 1: 2 side-by-side */}
              <div className="image-row two-images">
                <img src={cityImages.col2[0]} alt="City 1" className="city-img" />
                <img src={cityImages.col2[1]} alt="City 2" className="city-img" />
              </div>
              {/* Row 2: single */}
              <div className="image-row">
                <img src={cityImages.col2[2]} alt="City 3" className="city-img" />
              </div>
            </div>
          </div>

          {/* --- Column 3 --- */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex flex-column gap-4">
              {/* Row 1: single */}
              <div className="image-row">
                <img src={cityImages.col3[0]} alt="City 4" className="city-img" />
              </div>
              {/* Row 2: two side-by-side */}
              <div className="image-row two-images">
                <img src={cityImages.col3[1]} alt="City 5" className="city-img" />
                <img src={cityImages.col3[2]} alt="City 6" className="city-img" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SHORT STORY */}

      <section className="short-story py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="story-grid">
                {[
                  "https://www.shutterstock.com/image-photo/car-driving-on-beautiful-road-600nw-2473243119.jpg",
                  "https://www.shutterstock.com/image-photo/car-driving-on-beautiful-road-600nw-2473243119.jpg",
                  "https://res.cloudinary.com/ho5waxsnl/image/upload/c_fit,f_auto,q_auto,w_575/748fzot37uchs6z0a4qm1oj1ffa1",
                  "https://www.shutterstock.com/image-photo/car-driving-on-beautiful-road-600nw-2473243119.jpg"
                ].map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Story ${i + 1}`}
                    className="img-fluid rounded mb-3"
                  />
                ))}
              </div>
            </div>

            <div className="col-md-6 ps-md-5">
              <h2 className="fw-bold mb-3" style={{ color: "#0C3A2E", fontFamily: "Playfair Display" }}>OUR SHORT STORY</h2>
              <p>
                Founded in 2022, <strong>The Journey Loop</strong> was created with a simple belief: travel in Pakistan should be more than just moving from one place to another. It’s about discovering hidden gems, experiencing local culture, and creating memories that last a lifetime.
              </p>
              <p>
                From breathtaking mountain valleys to serene beaches and vibrant city tours, we design every journey to make your adventure truly unforgettable. Join <strong>The Journey Loop</strong> and explore the beauty of Pakistan like never before.
              </p>
              <button
                className="btn btn-primary btn-modern"
                onClick={() => window.location.href = '/about-us/'}
              >
                learn More
              </button>
            </div>
          </div>
        </div>
      </section>



      <section className="confidence-section text-center py-5">
        <div className="container">
          <h2 className="fw-bold mb-5 confidence-title">Book with confidence</h2>
          <div className="row g-4">
            {items.map((item, idx) => (
              <div key={idx} className="col-lg-3 col-md-6">
                <div className="confidence-item px-3">
                  <div className="icon mb-3 text-primary">{item.icon}</div>
                  <h5 className="fw-semibold mb-2">{item.title}</h5>
                  <p className="text-muted small">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>






      {/* TESTIMONIALS */}
      {/* <section className="testimonials py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-5" style={{ color: "#0C3A2E", fontFamily: "Playfair Display" }}>What Customers say about Us</h2>

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

          <div
            className="see-all-link mt-4"
            onClick={() =>
              window.open("https://www.trustpilot.com/review/thejourneyloop.com", "_blank")
            }
          >
            See all Reviews
          </div>
        </div>
      </section> */}

      <Clients />

            <section className="blog-section py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-5 blog-title">Latest travel libraries</h2>

          <div className="row g-4">
            {/* Left large blog */}
            <div className="col-lg-4 col-md-12">
              <div className="card h-100 shadow-sm border-0 blog-main">
                <img
                  src={blogs[0].img}
                  className="card-img-top rounded-4"
                  alt={blogs[0].title}
                />
                <div className="card-body text-start">
                  <p className="fw-semibold mb-0">{blogs[0].title}</p>
                </div>
              </div>
            </div>

            {/* Right grid (2x2 small blogs) */}
            <div className="col-lg-8 col-md-12">
              <div className="row g-4">
                {blogs.slice(1).map((blog, index) => (
                  <div key={index} className="col-md-6 col-sm-12">
                    <div className="card h-100 shadow-sm border-0 blog-small">
                      <img
                        src={blog.img}
                        className="card-img-top rounded-4"
                        alt={blog.title}
                      />
                      <div className="card-body text-start">
                        <p className="fw-semibold mb-0">{blog.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
