import React, { useState, useEffect } from "react";
import "../Styles/CarRentalPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaCarSide, FaGasPump, FaUsers } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import { Helmet } from "react-helmet-async";
// import React, { useState } from "react";
// import "../Styles/CarRentalPage.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaStar, FaCarSide, FaGasPump, FaUsers } from "react-icons/fa";
// import { MdCheckCircle } from "react-icons/md";
import { motion } from "framer-motion";
import { Fade, Zoom, Slide } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // ✅ your firebase config file
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";


// File: src/pages/CarRentalPage.jsx  (or wherever you keep it)
// import React, { useState, useEffect } from "react";
// import "../Styles/CarRentalPage.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaStar, FaCarSide, FaGasPump, FaUsers } from "react-icons/fa";
// import { MdCheckCircle } from "react-icons/md";
// import { motion } from "framer-motion";
// import { Fade, Zoom, Slide } from "react-awesome-reveal";
// import { useNavigate } from "react-router-dom";

// // Firestore
// import { db } from "../firebase";
// import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

const CarRentalPage = () => {
  const navigate = useNavigate();

  // UI state
  const [showForm, setShowForm] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Data state
  const [cars, setCars] = useState([]);

  // booking form state
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    phone: "",
    message: "",
    duration: "",
    serviceType: "",
    date: "",
    time: "",
    days: 1,
  });

  // Fetch cars from Firestore collection "Cars"
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const snap = await getDocs(collection(db, "Cars"));
        const fetched = snap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.Car_name || data.name || "Unnamed Car",
            seats: data.seats ?? data.Seats ?? 4,
            type: data.transmission || data.type || "Automatic",
            fuel: data.fuel || data.Fuel || "Petrol",
            features: data.Features || data.features || [],
            daily: data.daily_price ?? data.daily ?? 0,
            rating: data.rating ?? 4.5,
            categories: Array.isArray(data.category) ? data.category : (data.category ? [data.category] : data.categories || []),
            priceTag: `$${data.daily_price ?? data.daily ?? 0}/day`,
            available: data.availability ?? data.available ?? true,
            img: data.Place_Images?.[0] || data.img || "https://preview--wheels-and-wanderlust.lovable.app/assets/cars-showroom-BTcD30uv.jpg",
            raw: data, // raw document if you need more fields later
          };
        });
        setCars(fetched);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // filter logic
  const filteredCars = filter === "All" ? cars : cars.filter((c) => c.categories?.includes(filter));

  // open booking form
  const handleBook = (car) => {
    setSelectedCar(car);
    setFormData({
      name: "",
      cnic: "",
      phone: "",
      message: "",
      serviceType: "",
      date: "",
      time: "",
      days: 1,
    });
    setShowForm(true);
  };

  // save booking to WebsiteBooking
  const handleConfirm = async () => {
    // basic validation
    if (!formData.name) {
      alert("Please enter your name.");
      return;
    }
    if (formData.phone && formData.phone.length !== 11) {
      alert("Phone must be 11 digits.");
      return;
    }
    if (formData.cnic && formData.cnic.length !== 13) {
      alert("CNIC must be 13 digits.");
      return;
    }
    if (!selectedCar) {
      alert("No car selected.");
      return;
    }

    // prepare booking payload
    const bookingPayload = {
      name: formData.name,
      cnic: formData.cnic || null,
      phone: formData.phone || null,
      message: formData.message || "",
      date: formData.date || null,
      time: formData.time || null,
      days: Number(formData.days) || 1,
      serviceType: formData.serviceType || "RentACar",
      service: "RentACar", // required extra entry
      createdAt: serverTimestamp(),

      // car details
      carId: selectedCar.id,
      carName: selectedCar.name,
      carDailyPrice: selectedCar.daily,
      carSeats: selectedCar.seats,
      carType: selectedCar.type,
      carFuel: selectedCar.fuel,
      carFeatures: selectedCar.features,
      carImg: selectedCar.img,

      // computed
      totalPrice: (selectedCar.daily || 0) * (Number(formData.days) || 1),
    };

    try {
      await addDoc(collection(db, "WebsiteBooking"), bookingPayload);
      alert("✅ Booking saved successfully!");
      setShowForm(false);
      // optionally navigate to a success page:
      navigate("/success");
    } catch (err) {
      console.error("Error saving booking:", err);
      alert("❌ Failed to save booking. See console for details.");
    }
  };

  return (
    <>

    <Helmet>
  <title>Rent a Car | The Journey Loop</title>
  <meta
    name="description"
    content="Rent quality cars with driver or self-drive options from The Journey Loop. Affordable daily rates, professional service and pickup across major cities in Pakistan."
  />
</Helmet>

    <div className="container" style={{ marginTop: "90px", minHeight: "60vh"}}>
      <Fade triggerOnce>
        <h2 className="text-center mb-4 fw-bold" style={{ fontFamily: "Playfair Display" }}>Rent a Car</h2>
      </Fade>

      {/* Filters */}
      <div className="d-flex justify-content-center mb-4 gap-3 flex-wrap">
        {["All", "Economy", "Standard", "Luxury"].map((cat) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            key={cat}
            className={`btn ${filter === cat ? "btn-primary" : "btn-outline-success"}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Car Cards */}
      <div className="row">
        {loading && (
          <div className="text-center w-100 py-5">Loading cars...</div>
        )}

        {!loading && filteredCars.length === 0 && (
          <div className="text-center w-100 py-5">No cars available in this category.</div>
        )}

        {!loading && filteredCars.map((car, idx) => (
          <div className="col-md-4 mb-5" key={car.id || idx}>
            <Slide triggerOnce>
              <div className="car-card shadow-sm h-100">
                <div className="car-image">
                  <img src={car.img} className="card-img-top" alt={car.name} />
                </div>

                <div className="card-body mx-3">
                  <div className="d-flex justify-content-between align-items-center mb-2 mt-3">
                    <h5 className="fw-bold m-0">{car.name}</h5>
                    <span className="rating">
                      <FaStar className="text-warning me-1" />
                      {car.rating}
                    </span>
                  </div>

                  <div className="car-meta mb-2">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center mb-1">
                        <FaUsers className="me-2 text-secondary" />
                        <span>{car.seats} Seats</span>
                      </div>
                      <div className="col-6 d-flex align-items-center mb-1">
                        <FaCarSide className="me-2 text-secondary" />
                        <span>{car.type}</span>
                      </div>
                      <div className="col-6 d-flex align-items-center mb-1">
                        <FaGasPump className="me-2 text-secondary" />
                        <span>{car.fuel}</span>
                      </div>
                    </div>
                  </div>

                  <h6 className="fw-bold mt-2">Features:</h6>
                  <div className="feature-grid">
                    {car.features.map((feature, i) => (
                      <div key={i} className="feature-item">
                        <MdCheckCircle className="feature-icon" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="btn book-btn mt-3 w-100 mb-3"
                    style={{ color: "white", backgroundColor: "#0C3A2E" }}
                    onClick={() => handleBook(car)}
                    disabled={!car.available}
                  >
                    {car.available ? "Book Now" : "Unavailable"}
                  </button>

                  <div className="text-muted small">Price: {car.priceTag}</div>
                </div>
              </div>
            </Slide>
          </div>
        ))}
      </div>

      {/* Booking Form Popup */}
      {showForm && selectedCar && (
        <div className="overlay">
          <Zoom triggerOnce>
            <div className="popup">
              <h5 className="mb-4 text-center">Book {selectedCar.name}</h5>

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
                  <select
                    className="form-select"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  >
                    <option value="">Service Type</option>
                    <option value="withinCity">Within City</option>
                    <option value="withoutCity">Without City</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="time"
                    className="form-control"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    placeholder="Rental Days"
                    value={formData.days}
                    onChange={(e) => setFormData({ ...formData, days: Number(e.target.value) })}
                  />
                </div>

                <div className="col-md-6">
                  <textarea
                    className="form-control"
                    placeholder="Message"
                    value={formData.message}
                    rows={4}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-3 fw-bold text-end">
                Total Price: ${ (selectedCar.daily || 0) * (Number(formData.days) || 1) }
              </div>

              <div className="d-flex justify-content-end gap-2 mt-3">
                <button className="btn btn-secondary w-50" onClick={() => setShowForm(false)}>
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

export default CarRentalPage;

// const CarRentalPage = () => {
//   const navigate = useNavigate();
//   const [showForm, setShowForm] = useState(false);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [filter, setFilter] = useState("All");
// const [formData, setFormData] = useState({
//     name: "",
//     cnic: "",
//     phone: "",
//     message: "",
//     duration: "",
//     serviceType: "",
//   });

//   const cars = [
//     {
//       name: "Mercedes E-Class",
//       seats: 5,
//       type: "Automatic",
//       fuel: "Petrol",
//       features: ["GPS Navigation", "AC", "Bluetooth", "Leather Seats"],
//       daily: 120,
//       rating: 4.9,
//       categories: ["Luxury"],
//       priceTag: "$120/day",
//       available: true,
//       img: "https://preview--wheels-and-wanderlust.lovable.app/assets/cars-showroom-BTcD30uv.jpg",
//     },
//     {
//       name: "Suzuki Alto",
//       seats: 4,
//       type: "Automatic",
//       fuel: "Petrol",
//       features: ["AC", "Bluetooth"],
//       daily: 30,
//       rating: 4.0,
//       categories: ["Economy"],
//       priceTag: "$30/day",
//       available: true,
//       img: "https://preview--wheels-and-wanderlust.lovable.app/assets/cars-showroom-BTcD30uv.jpg",
//     },
//     {
//       name: "Toyota Corolla",
//       seats: 5,
//       type: "Automatic",
//       fuel: "Petrol",
//       features: ["AC", "GPS Navigation", "Bluetooth"],
//       daily: 70,
//       rating: 4.5,
//       categories: ["Standard"],
//       priceTag: "$70/day",
//       available: true,
//       img: "https://preview--wheels-and-wanderlust.lovable.app/assets/cars-showroom-BTcD30uv.jpg",
//     },
//   ];

//   const filteredCars =
//     filter === "All" ? cars : cars.filter((c) => c.categories.includes(filter));

//   const handleBook = (car) => {
//     setSelectedCar(car);
//     setFormData({
//       name: "",
//       cnic: "",
//       phone: "",
//       message: "",
//       serviceType: "",
//       date: "",
//       time: "",
//       days: 1,
//     });
//     setShowForm(true);
//   };

//   const handleConfirm = () => {
//     // Optional: validation can be added here
//     console.log("Booking Data:", { car: selectedCar, ...formData });
//     setShowForm(false);
//     navigate("/success");
//   };

//   return (
//     <div className="container " style={{marginTop:"90px"}}>
//       <Fade triggerOnce>
//         <h2 className="text-center mb-4 fw-bold" style={{fontFamily:"Playfair Displays"}}>Rent a Car</h2>
//       </Fade>

//       {/* Filters */}
//       <div className="d-flex justify-content-center mb-4 gap-3 flex-wrap">
//         {["All", "Economy", "Standard", "Luxury"].map((cat) => (
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             key={cat}
//             className={`btn ${filter === cat ? "btn-primary" : "btn-outline-success"}`}
//             onClick={() => setFilter(cat)}
//           >
//             {cat}
//           </motion.button>
//         ))}
//       </div>

//       {/* Car Cards */}
//       <div className="row">
//         {filteredCars.length === 0 && (
//           <div className="text-center w-100 py-5">No cars available in this category.</div>
//         )}

//         {filteredCars.map((car, idx) => (
//           <div className="col-md-4 mb-5" key={idx}>
//             <Slide triggerOnce>
//               <div className="car-card shadow-sm h-100">
//                 <div className="car-image">
//                   <img src={car.img} className="card-img-top" alt={car.name} />
//                 </div>

//                 <div className="card-body mx-3">
//                   <div className="d-flex justify-content-between align-items-center mb-2 mt-3">
//                     <h5 className="fw-bold m-0">{car.name}</h5>
//                     <span className="rating">
//                       <FaStar className="text-warning me-1" />
//                       {car.rating}
//                     </span>
//                   </div>

//                   <div className="car-meta mb-2">
//                     <div className="row">
//                       <div className="col-6 d-flex align-items-center mb-1">
//                         <FaUsers className="me-2 text-secondary" />
//                         <span>{car.seats} Seats</span>
//                       </div>
//                       <div className="col-6 d-flex align-items-center mb-1">
//                         <FaCarSide className="me-2 text-secondary" />
//                         <span>{car.type}</span>
//                       </div>
//                       <div className="col-6 d-flex align-items-center mb-1">
//                         <FaGasPump className="me-2 text-secondary" />
//                         <span>{car.fuel}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <h6 className="fw-bold mt-2">Features:</h6>
//                   <div className="feature-grid">
//                     {car.features.map((feature, i) => (
//                       <div key={i} className="feature-item">
//                         <MdCheckCircle className="feature-icon" />
//                         <span>{feature}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <button
//                     className="btn book-btn mt-3 w-100 mb-3" style={{color:"white",backgroundColor:"#0C3A2E"}}
//                     onClick={() => handleBook(car)}
//                   >
//                     Book Now 
//                     {/* ({car.priceTag}) */}
//                   </button>
//                 </div>
//               </div>
//             </Slide>
//           </div>
//         ))}
//       </div>

//       {/* Booking Form Popup */}
// {showForm && selectedCar && (
//   <div className="overlay">
//     <Zoom triggerOnce>
//       <div className="popup">
//         <h5 className="mb-4 text-center">Book {selectedCar.name}</h5>

//         <div className="row g-3">
//           <div className="col-md-6">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Your Full Name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             />
//           </div>

//           <div className="col-md-6">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="CNIC without dashes"
//               value={formData.cnic}
//               maxLength={13}
//               onChange={(e) => {
//                 const digitsOnly = e.target.value.replace(/\D/g, ""); // allow only digits
//                 setFormData({ ...formData, cnic: digitsOnly });
//               }}
//             />
//           </div>

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

//           <div className="col-md-6">
//             <select
//               className="form-select"
//               value={formData.serviceType}
//               onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
//             >
//               <option value="">Service Type</option>
//               <option value="withinCity">Within City</option>
//               <option value="withoutCity">Without City</option>
//             </select>
//           </div>

//           <div className="col-md-6">
//             <input
//               type="date"
//               className="form-control"
//               value={formData.date}
//               onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//             />
//           </div>

//           <div className="col-md-6">
//             <input
//               type="time"
//               className="form-control"
//               value={formData.time}
//               onChange={(e) => setFormData({ ...formData, time: e.target.value })}
//             />
//           </div>

//           <div className="col-md-6">
//             <input
//               type="number"
//               min="1"
//               className="form-control"
//               placeholder="Rental Days"
//               value={formData.days}
//               onChange={(e) => setFormData({ ...formData, days: Number(e.target.value) })}
//             />
//           </div>

//           <div className="col-md-6">
//             <textarea
//               className="form-control"
//               placeholder="Message"
//               value={formData.message}
//               rows={4} // make textarea bigger
//               onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//             />
//           </div>
//         </div>

//         <div className="mt-3 fw-bold text-end">
//           Total Price: ${selectedCar.daily * formData.days}
//         </div>

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

// export default CarRentalPage;

