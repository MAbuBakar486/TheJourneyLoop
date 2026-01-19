import React, { useState, useEffect } from "react";
import "../Styles/CarRentalPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaUsers, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Fade, Zoom } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { db } from "../firebase.js"; // ✅ your firebase config file
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// import React, { useState, useEffect } from "react";
// import "../Styles/CarRentalPage.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaStar, FaUsers, FaMapMarkerAlt, FaClock } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Fade, Zoom } from "react-awesome-reveal";

// // ✅ Firestore Imports
// import { db } from "../firebase";
// import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

const TourPage = () => {
  const navigate = useNavigate();

  // Tabs
  const [activeTab, setActiveTab] = useState("tours"); // 'tours' or 'custom'
  const [hover, setHover] = useState(false);

  // Tours + UI states
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const [filters, setFilters] = useState({ category: "All", destination: "All", search: "" });
  const [selectedTour, setSelectedTour] = useState(null);
  const [showForm, setShowForm] = useState(false); // booking popup

  // Booking popup form state
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

  // ✅ Fetch tours from Firestore
  useEffect(() => {
    const fetchTours = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "All Cities"));
    const fetchedTours = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.Place_Name || "Unnamed City",
        location: data.province || "Unknown",
        duration: data.duration || "N/A",
        Rideprice: data.Rideprice ?? data.price ?? data.daily_price ?? null,
        rating: data.rating || 4.5,
        reviews: data.reviews || 0,
        maxPeople: data.maxPeople || "N/A",
        highlights: data.highlights || [],
        category: data.category || [],
        img: data.Place_Images?.[0] || "https://via.placeholder.com/400x250?text=No+Image",
        allImages: data.Place_Images || [],
        description: data.description || "",
      };
    });
    setTours(fetchedTours);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching cities:", error);
    setLoading(false);
  }
};
    // const fetchTours = async () => {
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "All Cities"));
    //     const fetchedTours = querySnapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     setTours(fetchedTours);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching tours:", error);
    //     setLoading(false);
    //   }
    // };
    fetchTours();
  }, []);

  // Dynamic destinations from DB
  const destinations = ["All", ...new Set(tours.map((t) => t.location))];

  // Filters logic
  const filteredTours = tours.filter((t) => {
    const matchCategory =
      filters.category === "All" || (t.category && t.category.includes(filters.category));
    const matchDestination = filters.destination === "All" || t.location === filters.destination;
    const matchSearch = t.title?.toLowerCase().includes(filters.search.toLowerCase());
    return matchCategory && matchDestination && matchSearch;
  });

  // --- Booking Logic ---
  const handleBook = (tour) => {
    setSelectedTour(tour);
    setBookingForm({
      name: "",
      phone: "",
      cnic: "",
      serviceType: tour.category && tour.category.length === 1 ? tour.category[0] : "",
      duration: "",
      message: "",
    });
    setShowForm(true);
  };

  const handleBookingChangeDigitsOnly = (field, value, maxLen) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, maxLen);
    setBookingForm((prev) => ({ ...prev, [field]: digitsOnly }));
  };

  // ✅ Save booking to Firestore
  const handleConfirmBooking = async () => {
    if (bookingForm.phone && bookingForm.phone.length !== 11) {
      alert("Phone must be 11 digits.");
      return;
    }
    if (bookingForm.cnic && bookingForm.cnic.length !== 13) {
      alert("CNIC must be 13 digits.");
      return;
    }

    try {
      const bookingData = {
        ...bookingForm,
        tourId: selectedTour.id,
        tourTitle: selectedTour.title,
        location: selectedTour.location,
        duration: bookingForm.duration || selectedTour.duration,
        serviceType: bookingForm.serviceType || "Standard",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "WebsiteBooking"), bookingData);
      alert("✅ Booking saved successfully!");
      setShowForm(false);
      navigate("/success");
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("❌ Failed to save booking.");
    }
  };

  // --- Custom Trip Logic ---
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

  // ✅ Save custom trip to Firestore
  const handleRequestCustomTrip = async () => {
    if (customForm.phone && customForm.phone.length !== 11) {
      alert("Phone must be 11 digits.");
      return;
    }
    if (customForm.cnic && customForm.cnic.length !== 13) {
      alert("CNIC must be 13 digits.");
      return;
    }

    try {
      const customTripData = {
        ...customForm,
        service: "Customized Trip",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "WebsiteBooking"), customTripData);
      alert("✅ Custom trip request submitted!");
      setCustomForm({
        name: "",
        phone: "",
        cnic: "",
        destination: "",
        category: "",
        duration: "",
        interests: [],
        requirements: "",
      });
    } catch (error) {
      console.error("Error saving custom trip:", error);
      alert("❌ Failed to submit custom trip request.");
    }
  };

  return (
    <>

    <Helmet>
  <title>Tours & Packages | The Journey Loop</title>
  <meta
    name="description"
    content="Browse curated tour packages and upcoming departures from The Journey Loop. Group tours, honeymoon packages, solo adventures and local experiences across Pakistan."
  />
</Helmet>

    <div className="container" style={{ marginTop: "90px", marginBottom: "30px", minHeight: "60vh" }}>
      {/* Tabs */}
      <div className="d-flex justify-content-center mb-4" style={{ fontFamily: "Playfair Display" }}>
        <div className="btn-group">
          <button
            className={`btn ${activeTab === "tours" ? "btn-primary" : "btn-outline-success"}`}
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

    <div style={{ textAlign: "center", paddingBottom:"15px" }}>
      Here, You can see Available tours list. For seeing Upcoming tours, Visit{" "}
      <a
        href="https://www.thejourneyloop.com/upcomingtours/" target="_blank" rel="noopener noreferrer"
        style={{
          color: hover ? "#0A392C" : "inherit",
          textDecoration: hover ? "underline" : "none",
          cursor: "pointer",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Upcoming Tour Page
      </a>
    </div>


      <h2 className="text-center fw-bold mb-4" style={{ fontFamily: "Playfair Display" }}>
        {activeTab === "tours" ? "Available Tours" : "Make Own Trip Plan"}
      </h2>

      {/* --- TOURS TAB --- */}
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

          {/* Tours Grid */}
          <div className="row">
            {loading ? (
              <div className="text-center py-5">Loading tours...</div>
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
                            {tour.rating || "4.5"}
                          </div>
                          <div className="text-muted small">
                            <FaUsers className="me-1" />
                            Max {tour.maxPeople || "10"}
                          </div>
                        </div>

                        <div
                      className="split-btn-container w-100 mb-3"
                      style={{
                        display: "flex",
                        width: "100%",
                        height: "45px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        gap: "10px",
                      }}
                    >
                      <button
                        className="btn flex-fill"
                        style={{
                          backgroundColor: "#0C3A2E",
                          color: "white",
                          border: "none",
                        }}
                        onClick={() => handleBook(tour)}
                      >
                        Book Now
                      </button>

                      {/* <button
                        className="btn flex-fill"
                        style={{
                          backgroundColor: "#0C3A2E",
                          color: "white",
                          border: "none",
                        }}
                        onClick={() =>
                          navigate(`/destinationdetail/${tour.id}`)
                        }
                      >
                        Detail
                      </button> */}
                      <button
                        className="btn flex-fill"
                        style={{
                          backgroundColor: "#0C3A2E",
                          color: "white",
                          border: "none",
                        }}
                        onClick={() =>
                          navigate(`/destinationdetail/${tour.id}`, { state: tour })
                        }
                      >
                        Detail
                      </button>

                    </div>
                      </div>
                    </div>
                  </Fade>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* --- CUSTOM TRIP TAB --- */}
      {activeTab === "custom" && (
        <Fade triggerOnce>
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Create Your Custom Trip</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  value={customForm.name}
                  onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone (11 digits)"
                  value={customForm.phone}
                  onChange={(e) => handleCustomDigitsOnly("phone", e.target.value, 11)}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="CNIC (13 digits)"
                  value={customForm.cnic}
                  onChange={(e) => handleCustomDigitsOnly("cnic", e.target.value, 13)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Preferred Destination"
                  value={customForm.destination}
                  onChange={(e) => setCustomForm({ ...customForm, destination: e.target.value })}
                />
              </div>
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

              <div className="col-12">
                <label className="fw-bold mb-2">Interests</label>
                <div className="d-flex flex-wrap gap-3">
                  {interestsList.map((interest) => (
                    <div key={interest} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={customForm.interests.includes(interest)}
                        onChange={() => toggleInterest(interest)}
                      />
                      <label className="form-check-label">{interest}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12">
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Any special requirements..."
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

      {/* --- Booking Popup --- */}
      {showForm && selectedTour && (
        <div className="overlay">
          <Zoom triggerOnce>
            <div className="popup">
              <h5 className="mb-4 text-center">Book {selectedTour.title}</h5>

              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Full Name"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="CNIC without dashes"
                    value={bookingForm.cnic}
                    onChange={(e) => handleBookingChangeDigitsOnly("cnic", e.target.value, 13)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone No. (03001234567)"
                    value={bookingForm.phone}
                    onChange={(e) => handleBookingChangeDigitsOnly("phone", e.target.value, 11)}
                  />
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={bookingForm.serviceType}
                    onChange={(e) => setBookingForm({ ...bookingForm, serviceType: e.target.value })}
                  >
                    <option value="">Select Service Type</option>
                    {selectedTour.category?.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
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

              <div className="d-flex justify-content-end gap-2 mt-3">
                <button className="btn btn-secondary w-50" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <motion.button
                  className="btn btn-primary w-50"
                  whileHover={{ scale: 1.05 }}
                  onClick={handleConfirmBooking}
                >
                  Confirm
                </motion.button>
              </div>
            </div>
          </Zoom>
        </div>
      )}
    </div>
    </>
  );
};

export default TourPage;

// const TourPage = () => {
//   const navigate = useNavigate();

//   // Tabs
//   const [activeTab, setActiveTab] = useState("tours"); // 'tours' or 'custom'

//   // Tours + UI states
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({ category: "All", destination: "All", search: "" });
//   const [selectedTour, setSelectedTour] = useState(null);
//   const [showForm, setShowForm] = useState(false); // booking popup
//   const [tours, setTours] = useState([]);

//   // Booking popup form state (separate from custom trip form)
//   const [bookingForm, setBookingForm] = useState({
//     name: "",
//     phone: "",
//     cnic: "",
//     serviceType: "",
//     duration: "",
//     message: "",
//   });

//   // Custom trip form state
//   const [customForm, setCustomForm] = useState({
//     name: "",
//     phone: "",
//     cnic: "",
//     destination: "",
//     category: "",
//     duration: "",
//     interests: [],
//     requirements: "",
//   });

//   const interestsList = [
//     "Adventure",
//     "Culture",
//     "Food",
//     "Shopping",
//     "History",
//     "Nature",
//     "Photography",
//     "Nightlife",
//     "Museums",
//   ];

//   useEffect(() => {
//   const fetchTours = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "All Cities"));
//       const fetchedTours = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setTours(fetchedTours);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching tours:", error);
//       setLoading(false);
//     }
//   };

//   fetchTours();
// }, []);

//   // Destinations for filter dropdown
//   const destinations = ["All", ...new Set(tours.map((t) => t.location))];

//   // Filter logic (note: t.category is an array)
//   const filteredTours = tours.filter((t) => {
//     const matchCategory =
//       filters.category === "All" || t.category.includes(filters.category);
//     const matchDestination = filters.destination === "All" || t.location === filters.destination;
//     const matchSearch = t.title.toLowerCase().includes(filters.search.toLowerCase());
//     return matchCategory && matchDestination && matchSearch;
//   });

//   useEffect(() => {
//     // simulate loading
//     const timer = setTimeout(() => setLoading(false), 800);
//     return () => clearTimeout(timer);
//   }, []);

//   // When booking a tour from the tours list
//   const handleBook = (tour) => {
//     setSelectedTour(tour);
//     // prefill serviceType if single option
//     setBookingForm((prev) => ({
//       ...prev,
//       name: "",
//       phone: "",
//       cnic: "",
//       serviceType: tour.category && tour.category.length === 1 ? tour.category[0] : "",
//       duration: "",
//       message: "",
//     }));
//     setShowForm(true);
//   };

//   const handleBookingChangeDigitsOnly = (field, value, maxLen) => {
//     const digitsOnly = value.replace(/\D/g, "").slice(0, maxLen);
//     setBookingForm((prev) => ({ ...prev, [field]: digitsOnly }));
//   };

// const handleConfirmBooking = async () => {
//   if (bookingForm.phone && bookingForm.phone.length !== 11) {
//     alert("Phone must be 11 digits.");
//     return;
//   }
//   if (bookingForm.cnic && bookingForm.cnic.length !== 13) {
//     alert("CNIC must be 13 digits.");
//     return;
//   }

//   try {
//     const bookingData = {
//       ...bookingForm,
//       tourId: selectedTour.id,
//       tourTitle: selectedTour.title,
//       location: selectedTour.location,
//       duration: bookingForm.duration || selectedTour.duration,
//       serviceType: bookingForm.serviceType || "standard",
//       createdAt: serverTimestamp(),
//     };

//     await addDoc(collection(db, "WebsiteBooking"), bookingData);
//     alert("✅ Booking saved successfully!");
//     setShowForm(false);
//     navigate("/success");
//   } catch (error) {
//     console.error("Error saving booking:", error);
//     alert("❌ Failed to save booking");
//   }
// };


//   // Custom trip handlers
//   const toggleInterest = (interest) => {
//     setCustomForm((prev) => ({
//       ...prev,
//       interests: prev.interests.includes(interest)
//         ? prev.interests.filter((i) => i !== interest)
//         : [...prev.interests, interest],
//     }));
//   };

//   const handleCustomDigitsOnly = (field, value, maxLen) => {
//     const digitsOnly = value.replace(/\D/g, "").slice(0, maxLen);
//     setCustomForm((prev) => ({ ...prev, [field]: digitsOnly }));
//   };

// const handleRequestCustomTrip = async () => {
//   if (customForm.phone && customForm.phone.length !== 11) {
//     alert("Phone must be 11 digits.");
//     return;
//   }
//   if (customForm.cnic && customForm.cnic.length !== 13) {
//     alert("CNIC must be 13 digits.");
//     return;
//   }

//   try {
//     const customTripData = {
//       ...customForm,
//       serviceType: "Customized Trip", // fixed type
//       createdAt: serverTimestamp(),
//     };

//     await addDoc(collection(db, "WebsiteBooking"), customTripData);
//     alert("✅ Custom trip request submitted!");
//     setCustomForm({
//       name: "",
//       phone: "",
//       cnic: "",
//       destination: "",
//       category: "",
//       duration: "",
//       interests: [],
//       requirements: "",
//     });
//   } catch (error) {
//     console.error("Error saving custom trip:", error);
//     alert("❌ Failed to submit custom trip request.");
//   }
// };


//   return (
//     <div className="container" style={{marginTop:"90px",marginBottom:"30px"}}>
//       {/* Tabs */}
//       <div className="d-flex justify-content-center mb-4" style={{fontFamily:"Playfair Display"}}>
//         <div className="btn-group">
//           <button
//             className={`btn ${activeTab === "tours" ? "btn-primary" : "btn-outline-success"}`} style={{fontFamily:"Playfair Display"}}
//             onClick={() => setActiveTab("tours")}
//           >
//             Available Tours
//           </button>
//           <button
//             className={`btn ${activeTab === "custom" ? "btn-primary" : "btn-outline-success"}`}
//             onClick={() => setActiveTab("custom")}
//           >
//             Custom Trip
//           </button>
//         </div>
//       </div>

//       {/* Heading changes with tab */}
//       <h2 className="text-center fw-bold mb-4" style={{fontFamily:"Playfair Display"}}>
//         {activeTab === "tours" ? "Available Tours" : "Make Own Trip Plan"}
//       </h2>

//       {/* --- Tours View (with filters) --- */}
//       {activeTab === "tours" && (
//         <>
//           <Fade triggerOnce>
//             <div className="row g-2 mb-4 align-items-center">
//               <div className="col-md-3">
//                 <select
//                   className="form-select"
//                   value={filters.category}
//                   onChange={(e) => setFilters({ ...filters, category: e.target.value })}
//                 >
//                   {["All", "Solo", "Group", "Honeymoon", "Family"].map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="col-md-3">
//                 <select
//                   className="form-select"
//                   value={filters.destination}
//                   onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
//                 >
//                   {destinations.map((dest) => (
//                     <option key={dest} value={dest}>
//                       {dest}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="col-md-6">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Search by tour name"
//                   value={filters.search}
//                   onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//                 />
//               </div>
//             </div>
//           </Fade>

//           {/* Tours grid */}
//           <div className="row">
//             {loading ? (
//               Array(3)
//                 .fill(0)
//                 .map((_, idx) => (
//                   <div className="col-md-4 mb-4" key={idx}>
//                     <div className="tour-card shimmer" />
//                   </div>
//                 ))
//             ) : filteredTours.length === 0 ? (
//               <div className="text-center w-100 py-5">No tours found.</div>
//             ) : (
//               filteredTours.map((tour, idx) => (
//                 <div className="col-md-4 mb-4" key={idx}>
//                   <Fade triggerOnce>
//                     <div className="tour-card shadow-sm h-100">
//                       <img src={tour.img} className="card-img-top" alt={tour.title} />
//                       <div className="card-body mx-3 mt-3">
//                         <h5 className="fw-bold">{tour.title}</h5>

//                         <div className="d-flex align-items-center gap-3 text-muted mb-2 small">
//                           <span>
//                             <FaMapMarkerAlt className="me-1" /> {tour.location}
//                           </span>
//                           <span>
//                             <FaClock className="me-1" /> {tour.duration}
//                           </span>
//                         </div>

//                         <div className="d-flex justify-content-between align-items-center mb-2">
//                           <div className="text-warning fw-bold">
//                             <FaStar className="me-1" />
//                             {tour.rating}
//                             <span className="text-muted ms-1">({tour.reviews})</span>
//                           </div>
//                           <div className="text-muted small">
//                             <FaUsers className="me-1" />
//                             Max {tour.maxPeople}
//                           </div>
//                         </div>

//                         <h6 className="fw-bold mb-2">Highlights:</h6>
//                         <div className="highlights mb-3">
//                           {tour.highlights.map((item, i) => (
//                             <span key={i} className="highlight-pill">
//                               {item}
//                             </span>
//                           ))}
//                         </div>

//                         <button className="btn book-btn w-100 mb-3" onClick={() => handleBook(tour)} style={{color:"white",backgroundColor:"#0C3A2E"}}>
//                           Book Tour
//                         </button>
//                       </div>
//                     </div>
//                   </Fade>
//                 </div>
//               ))
//             )}
//           </div>
//         </>
//       )}

//       {/* --- Custom Trip Form View --- */}
//       {activeTab === "custom" && (
//         <Fade triggerOnce>
//           <div className="card p-4 shadow-sm">
//             <h5 className="mb-3">Create Your Custom Trip</h5>
//             <p className="text-muted">
//               Tell us your preferences and we'll create a personalized itinerary for you.
//             </p>

//             <div className="row g-3">
//               {/* Name */}
//               <div className="col-md-4">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Full Name"
//                   value={customForm.name}
//                   onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
//                 />
//               </div>

//               {/* Phone */}
//               <div className="col-md-4">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Phone (11 digits)"
//                   value={customForm.phone}
//                   maxLength={11}
//                   onChange={(e) => handleCustomDigitsOnly("phone", e.target.value, 11)}
//                 />
//               </div>

//               {/* CNIC */}
//               <div className="col-md-4">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="CNIC (13 digits)"
//                   value={customForm.cnic}
//                   maxLength={13}
//                   onChange={(e) => handleCustomDigitsOnly("cnic", e.target.value, 13)}
//                 />
//               </div>

//               {/* Preferred Destination */}
//               <div className="col-md-6">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Preferred Destination"
//                   value={customForm.destination}
//                   onChange={(e) => setCustomForm({ ...customForm, destination: e.target.value })}
//                 />
//               </div>

//               {/* Travel Category */}
//               <div className="col-md-6">
//                 <select
//                   className="form-select"
//                   value={customForm.category}
//                   onChange={(e) => setCustomForm({ ...customForm, category: e.target.value })}
//                 >
//                   <option value="">Select Category</option>
//                   <option value="Solo">Solo</option>
//                   <option value="Couple">Couple</option>
//                   <option value="Family">Family</option>
//                   <option value="Group">Group</option>
//                 </select>
//               </div>

//               {/* Duration */}
//               <div className="col-md-6">
//                 <select
//                   className="form-select"
//                   value={customForm.duration}
//                   onChange={(e) => setCustomForm({ ...customForm, duration: e.target.value })}
//                 >
//                   <option value="">Select Duration</option>
//                   <option value="1 Day">1 Day</option>
//                   <option value="2 Days">2 Days</option>
//                   <option value="3 Days">3 Days</option>
//                   <option value="1 Week">1 Week</option>
//                   <option value="2 Weeks">2 Weeks</option>
//                 </select>
//               </div>

//               {/* Interests */}
//               <div className="col-12">
//                 <label className="fw-bold d-block mb-2">Interests (Select all that apply)</label>
//                 <div className="d-flex flex-wrap gap-3">
//                   {interestsList.map((interest) => (
//                     <div key={interest} className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         id={`interest-${interest}`}
//                         checked={customForm.interests.includes(interest)}
//                         onChange={() => toggleInterest(interest)}
//                       />
//                       <label className="form-check-label" htmlFor={`interest-${interest}`}>
//                         {interest}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Requirements */}
//               <div className="col-12">
//                 <textarea
//                   className="form-control"
//                   rows={3}
//                   placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
//                   value={customForm.requirements}
//                   onChange={(e) => setCustomForm({ ...customForm, requirements: e.target.value })}
//                 />
//               </div>

//               <div className="col-12 text-center">
//                 <button className="btn btn-primary px-4" onClick={handleRequestCustomTrip}>
//                   Request Custom Trip Quote
//                 </button>
//               </div>
//             </div>
//           </div>
//         </Fade>
//       )}

//       {/* --- Booking Popup Overlay (same as original) --- */}
//       {showForm && selectedTour && (
//         <div className="overlay">
//           <Zoom triggerOnce>
//             <div className="popup">
//               <h5 className="mb-4 text-center">Book {selectedTour.title}</h5>

//               <div className="row g-3">
//                 {/* Full Name */}
//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Your Full Name"
//                     value={bookingForm.name}
//                     onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
//                   />
//                 </div>

//                 {/* CNIC */}
//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="CNIC without dashes"
//                     value={bookingForm.cnic || ""}
//                     maxLength={13}
//                     onChange={(e) => handleBookingChangeDigitsOnly("cnic", e.target.value, 13)}
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Phone No. (03001234567)"
//                     value={bookingForm.phone || ""}
//                     maxLength={11}
//                     onChange={(e) => handleBookingChangeDigitsOnly("phone", e.target.value, 11)}
//                   />
//                 </div>

//                 {/* Service Type */}
//                 <div className="col-md-6">
//                   {selectedTour.category && selectedTour.category.length === 1 ? (
//                     <input type="text" className="form-control" value={selectedTour.category[0]} disabled />
//                   ) : (
//                     <select
//                       className="form-select"
//                       value={bookingForm.serviceType}
//                       onChange={(e) => setBookingForm({ ...bookingForm, serviceType: e.target.value })}
//                     >
//                       <option value="">Select Service Type</option>
//                       {selectedTour.category.map((cat, idx) => (
//                         <option key={idx} value={cat}>
//                           {cat}
//                         </option>
//                       ))}
//                     </select>
//                   )}
//                 </div>

//                 {/* Duration */}
//                 <div className="col-md-6">
//                   <select
//                     className="form-select"
//                     value={bookingForm.duration}
//                     onChange={(e) => setBookingForm({ ...bookingForm, duration: e.target.value })}
//                   >
//                     <option value="">Select Duration</option>
//                     <option value="1 Day">1 Day</option>
//                     <option value="2 Days">2 Days</option>
//                     <option value="3 Days">3 Days</option>
//                     <option value="1 Week">1 Week</option>
//                     <option value="2 Weeks">2 Weeks</option>
//                   </select>
//                 </div>

//                 {/* Message */}
//                 <div className="col-12">
//                   <textarea
//                     className="form-control"
//                     placeholder="Message"
//                     value={bookingForm.message}
//                     rows={4}
//                     onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
//                   />
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="d-flex justify-content-end gap-2 mt-3">
//                 <button className="btn btn-secondary w-50" onClick={() => setShowForm(false)}>
//                   Cancel
//                 </button>
//                 <motion.button className="btn btn-primary w-50" whileHover={{ scale: 1.05 }} onClick={handleConfirmBooking}>
//                   Confirm
//                 </motion.button>
//               </div>
//             </div>
//           </Zoom>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TourPage;