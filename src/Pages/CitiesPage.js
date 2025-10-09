import React, { useState, useEffect } from "react";
import "../Styles/CarRentalPage.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaUsers, FaMapMarkerAlt, FaClock, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Fade,Zoom } from "react-awesome-reveal";

// import React, { useState, useEffect } from "react";
// import "../Styles/CarRentalPage.css";
// import { Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaStar, FaUsers, FaMapMarkerAlt, FaClock } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { Fade, Zoom } from "react-awesome-reveal";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase"; // ✅ Ensure your firebase.js exports db = getFirestore(app);
// import React, { useState, useEffect } from "react";
// import "../Styles/CarRentalPage.css";
// import { Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   FaStar,
//   FaUsers,
//   FaMapMarkerAlt,
//   FaClock,
// } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { Fade, Zoom } from "react-awesome-reveal";
import { db } from "../firebase"; // ✅ your firebase config file
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const CitiesPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    phone: "",
    message: "",
    duration: "",
    serviceType: "",
  });
  const [filters, setFilters] = useState({
    category: "All",
    destination: "All",
    search: "",
  });

  const navigate = useNavigate();

  // ✅ Fetch cities from Firebase Firestore
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "All Cities"));
        const cities = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTours(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  // ✅ Extract unique destinations
  const destinations = ["All", ...new Set(tours.map((t) => t.province))];

  // ✅ Filtered Tours
  const filteredTours = tours.filter((t) => {
    const matchCategory =
      filters.category === "All" ||
      (Array.isArray(t.category) && t.category.includes(filters.category));
    const matchDestination =
      filters.destination === "All" || t.province === filters.destination;
    const matchSearch = t.Place_Name?.toLowerCase().includes(
      filters.search.toLowerCase()
    );
    return matchCategory && matchDestination && matchSearch;
  });

  // ✅ Handle booking popup open
  const handleBook = (tour) => {
    setSelectedTour(tour);
    setShowForm(true);
  };

  // ✅ Save booking data to Firebase
  const handleConfirm = async () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.cnic ||
      !selectedTour
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "WebsiteBooking"), {
        name: formData.name,
        cnic: formData.cnic,
        phone: formData.phone,
        type:
          formData.serviceType ||
          (selectedTour.category && selectedTour.category[0]) ||
          "N/A",
        message: formData.message || "",
        service: "City-booking",
        cityName: selectedTour.Place_Name,
        createdAt: serverTimestamp(),
      });

      alert("✅ Booking successfully submitted!");
      setShowForm(false);
      setFormData({
        name: "",
        cnic: "",
        phone: "",
        message: "",
        duration: "",
        serviceType: "",
      });
      navigate("/Cities");
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("❌ Error while saving booking!");
    }
  };

  return (

    <>
    <Helmet>
  <title>Explore Cities | The Journey Loop</title>
  <meta
    name="description"
    content="Discover Pakistan’s top destinations—Skardu, Hunza, Lahore and more. Browse city guides, highlights, tour packages and travel tips from The Journey Loop."
  />
</Helmet>
    <div className="container" style={{ marginTop: "90px" }}>
      <h2
        className="text-center fw-bold mb-4 mt-5"
        style={{ color: "#0C3A2E", fontFamily: "Playfair Display" }}
      >
        Explore Cities
      </h2>

      {/* Filters */}
      <Fade triggerOnce>
        <div className="row g-2 mb-4 align-items-center">
          <div className="col-md-3">
            <select
              className="form-select"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
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
              onChange={(e) =>
                setFilters({ ...filters, destination: e.target.value })
              }
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
              placeholder="Search by city name"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
        </div>
      </Fade>

      {/* Tours Grid */}
      <div className="row">
        {loading ? (
          Array(3)
            .fill(0)
            .map((_, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="tour-card shimmer"></div>
              </div>
            ))
        ) : filteredTours.length === 0 ? (
          <div className="text-center w-100 py-5">No cities found.</div>
        ) : (
          filteredTours.map((tour, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <Fade triggerOnce>
                <div className="tour-card shadow-sm h-100">
                  <img
                    src={tour.Place_Images?.[0]}
                    className="card-img-top"
                    alt={tour.Place_Name}
                  />
                  <div className="card-body mx-3 mt-3">
                    <h5 className="fw-bold">{tour.Place_Name}</h5>

                    <div className="d-flex align-items-center gap-3 text-muted mb-2 small">
                      <span>
                        <FaMapMarkerAlt className="me-1" /> {tour.province}
                      </span>
                      <span>
                        <FaClock className="me-1" /> {tour.duration}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="text-warning fw-bold">
                        <FaStar className="me-1" />
                        {tour.rating}
                        <span className="text-muted ms-1">
                          ({tour.reviews})
                        </span>
                      </div>
                      <div className="text-muted small">
                        <FaUsers className="me-1" />
                        Max {tour.maxPeople}
                      </div>
                    </div>

                    <h6 className="fw-bold mb-2">Highlights:</h6>
                    <div className="highlights mb-3">
                      {tour.highlights?.map((item, i) => (
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

      {/* Booking Form Popup */}
      {showForm && selectedTour && (
        <div className="overlay">
          <Zoom triggerOnce>
            <div className="popup">
              <h5 className="mb-4 text-center">
                Book {selectedTour.Place_Name}
              </h5>

              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="CNIC without dashes"
                    maxLength={13}
                    value={formData.cnic}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cnic: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone No. (03001234567)"
                    maxLength={11}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value.replace(/\D/g, ""),
                      })
                    }
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
                        setFormData({
                          ...formData,
                          serviceType: e.target.value,
                        })
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

                <div className="col-12">
                  <textarea
                    className="form-control"
                    placeholder="Message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mt-2">
                <strong className="mx-1">Bonus:</strong>You can also book a ride
                for this destination from{" "}
                <Link to="/ride-courier" className="text-decoration-none">
                  Ride Page
                </Link>
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

export default CitiesPage;

// const CitiesPage = () => {
//   const [hovered, setHovered] = useState(false);
//   const navigate = useNavigate();
//   const [showForm, setShowForm] = useState(false);
//   const [selectedTour, setSelectedTour] = useState(null);
//   const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
//   const [filters, setFilters] = useState({ category: "All", destination: "All", search: "" });
//   const [loading, setLoading] = useState(true);
//   const [tours, setTours] = useState([]);

//   // ✅ Fetch data from Firestore
//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "All Cities"));
//         const fetchedData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTours(fetchedData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching tours:", error);
//         setLoading(false);
//       }
//     };

//     fetchTours();
//   }, []);

//   // ✅ Extract unique destinations (province-based)
//   const destinations = ["All", ...new Set(tours.map((t) => t.province))];

//   // ✅ Apply filters
//   const filteredTours = tours.filter((t) => {
//     const matchCategory =
//       filters.category === "All" || (t.category && t.category.includes(filters.category));
//     const matchDestination =
//       filters.destination === "All" || t.province === filters.destination;
//     const matchSearch =
//       t.Place_Name.toLowerCase().includes(filters.search.toLowerCase());
//     return matchCategory && matchDestination && matchSearch;
//   });

//   const handleBook = (tour) => {
//     setSelectedTour(tour);
//     setShowForm(true);
//   };

//   const handleConfirm = () => {
//     console.log("Booking Data:", { tour: selectedTour, ...formData });
//     setShowForm(false);
//     navigate("/success");
//   };

//   return (
//     <div className="container" style={{ marginTop: "90px" }}>
//       <h2
//         className="text-center fw-bold mb-4 mt-5"
//         style={{ color: "#0C3A2E", fontFamily: "Playfair Displays" }}
//       >
//         Explore Cities
//       </h2>

//       {/* ---------- FILTERS ---------- */}
//       <Fade triggerOnce>
//         <div className="row g-2 mb-4 align-items-center">
//           <div className="col-md-3">
//             <select
//               className="form-select"
//               value={filters.category}
//               onChange={(e) => setFilters({ ...filters, category: e.target.value })}
//             >
//               {["All", "Solo", "Group", "Honeymoon", "Family"].map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
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
//                 <option key={dest} value={dest}>
//                   {dest}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-md-6">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by city name"
//               value={filters.search}
//               onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//             />
//           </div>
//         </div>
//       </Fade>

//       {/* ---------- TOURS GRID ---------- */}
//       <div className="row">
//         {loading ? (
//           Array(3)
//             .fill(0)
//             .map((_, idx) => (
//               <div className="col-md-4 mb-4" key={idx}>
//                 <div className="tour-card shimmer"></div>
//               </div>
//             ))
//         ) : filteredTours.length === 0 ? (
//           <div className="text-center w-100 py-5">No cities found.</div>
//         ) : (
//           filteredTours.map((tour, idx) => (
//             <div className="col-md-4 mb-4" key={tour.id || idx}>
//               <Fade triggerOnce>
//                 <div className="tour-card shadow-sm h-100">
//                   <img
//                     src={tour.Place_Images?.[0] || "/placeholder.jpg"}
//                     className="card-img-top"
//                     alt={tour.Place_Name}
//                   />
//                   <div className="card-body mx-3 mt-3">
//                     <h5 className="fw-bold">{tour.Place_Name}</h5>

//                     <div className="d-flex align-items-center gap-3 text-muted mb-2 small">
//                       <span>
//                         <FaMapMarkerAlt className="me-1" /> {tour.province}
//                       </span>
//                       <span>
//                         <FaClock className="me-1" /> {tour.duration || "N/A"}
//                       </span>
//                     </div>

//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                       <div className="text-warning fw-bold">
//                         <FaStar className="me-1" />
//                         {tour.rating || "N/A"}
//                         <span className="text-muted ms-1">
//                           ({tour.reviews || 0})
//                         </span>
//                       </div>
//                       <div className="text-muted small">
//                         <FaUsers className="me-1" />
//                         Max {tour.maxPeople || "-"}
//                       </div>
//                     </div>

//                     <h6 className="fw-bold mb-2">Highlights:</h6>
//                     <div className="highlights mb-3">
//                       {tour.highlights?.slice(0, 3).map((item, i) => (
//                         <span key={i} className="highlight-pill">
//                           {item}
//                         </span>
//                       ))}
//                     </div>

//                     <div
//                       className="split-btn-container w-100 mb-3"
//                       style={{
//                         display: "flex",
//                         gap: "10px",
//                         borderRadius: "8px",
//                         overflow: "hidden",
//                       }}
//                     >
//                       <button
//                         className="btn flex-fill"
//                         style={{
//                           backgroundColor: "#0C3A2E",
//                           color: "white",
//                           border: "none",
//                         }}
//                         onClick={() => handleBook(tour)}
//                       >
//                         Book Now
//                       </button>

//                       <button
//                         className="btn flex-fill"
//                         style={{
//                           backgroundColor: "#0C3A2E",
//                           color: "white",
//                           border: "none",
//                         }}
//                         onClick={() =>
//                           navigate(`/destinationdetail/${tour.id}`)
//                         }
//                       >
//                         Detail
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </Fade>
//             </div>
//           ))
//         )}
//       </div>

//       {/* ---------- BOOKING POPUP ---------- */}
//       {showForm && selectedTour && (
//         <div className="overlay">
//           <Zoom triggerOnce>
//             <div className="popup">
//               <h5 className="mb-4 text-center">Book {selectedTour.Place_Name}</h5>

//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Your Full Name"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="CNIC without dashes"
//                     maxLength={13}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         cnic: e.target.value.replace(/\D/g, ""),
//                       })
//                     }
//                   />
//                 </div>

//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Phone No. (03001234567)"
//                     maxLength={11}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         phone: e.target.value.replace(/\D/g, ""),
//                       })
//                     }
//                   />
//                 </div>

//                 <div className="col-md-6">
//                   <select
//                     className="form-select"
//                     value={formData.duration}
//                     onChange={(e) =>
//                       setFormData({ ...formData, duration: e.target.value })
//                     }
//                   >
//                     <option value="">Select Duration</option>
//                     <option value="1 Day">1 Day</option>
//                     <option value="2 Days">2 Days</option>
//                     <option value="3 Days">3 Days</option>
//                     <option value="1 Week">1 Week</option>
//                     <option value="2 Weeks">2 Weeks</option>
//                   </select>
//                 </div>

//                 <div className="col-12">
//                   <textarea
//                     className="form-control"
//                     placeholder="Message"
//                     rows={4}
//                     onChange={(e) =>
//                       setFormData({ ...formData, message: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="mt-2">
//                 <strong className="mx-1">Bonus:</strong>You can also book a ride
//                 for this destination via{" "}
//                 <Link to="/ride-courier" className="text-decoration-none">
//                   Ride Page
//                 </Link>
//               </div>

//               <div className="d-flex justify-content-end gap-2 mt-3">
//                 <button
//                   className="btn btn-secondary w-50"
//                   onClick={() => setShowForm(false)}
//                 >
//                   Cancel
//                 </button>
//                 <motion.button
//                   className="btn btn-primary btn-modern w-50"
//                   whileHover={{ scale: 1.05 }}
//                   onClick={handleConfirm}
//                 >
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

// export default CitiesPage;
