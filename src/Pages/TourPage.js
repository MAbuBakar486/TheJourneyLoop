// import React, { useState } from "react";
// import "../Styles/CarRentalPage.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaStar, FaUsers, FaMapMarkerAlt, FaClock, FaCalendarAlt } from "react-icons/fa";

// const TourPage = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [selectedTour, setSelectedTour] = useState(null);
//   const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

//   const tours = [
//     {
//       title: "Dubai Desert Safari & City Tour",
//       location: "Dubai, UAE",
//       duration: "3 Days",
//       rating: 4.9,
//       reviews: 124,
//       maxPeople: 15,
//       highlights: ["Desert Safari", "Burj Khalifa", "+2 more"],
//       nextDate: "15/01/2024",
//       img: "https://preview--wheels-and-wanderlust.lovable.app/assets/cars-showroom-BTcD30uv.jpg",
//     },
//     {
//       title: "Dubai Desert Safari & City Tour",
//       location: "Dubai, UAE",
//       duration: "3 Days",
//       rating: 4.9,
//       reviews: 124,
//       maxPeople: 15,
//       highlights: ["Desert Safari", "Burj Khalifa", "+2 more"],
//       nextDate: "15/01/2024",
//       img: "https://preview--wheels-and-wanderlust.lovable.app/assets/cars-showroom-BTcD30uv.jpg",
//     },
//   ];

//   const handleBook = (tour) => {
//     setSelectedTour(tour);
//     setShowForm(true);
//   };

//   const handleConfirm = () => {
//     alert(`Tour Booked!\n${selectedTour.title}\nName: ${formData.name}\nPhone: ${formData.phone}`);
//     setShowForm(false);
//     setFormData({ name: "", phone: "", message: "" });
//   };

//   return (
//     <>
//     <div className="container my-5">
//         <h5 className="fw-bold m-0 mb-4">Available Tours</h5>
//         <div className="row">
//         {tours.map((tour, idx) => (
//           <div className="col-md-4 mb-4" key={idx}>
//             <div className="tour-card shadow-sm h-100">
//               <img src={tour.img} className="card-img-top" alt={tour.title} />

//               <div className="card-body mx-3 mt-3">
//                 <h5 className="fw-bold">{tour.title}</h5>

//                 <div className="d-flex align-items-center gap-3 text-muted mb-2 small">
//                   <span><FaMapMarkerAlt className="me-1" /> {tour.location}</span>
//                   <span><FaClock className="me-1" /> {tour.duration}</span>
//                 </div>

//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <div className="text-warning fw-bold">
//                     <FaStar className="me-1" />
//                     {tour.rating}
//                     <span className="text-muted ms-1">({tour.reviews})</span>
//                   </div>
//                   <div className="text-muted small">
//                     <FaUsers className="me-1" />
//                     Max {tour.maxPeople}
//                   </div>
//                 </div>

//                 <h6 className="fw-bold mb-2">Highlights:</h6>
//                 <div className="highlights mb-3">
//                   {tour.highlights.map((item, i) => (
//                     <span key={i} className="highlight-pill">{item}</span>
//                   ))}
//                 </div>

//                 <button className="btn book-btn w-100 mb-3" onClick={() => handleBook(tour)}>
//                   Book Tour
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//         <h5 className="fw-bold m-0 mb-4">UpComing Tours</h5>
//       <div className="row">
//         {tours.map((tour, idx) => (
//           <div className="col-md-4 mb-4" key={idx}>
//             <div className="tour-card shadow-sm h-100">
//               <img src={tour.img} className="card-img-top" alt={tour.title} />

//               <div className="card-body mx-3 mt-3">
//                 <h5 className="fw-bold">{tour.title}</h5>

//                 <div className="d-flex align-items-center gap-3 text-muted mb-2 small">
//                   <span><FaMapMarkerAlt className="me-1" /> {tour.location}</span>
//                   <span><FaClock className="me-1" /> {tour.duration}</span>
//                 </div>

//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <div className="text-warning fw-bold">
//                     <FaStar className="me-1" />
//                     {tour.rating}
//                     <span className="text-muted ms-1">({tour.reviews})</span>
//                   </div>
//                   <div className="text-muted small">
//                     <FaUsers className="me-1" />
//                     Max {tour.maxPeople}
//                   </div>
//                 </div>

//                 <h6 className="fw-bold mb-2">Highlights:</h6>
//                 <div className="highlights mb-3">
//                   {tour.highlights.map((item, i) => (
//                     <span key={i} className="highlight-pill">{item}</span>
//                   ))}
//                 </div>

