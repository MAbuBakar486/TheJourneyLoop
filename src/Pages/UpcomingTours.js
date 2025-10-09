import React, { useState, useEffect } from "react";
import "../Styles/CarRentalPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaUsers, FaMapMarkerAlt, FaClock, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Fade,Zoom } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";

// import React, { useState, useEffect } from "react";
// import "../Styles/CarRentalPage.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaStar, FaUsers, FaMapMarkerAlt, FaClock } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Fade, Zoom } from "react-awesome-reveal";

// ✅ Firestore Imports
import { db } from "../firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

const UpcomingTours = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    cnic: "",
    duration: "",
    serviceType: "",
    message: "",
  });

  const [filters, setFilters] = useState({ category: "All", destination: "All", search: "" });
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  // ✅ Fetch tours from Firestore ("UpcomingTours" collection)
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "All Cities"));
        const fetchedTours = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.Place_Name || "Unnamed Tour",
            location: data.province || "Unknown Location",
            Rideprice: data.Rideprice ?? data.price ?? data.daily_price ?? null,
            duration: data.duration || "N/A",
            rating: data.rating || 4.5,
            reviews: data.reviews || 0,
            maxPeople: data.maxPeople || "N/A",
            highlights: data.highlights || [],
            category: data.category || [],
            img:
              data.Place_Images?.[0] ||
              "https://via.placeholder.com/400x250?text=No+Image",
            allImages: data.Place_Images || [],
            description: data.description || "",
            popularity: data.popularity || 0,
          };
        });
        setTours(fetchedTours);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching upcoming tours:", error);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Extract unique destinations for filters
  const destinations = ["All", ...new Set(tours.map((t) => t.location))];

  // Apply Filters
  const filteredTours = tours.filter((t) => {
    const matchCategory =
      filters.category === "All" ||
      (t.category && t.category.includes(filters.category));
    const matchDestination =
      filters.destination === "All" || t.location === filters.destination;
    const matchSearch = t.title?.toLowerCase().includes(filters.search.toLowerCase());
    return matchCategory && matchDestination && matchSearch;
  });

  // ✅ Handle Booking Button
  const handleBook = (tour) => {
    setSelectedTour(tour);
    setFormData({
      name: "",
      phone: "",
      cnic: "",
      duration: "",
      serviceType: tour.category?.length === 1 ? tour.category[0] : "",
      message: "",
    });
    setShowForm(true);
  };

  // ✅ Save booking to Firestore
  const handleConfirm = async () => {
    if (formData.phone && formData.phone.length !== 11) {
      alert("Phone number must be 11 digits.");
      return;
    }
    if (formData.cnic && formData.cnic.length !== 13) {
      alert("CNIC must be 13 digits.");
      return;
    }

    try {
      const bookingData = {
        ...formData,
        tourId: selectedTour.id,
        tourTitle: selectedTour.title,
        location: selectedTour.location,
        duration: formData.duration || selectedTour.duration,
        serviceType: formData.serviceType || "Standard",
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
      <h2 className="text-center fw-bold mb-4" style={{ fontFamily: "Playfair Display" }}>
        Upcoming Tours
      </h2>

      {/* Filters */}
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
          <div className="text-center py-5">Loading upcoming tours...</div>
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



                      {/* Buttons */}
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

      {/* Booking Popup */}
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
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="CNIC without dashes"
                    value={formData.cnic}
                    maxLength={13}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "");
                      setFormData({ ...formData, cnic: digitsOnly });
                    }}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone No. (03001234567)"
                    value={formData.phone}
                    maxLength={11}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "");
                      setFormData({ ...formData, phone: digitsOnly });
                    }}
                  />
                </div>

                <div className="col-md-6">
                  {selectedTour.category?.length === 1 ? (
                    <input
                      type="text"
                      className="form-control"
                      value={selectedTour.category[0]}
                      disabled
                    />
                  ) : (
                    <select
                      className="form-select"
                      value={formData.serviceType}
                      onChange={(e) =>
                        setFormData({ ...formData, serviceType: e.target.value })
                      }
                    >
                      <option value="">Select Service Type</option>
                      {selectedTour.category?.map((cat, idx) => (
                        <option key={idx} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
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
                    value={formData.message}
                    rows={4}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  className="btn btn-secondary w-50"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <motion.button
                  className="btn btn-primary w-50"
                  whileHover={{ scale: 1.05 }}
                  onClick={handleConfirm}
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

export default UpcomingTours;


// const UpcomingTours = () => {
//   const navigate = useNavigate();
//   const [showForm, setShowForm] = useState(false);
//   const [selectedTour, setSelectedTour] = useState(null);
//   const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
//   const [filters, setFilters] = useState({ category: "All", destination: "All", search: "" });
//   const [loading, setLoading] = useState(true);

//   const tours = [
//   {
//     title: "Dubai Desert Safari & City Tour",
//     location: "Dubai, UAE",
//     duration: "3 Days",
//     rating: 4.9,
//     reviews: 124,
//     maxPeople: 15,
//     highlights: ["Desert Safari", "Burj Khalifa", "+2 more"],
//     nextDate: "15/01/2024",
//     category: ["Group"],
//     img: "https://preview--wheels-and-wanderlust.lovable.app/assets/cars-showroom-BTcD30uv.jpg",
//   },
//   {
//     title: "Solo Adventure in Dubai",
//     location: "Dubai, UAE",
//     duration: "2 Days",
//     rating: 4.7,
//     reviews: 45,
//     maxPeople: 1,
//     highlights: ["Desert Safari", "City Tour"],
//     nextDate: "20/01/2024",
//     category: ["Solo"],
//     img: "https://preview--wheels-and-wanderlust.lovable.app/assets/cars-showroom-BTcD30uv.jpg",
//   },
//   {
//     title: "Honeymoon in Paris",
//     location: "Paris, France",
//     duration: "5 Days",
//     rating: 4.9,
//     reviews: 80,
//     maxPeople: 2,
//     highlights: ["Eiffel Tower", "Seine River Cruise"],
//     nextDate: "05/02/2024",
//     category: ["Honeymoon"],
//     img: "https://preview--wheels-and-wanderlust.lovable.app/assets/cars-showroom-BTcD30uv.jpg",
//   },
// ];


//   // Extract unique destinations
//   const destinations = ["All", ...new Set(tours.map((t) => t.location))];

//   // Filtered Available Tours
//   const filteredTours = tours.filter((t) => {
//     const matchCategory = filters.category === "All" || t.category === filters.category;
//     const matchDestination = filters.destination === "All" || t.location === filters.destination;
//     const matchSearch = t.title.toLowerCase().includes(filters.search.toLowerCase());
//     return matchCategory && matchDestination && matchSearch;
//   });

//   useEffect(() => {
//     // Simulate loading effect
//     const timer = setTimeout(() => setLoading(false), 800);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleBook = (tour) => {
//     setSelectedTour(tour);
//     setShowForm(true);
//   };

//     const handleConfirm = () => {
//     // Optional: validation can be added here
//     console.log("Booking Data:", { car: selectedTour, ...formData });
//     setShowForm(false);
//     navigate("/success");
//   };

//   return (
//     <div className="container" style={{marginTop:"90px",marginBottom:"30px"}}>
//       <h2 className="text-center fw-bold mb-4" style={{fontFamily:"Playfair Display"}}>Available Tours</h2>

//       {/* Filters Row */}
//       <Fade triggerOnce>
//         <div className="row g-2 mb-4 align-items-center">
//           <div className="col-md-3">
//             <select
//               className="form-select"
//               value={filters.category}
//               onChange={(e) => setFilters({ ...filters, category: e.target.value })}
//             >
//               {["All", "Solo", "Group", "Honeymoon", "Family"].map((cat) => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </div>

//           <div className="col-md-3">
//             <select
//               className="form-select"
//               value={filters.destination}
//               onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
//             >
//               {destinations.map((dest) => (
//                 <option key={dest} value={dest}>{dest}</option>
//               ))}
//             </select>
//           </div>

//           <div className="col-md-6">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by tour name"
//               value={filters.search}
//               onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//             />
//           </div>
//         </div>
//       </Fade>

//       {/* Tours Grid */}
//       <div className="row">
//         {loading
//           ? Array(3).fill(0).map((_, idx) => (
//               <div className="col-md-4 mb-4" key={idx}>
//                 <div className="tour-card shimmer"></div>
//               </div>
//             ))
//           : filteredTours.length === 0
//           ? <div className="text-center w-100 py-5">No tours found.</div>
//           : filteredTours.map((tour, idx) => (
//               <div className="col-md-4 mb-4" key={idx}>
//                 <Fade triggerOnce>
//                   <div className="tour-card shadow-sm h-100">
//                     <img src={tour.img} className="card-img-top" alt={tour.title} />
//                     <div className="card-body mx-3 mt-3">
//                       <h5 className="fw-bold">{tour.title}</h5>

//                       <div className="d-flex align-items-center gap-3 text-muted mb-2 small">
//                         <span><FaMapMarkerAlt className="me-1" /> {tour.location}</span>
//                         <span><FaClock className="me-1" /> {tour.duration}</span>
//                       </div>

//                       <div className="d-flex justify-content-between align-items-center mb-2">
//                         <div className="text-warning fw-bold">
//                           <FaStar className="me-1" />
//                           {tour.rating}
//                           <span className="text-muted ms-1">({tour.reviews})</span>
//                         </div>
//                         <div className="text-muted small">
//                           <FaUsers className="me-1" />
//                           Max {tour.maxPeople}
//                         </div>
//                       </div>

//                       <h6 className="fw-bold mb-2">Highlights:</h6>
//                       <div className="highlights mb-3">
//                         {tour.highlights.map((item, i) => (
//                           <span key={i} className="highlight-pill">{item}</span>
//                         ))}
//                       </div>

//                       <button className="btn book-btn w-100 mb-3" onClick={() => handleBook(tour)} style={{color:"white",backgroundColor:"#0C3A2E"}}>
//                         Book Tour
//                       </button>
//                     </div>
//                   </div>
//                 </Fade>
//               </div>
//           ))}
//       </div>

// {showForm && selectedTour && (
//   <div className="overlay">
//     <Zoom triggerOnce>
//       <div className="popup">
//         <h5 className="mb-4 text-center">Book {selectedTour.title}</h5>

//         <div className="row g-3">
//           {/* Full Name */}
//           <div className="col-md-6">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Your Full Name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             />
//           </div>

//           {/* CNIC */}
//           <div className="col-md-6">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="CNIC without dashes"
//               value={formData.cnic}
//               maxLength={13}
//               onChange={(e) => {
//                 const digitsOnly = e.target.value.replace(/\D/g, "");
//                 setFormData({ ...formData, cnic: digitsOnly });
//               }}
//             />
//           </div>

//           {/* Phone */}
//           <div className="col-md-6">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Phone No. (03001234567)"
//               value={formData.phone}
//               maxLength={11}
//               onChange={(e) => {
//                 const digitsOnly = e.target.value.replace(/\D/g, "");
//                 setFormData({ ...formData, phone: digitsOnly });
//               }}
//             />
//           </div>

//           {/* Service Type */}
//           <div className="col-md-6">
//             {selectedTour.category.length === 1 ? (
//               <input
//                 type="text"
//                 className="form-control"
//                 value={selectedTour.category[0]}
//                 disabled
//               />
//             ) : (
//               <select
//                 className="form-select"
//                 value={formData.serviceType}
//                 onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
//               >
//                 <option value="">Select Service Type</option>
//                 {selectedTour.category.map((cat, idx) => (
//                   <option key={idx} value={cat}>{cat}</option>
//                 ))}
//               </select>
//             )}
//           </div>

//           {/* Duration */}
//           <div className="col-md-6">
//             <select
//               className="form-select"
//               value={formData.duration}
//               onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//             >
//               <option value="">Select Duration</option>
//               <option value="1 Day">1 Day</option>
//               <option value="2 Days">2 Days</option>
//               <option value="3 Days">3 Days</option>
//               <option value="1 Week">1 Week</option>
//               <option value="2 Weeks">2 Weeks</option>
//             </select>
//           </div>

//           {/* Message */}
//           <div className="col-12">
//             <textarea
//               className="form-control"
//               placeholder="Message"
//               value={formData.message}
//               rows={4}
//               onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//             />
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="d-flex justify-content-end gap-2 mt-3">
//           <button className="btn btn-secondary w-50" onClick={() => setShowForm(false)}>
//             Cancel
//           </button>
//           <motion.button
//             className="btn btn-primary w-50"
//             whileHover={{ scale: 1.05 }}
//             onClick={handleConfirm}
//           >
//             Confirm
//           </motion.button>
//         </div>
//       </div>
//     </Zoom>
//   </div>
// )}

//     </div>
//   );
// };

// export default UpcomingTours;