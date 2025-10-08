import React, { useState } from "react";
import "../Styles/CarRentalPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaCarSide, FaGasPump, FaUsers } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";

// import React, { useState } from "react";
// import "../Styles/CarRentalPage.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaStar, FaCarSide, FaGasPump, FaUsers } from "react-icons/fa";
// import { MdCheckCircle } from "react-icons/md";
import { motion } from "framer-motion";
import { Fade, Zoom, Slide } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

const CarRentalPage = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [filter, setFilter] = useState("All");
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    phone: "",
    message: "",
    serviceType: "",
    date: "",
    time: "",
    days: 1,
  });

  const cars = [
    {
      name: "Mercedes E-Class",
      seats: 5,
      type: "Automatic",
      fuel: "Petrol",
      features: ["GPS Navigation", "AC", "Bluetooth", "Leather Seats"],
      daily: 120,
      rating: 4.9,
      categories: ["Luxury"],
      priceTag: "$120/day",
      available: true,
      img: "https://preview--wheels-and-wanderlust.lovable.app/assets/cars-showroom-BTcD30uv.jpg",
    },
    {
      name: "Suzuki Alto",
      seats: 4,
      type: "Automatic",
      fuel: "Petrol",
      features: ["AC", "Bluetooth"],
      daily: 30,
      rating: 4.0,
      categories: ["Economy"],
      priceTag: "$30/day",
      available: true,
      img: "https://preview--wheels-and-wanderlust.lovable.app/assets/cars-showroom-BTcD30uv.jpg",
    },
    {
      name: "Toyota Corolla",
      seats: 5,
      type: "Automatic",
      fuel: "Petrol",
      features: ["AC", "GPS Navigation", "Bluetooth"],
      daily: 70,
      rating: 4.5,
      categories: ["Standard"],
      priceTag: "$70/day",
      available: true,
      img: "https://preview--wheels-and-wanderlust.lovable.app/assets/cars-showroom-BTcD30uv.jpg",
    },
  ];

  const filteredCars =
    filter === "All" ? cars : cars.filter((c) => c.categories.includes(filter));

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

  const handleConfirm = () => {
    // Optional: validation can be added here
    console.log("Booking Data:", { car: selectedCar, ...formData });
    setShowForm(false);
    navigate("/success");
  };

  return (
    <div className="container " style={{marginTop:"90px"}}>
      <Fade triggerOnce>
        <h2 className="text-center mb-4 fw-bold" style={{fontFamily:"Playfair Displays"}}>Rent a Car</h2>
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
        {filteredCars.length === 0 && (
          <div className="text-center w-100 py-5">No cars available in this category.</div>
        )}

        {filteredCars.map((car, idx) => (
          <div className="col-md-4 mb-5" key={idx}>
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
                    className="btn book-btn mt-3 w-100 mb-3" style={{color:"white",backgroundColor:"#0C3A2E"}}
                    onClick={() => handleBook(car)}
                  >
                    Book Now 
                    {/* ({car.priceTag}) */}
                  </button>
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
                const digitsOnly = e.target.value.replace(/\D/g, ""); // allow only digits
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
              rows={4} // make textarea bigger
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-3 fw-bold text-end">
          Total Price: ${selectedCar.daily * formData.days}
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
  );
};

export default CarRentalPage;