//                 <div className="calendar-row mb-3">
//                   <FaCalendarAlt className="calendar-icon" />
//                   <div className="calendar-text">
//                     <span className="label">Next:</span>
//                     <span className="date">{tour.nextDate}</span>
//                   </div>
//                 </div>

//                 <button className="btn book-btn w-100 mb-3" onClick={() => handleBook(tour)}>
//                   Book Tour
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showForm && selectedTour && (
//         <div className="overlay">
//           <div className="popup">
//             <h5>Book {selectedTour.title}</h5>
//             <input
//               type="text"
//               className="form-control mb-2"
//               placeholder="Your Name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             />
//             <input
//               type="text"
//               className="form-control mb-2"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//             />
//             <textarea
//               className="form-control mb-2"
//               placeholder="Message"
//               value={formData.message}
//               onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//             />
//             <div className="d-flex justify-content-end gap-2">
//               <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
//               <button className="btn btn-primary" onClick={handleConfirm}>Confirm</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default TourPage;


import React, { useState, useEffect } from "react";
import "../Styles/CarRentalPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaUsers, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Fade, Zoom } from "react-awesome-reveal";

const TourPage = () => {
  const navigate = useNavigate();

  // Tabs
  const [activeTab, setActiveTab] = useState("tours"); // 'tours' or 'custom'

  // Tours + UI states
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: "All", destination: "All", search: "" });
  const [selectedTour, setSelectedTour] = useState(null);
  const [showForm, setShowForm] = useState(false); // booking popup

  // Booking popup form state (separate from custom trip form)
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    cnic: "",
    serviceType: "",
    duration: "",
    message: "",
  });

  // Custom trip form state
  const [customForm, setCustomForm] = useState({
    name: "",
    phone: "",
    cnic: "",
    destination: "",
    category: "",
    duration: "",
    interests: [],
    requirements: "",
  });

  const interestsList = [
    "Adventure",
    "Culture",
    "Food",
    "Shopping",
    "History",
    "Nature",
    "Photography",
    "Nightlife",
    "Museums",
  ];

  const tours = [
    {
      title: "Dubai Desert Safari & City Tour",
      location: "Dubai, UAE",
      duration: "3 Days",
      rating: 4.9,
      reviews: 124,
      maxPeople: 15,
      highlights: ["Desert Safari", "Burj Khalifa", "+2 more"],
      nextDate: "15/01/2024",
      category: ["Group"],
      img: "https://preview--wheels-and-wanderlust.lovable.app/assets/cars-showroom-BTcD30uv.jpg",
    },
    {
      title: "Solo Adventure in Dubai",
      location: "Dubai, UAE",
      duration: "2 Days",
      rating: 4.7,
      reviews: 45,
      maxPeople: 1,
      highlights: ["Desert Safari", "City Tour"],
      nextDate: "20/01/2024",
      category: ["Solo"],
      img: "https://preview--wheels-and-wanderlust.lovable.app/assets/cars-showroom-BTcD30uv.jpg",
    },
    {
      title: "Honeymoon in Paris",
      location: "Paris, France",
      duration: "5 Days",
      rating: 4.9,
      reviews: 80,
      maxPeople: 2,
      highlights: ["Eiffel Tower", "Seine River Cruise"],
      nextDate: "05/02/2024",
      category: ["Honeymoon"],
      img: "https://preview--wheels-and-wanderlust.lovable.app/assets/cars-showroom-BTcD30uv.jpg",
    },
  ];

  // Destinations for filter dropdown
  const destinations = ["All", ...new Set(tours.map((t) => t.location))];

  // Filter logic (note: t.category is an array)
  const filteredTours = tours.filter((t) => {
    const matchCategory =
      filters.category === "All" || t.category.includes(filters.category);
    const matchDestination = filters.destination === "All" || t.location === filters.destination;
    const matchSearch = t.title.toLowerCase().includes(filters.search.toLowerCase());
    return matchCategory && matchDestination && matchSearch;
  });

  useEffect(() => {
    // simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // When booking a tour from the tours list
  const handleBook = (tour) => {
    setSelectedTour(tour);
    // prefill serviceType if single option
    setBookingForm((prev) => ({
      ...prev,
      name: "",
      phone: "",
      cnic: "",
      serviceType: tour.category && tour.category.length === 1 ? tour.category[0] : "",
      duration: "",
      message: "",
    }));
    setShowForm(true);
  };

  const handleBookingChangeDigitsOnly = (field, value, maxLen) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, maxLen);
    setBookingForm((prev) => ({ ...prev, [field]: digitsOnly }));
  };

  const handleConfirmBooking = () => {
    // Simple validation for phone & cnic
    if (bookingForm.phone && bookingForm.phone.length !== 11) {
      alert("Phone must be 11 digits.");
      return;
    }
    if (bookingForm.cnic && bookingForm.cnic.length !== 13) {
      alert("CNIC must be 13 digits.");
      return;
    }

    console.log("Booking Data:", { tour: selectedTour, ...bookingForm });
    setShowForm(false);
    navigate("/success");
  };

  // Custom trip handlers
  const toggleInterest = (interest) => {
    setCustomForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleCustomDigitsOnly = (field, value, maxLen) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, maxLen);
    setCustomForm((prev) => ({ ...prev, [field]: digitsOnly }));
  };

  const handleRequestCustomTrip = () => {
    // Validate phone & cnic if entered
    if (customForm.phone && customForm.phone.length !== 11) {
      alert("Phone must be 11 digits.");
      return;
    }
    if (customForm.cnic && customForm.cnic.length !== 13) {
      alert("CNIC must be 13 digits.");
      return;
    }
    console.log("Custom Trip Request:", customForm);
    alert("Custom trip request submitted (check console).");
    // optionally clear form:
    // setCustomForm({ name: "", phone: "", cnic: "", destination: "", category: "", duration: "", interests: [], requirements: "" });
  };

  return (
    <div className="container" style={{marginTop:"90px",marginBottom:"30px"}}>
      {/* Tabs */}
      <div className="d-flex justify-content-center mb-4" style={{fontFamily:"Playfair Display"}}>
        <div className="btn-group">
          <button
            className={`btn ${activeTab === "tours" ? "btn-primary" : "btn-outline-success"}`} style={{fontFamily:"Playfair Display"}}
            onClick={() => setActiveTab("tours")}
          >
            Available Tours
          </button>
          <button
            className={`btn ${activeTab === "custom" ? "btn-primary" : "btn-outline-success"}`}
            onClick={() => setActiveTab("custom")}
          >
            Custom Trip
          </button>
        </div>
      </div>

      {/* Heading changes with tab */}
      <h2 className="text-center fw-bold mb-4" style={{fontFamily:"Playfair Display"}}>
        {activeTab === "tours" ? "Available Tours" : "Make Own Trip Plan"}
      </h2>

      {/* --- Tours View (with filters) --- */}
      {activeTab === "tours" && (
        <>
          <Fade triggerOnce>
            <div className="row g-2 mb-4 align-items-center">
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  {["All", "Solo", "Group", "Honeymoon", "Family"].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <select
                  className="form-select"
                  value={filters.destination}
                  onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                >
                  {destinations.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by tour name"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
            </div>
          </Fade>

          {/* Tours grid */}
          <div className="row">
            {loading ? (
              Array(3)
                .fill(0)
                .map((_, idx) => (
                  <div className="col-md-4 mb-4" key={idx}>
                    <div className="tour-card shimmer" />
                  </div>
                ))
            ) : filteredTours.length === 0 ? (
              <div className="text-center w-100 py-5">No tours found.</div>
            ) : (
              filteredTours.map((tour, idx) => (
                <div className="col-md-4 mb-4" key={idx}>
                  <Fade triggerOnce>
                    <div className="tour-card shadow-sm h-100">
                      <img src={tour.img} className="card-img-top" alt={tour.title} />
                      <div className="card-body mx-3 mt-3">
                        <h5 className="fw-bold">{tour.title}</h5>

                        <div className="d-flex align-items-center gap-3 text-muted mb-2 small">
                          <span>
                            <FaMapMarkerAlt className="me-1" /> {tour.location}
                          </span>
                          <span>
                            <FaClock className="me-1" /> {tour.duration}
                          </span>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="text-warning fw-bold">
                            <FaStar className="me-1" />
                            {tour.rating}
                            <span className="text-muted ms-1">({tour.reviews})</span>
                          </div>
                          <div className="text-muted small">
                            <FaUsers className="me-1" />
                            Max {tour.maxPeople}
                          </div>
                        </div>

                        <h6 className="fw-bold mb-2">Highlights:</h6>
                        <div className="highlights mb-3">
                          {tour.highlights.map((item, i) => (
                            <span key={i} className="highlight-pill">
                              {item}
                            </span>
                          ))}
                        </div>

                        <button className="btn book-btn w-100 mb-3" onClick={() => handleBook(tour)} style={{color:"white",backgroundColor:"#0C3A2E"}}>
                          Book Tour
                        </button>
                      </div>
                    </div>
                  </Fade>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* --- Custom Trip Form View --- */}
      {activeTab === "custom" && (
        <Fade triggerOnce>
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Create Your Custom Trip</h5>
            <p className="text-muted">
              Tell us your preferences and we'll create a personalized itinerary for you.
            </p>

            <div className="row g-3">
              {/* Name */}
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  value={customForm.name}
                  onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                />
              </div>

              {/* Phone */}
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone (11 digits)"
                  value={customForm.phone}
                  maxLength={11}
                  onChange={(e) => handleCustomDigitsOnly("phone", e.target.value, 11)}
                />
              </div>

              {/* CNIC */}
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="CNIC (13 digits)"
                  value={customForm.cnic}
                  maxLength={13}
                  onChange={(e) => handleCustomDigitsOnly("cnic", e.target.value, 13)}
                />
              </div>

              {/* Preferred Destination */}
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Preferred Destination"
                  value={customForm.destination}
                  onChange={(e) => setCustomForm({ ...customForm, destination: e.target.value })}
                />
              </div>

              {/* Travel Category */}
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={customForm.category}
                  onChange={(e) => setCustomForm({ ...customForm, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  <option value="Solo">Solo</option>
                  <option value="Couple">Couple</option>
                  <option value="Family">Family</option>
                  <option value="Group">Group</option>
                </select>
              </div>

              {/* Duration */}
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={customForm.duration}
                  onChange={(e) => setCustomForm({ ...customForm, duration: e.target.value })}
                >
                  <option value="">Select Duration</option>
                  <option value="1 Day">1 Day</option>
                  <option value="2 Days">2 Days</option>
                  <option value="3 Days">3 Days</option>
                  <option value="1 Week">1 Week</option>
                  <option value="2 Weeks">2 Weeks</option>
                </select>
              </div>

              {/* Interests */}
              <div className="col-12">
                <label className="fw-bold d-block mb-2">Interests (Select all that apply)</label>
                <div className="d-flex flex-wrap gap-3">
                  {interestsList.map((interest) => (
                    <div key={interest} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`interest-${interest}`}
                        checked={customForm.interests.includes(interest)}
                        onChange={() => toggleInterest(interest)}
                      />
                      <label className="form-check-label" htmlFor={`interest-${interest}`}>
                        {interest}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="col-12">
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
                  value={customForm.requirements}
                  onChange={(e) => setCustomForm({ ...customForm, requirements: e.target.value })}
                />
              </div>

              <div className="col-12 text-center">
                <button className="btn btn-primary px-4" onClick={handleRequestCustomTrip}>
                  Request Custom Trip Quote
                </button>
              </div>
            </div>
          </div>
        </Fade>
      )}

      {/* --- Booking Popup Overlay (same as original) --- */}
      {showForm && selectedTour && (
        <div className="overlay">
          <Zoom triggerOnce>
            <div className="popup">
              <h5 className="mb-4 text-center">Book {selectedTour.title}</h5>

              <div className="row g-3">
                {/* Full Name */}
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Full Name"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  />
                </div>

                {/* CNIC */}
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="CNIC without dashes"
                    value={bookingForm.cnic || ""}
                    maxLength={13}
                    onChange={(e) => handleBookingChangeDigitsOnly("cnic", e.target.value, 13)}
                  />
                </div>

                {/* Phone */}
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone No. (03001234567)"
                    value={bookingForm.phone || ""}
                    maxLength={11}
                    onChange={(e) => handleBookingChangeDigitsOnly("phone", e.target.value, 11)}
                  />
                </div>

                {/* Service Type */}
                <div className="col-md-6">
                  {selectedTour.category && selectedTour.category.length === 1 ? (
                    <input type="text" className="form-control" value={selectedTour.category[0]} disabled />
                  ) : (
                    <select
                      className="form-select"
                      value={bookingForm.serviceType}
                      onChange={(e) => setBookingForm({ ...bookingForm, serviceType: e.target.value })}
                    >
                      <option value="">Select Service Type</option>
                      {selectedTour.category.map((cat, idx) => (
                        <option key={idx} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Duration */}
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={bookingForm.duration}
                    onChange={(e) => setBookingForm({ ...bookingForm, duration: e.target.value })}
                  >
                    <option value="">Select Duration</option>
                    <option value="1 Day">1 Day</option>
                    <option value="2 Days">2 Days</option>
                    <option value="3 Days">3 Days</option>
                    <option value="1 Week">1 Week</option>
                    <option value="2 Weeks">2 Weeks</option>
                  </select>
                </div>

                {/* Message */}
                <div className="col-12">
                  <textarea
                    className="form-control"
                    placeholder="Message"
                    value={bookingForm.message}
                    rows={4}
                    onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-end gap-2 mt-3">
                <button className="btn btn-secondary w-50" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <motion.button className="btn btn-primary w-50" whileHover={{ scale: 1.05 }} onClick={handleConfirmBooking}>
                  Confirm
                </motion.button>
              </div>
            </div>
          </Zoom>
        </div>
      )}
    </div>
  );
};

export default TourPage;