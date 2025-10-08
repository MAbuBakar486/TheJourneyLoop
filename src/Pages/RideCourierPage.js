import React, { useState, useEffect } from "react";
import LocationAutocompleteInput from "../BookingService/LocationAutocompleteInput.js";
import GoogleMapWithRoute from "../BookingService/GoogleMapWithRoute.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/RideCourierPage.css";


// const RideCourierPage = () => {
//   const [selectedService, setSelectedService] = useState("ride");
//   const [form, setForm] = useState({
//     useCurrentLocation: false,
//     pickupLocation: null,
//     dropLocation: null,
//   });

//   // ✅ Handle input / checkbox changes
//   const handleChange = (e) => {
//     const { name, type, checked, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // ✅ Get current location if checked
//   useEffect(() => {
//     if (form.useCurrentLocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const geocoder = new window.google.maps.Geocoder();
//           const latlng = { lat: latitude, lng: longitude };

//           geocoder.geocode({ location: latlng }, (results, status) => {
//             if (status === "OK" && results[0]) {
//               setForm((prev) => ({
//                 ...prev,
//                 pickupLocation: {
//                   lat: latitude,
//                   lng: longitude,
//                   address: results[0].formatted_address,
//                 },
//               }));
//             } else {
//               alert("Unable to retrieve address.");
//             }
//           });
//         },
//         () => alert("Failed to get current location.")
//       );
//     }
//   }, [form.useCurrentLocation]);

//   return (
//     <div className="ride-courier-container py-5">
//       <div className="container">
//         <h2 className="text-center mb-4 fw-bold text-primary">
//           Book Your Service
//         </h2>

//         {/* === Toggle Buttons === */}
//         <div className="d-flex justify-content-center mb-4">
//           <button
//             className={`btn mx-2 ${
//               selectedService === "ride" ? "btn-primary" : "btn-outline-primary"
//             }`}
//             onClick={() => setSelectedService("ride")}
//           >
//             Book a Ride
//           </button>
//           <button
//             className={`btn mx-2 ${
//               selectedService === "courier"
//                 ? "btn-primary"
//                 : "btn-outline-primary"
//             }`}
//             onClick={() => setSelectedService("courier")}
//           >
//             Courier Request
//           </button>
//         </div>

//         {/* === Service Form === */}
//         <div className="card shadow p-4">
//           <h4 className="mb-3 text-secondary">
//             {selectedService === "ride"
//               ? "Book Your Ride"
//               : "Send a Courier Request"}
//           </h4>

//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Pick-up Location</label>
//               <LocationAutocompleteInput
//                 placeholder="Enter Pickup Location"
//                 value={form.pickupLocation}
//                 onSelect={(location) =>
//                   setForm((prev) => ({ ...prev, pickupLocation: location }))
//                 }
//               />
//               <div className="form-switch mt-2">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   name="useCurrentLocation"
//                   id="useCurrentLocation"
//                   checked={form.useCurrentLocation}
//                   onChange={handleChange}
//                 />
//                 <label
//                   htmlFor="useCurrentLocation"
//                   className="form-check-label ms-2"
//                 >
//                   Use Current Location
//                 </label>
//               </div>
//             </div>

//             <div className="col-md-6 mb-3">
//               <label className="form-label">Drop-off Location</label>
//               <LocationAutocompleteInput
//                 placeholder="Enter Drop Location"
//                 value={form.dropLocation}
//                 onSelect={(location) =>
//                   setForm((prev) => ({ ...prev, dropLocation: location }))
//                 }
//               />
//             </div>
//           </div>

//           {selectedService === "courier" && (
//             <>
//               <div className="row">
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Package Weight (kg)</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     name="packageWeight"
//                     placeholder="e.g. 2"
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Receiver Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="receiverName"
//                     placeholder="Receiver full name"
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//             </>
//           )}

//           {form.pickupLocation && form.dropLocation && (
//             <div className="mt-4">
//               <GoogleMapWithRoute
//                 origin={{
//                   lat: form.pickupLocation.lat,
//                   lng: form.pickupLocation.lng,
//                 }}
//                 destination={{
//                   lat: form.dropLocation.lat,
//                   lng: form.dropLocation.lng,
//                 }}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RideCourierPage;


import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { Fade, Slide, Zoom } from "react-awesome-reveal";


const PHONE_FIELDS = ["number", "senderPhone", "recipientPhone"];

const sanitizeDigits = (val = "", maxLen = 11) => {
  const digits = String(val).replace(/\D/g, "");
  return digits.slice(0, maxLen);
};

const RideCourierPage = () => {
  const [selectedService, setSelectedService] = useState("ride");
  const [form, setForm] = useState({
    // locations
    useCurrentLocation: false,
    pickupLocation: null,
    dropLocation: null,

    // Ride fields
    name: "",
    number: "",
    date: "",
    time: "",
    passengers: "",
    vehicleType: "",
    selectedVehicle: "",
    specialInstruction: "",

    // Courier fields
    senderName: "",
    senderPhone: "",
    recipientName: "",
    recipientPhone: "",
    pickupDate: "",
    pickupTime: "",
    priorityType: "",
    packageType: "",
    weight: "",
    estimatedValue: "",
    courierSpecialInstruction: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // sanitize on typing/paste
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (PHONE_FIELDS.includes(name)) {
      const sanitized = sanitizeDigits(value, 11);
      setForm((p) => ({ ...p, [name]: sanitized }));
      return;
    }

    // For weight & estimatedValue allow digits and decimal
    if (name === "weight" || name === "estimatedValue") {
      const sanitized = String(value).replace(/[^0-9.]/g, "");
      setForm((p) => ({ ...p, [name]: sanitized }));
      return;
    }

    if (type === "checkbox") {
      setForm((p) => ({ ...p, [name]: checked }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  // allow LocationAutocompleteInput to set locations
  const handleLocationSelect = (fieldName, locationObj) => {
    setForm((p) => ({ ...p, [fieldName]: locationObj }));
  };

  // geolocation -> pickup
  useEffect(() => {
    if (!form.useCurrentLocation) return;
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat: latitude, lng: longitude };
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === "OK" && results[0]) {
            setForm((prev) => ({
              ...prev,
              pickupLocation: {
                lat: latitude,
                lng: longitude,
                address: results[0].formatted_address,
              },
            }));
          } else {
            console.error("Geocoder:", status);
          }
        });
      },
      (err) => {
        console.error(err);
        alert("Unable to access current location.");
      }
    );
  }, [form.useCurrentLocation]);

  // Validation
  const validate = () => {
    const e = {};

    // Common: locations
    if (!form.pickupLocation || !form.pickupLocation.address)
      e.pickupLocation = "Pick-up location is required.";
    if (!form.dropLocation || !form.dropLocation.address)
      e.dropLocation = "Drop-off location is required.";

    if (selectedService === "ride") {
      if (!form.name?.trim()) e.name = "Name is required.";
      if (!form.number || form.number.length !== 11)
        e.number = "Enter valid 11-digit phone (e.g. 03001234567).";
      if (!form.date) e.date = "Date is required.";
      if (!form.time) e.time = "Time is required.";
      if (!form.passengers || Number(form.passengers) <= 0)
        e.passengers = "Passengers must be > 0.";
      if (!form.vehicleType) e.vehicleType = "Please choose a vehicle type.";
      if (!form.selectedVehicle) e.selectedVehicle = "Please select a vehicle.";
    } else {
      // courier
      if (!form.senderName?.trim()) e.senderName = "Sender name is required.";
      if (!form.senderPhone || form.senderPhone.length !== 11)
        e.senderPhone = "Enter sender phone 11 digits (e.g. 03001234567).";
      if (!form.recipientName?.trim())
        e.recipientName = "Recipient name is required.";
      if (!form.recipientPhone || form.recipientPhone.length !== 11)
        e.recipientPhone =
          "Enter recipient phone 11 digits (e.g. 03001234567).";
      if (!form.pickupDate) e.pickupDate = "Pickup date is required.";
      if (!form.pickupTime) e.pickupTime = "Pickup time is required.";
      if (!form.priorityType) e.priorityType = "Select priority.";
      if (!form.packageType) e.packageType = "Select package type.";
      if (!form.weight) e.weight = "Weight is required.";
      if (!form.estimatedValue) e.estimatedValue = "Estimated value is required.";
    }

    return e;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const eobj = validate();
  setErrors(eobj);
  setSubmitted(false);

  if (Object.keys(eobj).length > 0) {
    const first = Object.keys(eobj)[0];
    const el = document.querySelector(`[name="${first}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  setErrors({});
  setSubmitted(true);

  try {
    const payload = {
      serviceType: selectedService, // "ride" or "courier"
      createdAt: Timestamp.now(),
    };

    if (selectedService === "ride") {
      Object.assign(payload, {
        name: form.name,
        number: form.number,
        date: form.date,
        time: form.time,
        passengers: form.passengers,
        vehicleType: form.vehicleType,
        selectedVehicle: form.selectedVehicle,
        specialInstruction: form.specialInstruction,
        pickupLocation: form.pickupLocation,
        dropLocation: form.dropLocation,
      });
    } else {
      Object.assign(payload, {
        senderName: form.senderName,
        senderPhone: form.senderPhone,
        recipientName: form.recipientName,
        recipientPhone: form.recipientPhone,
        pickupDate: form.pickupDate,
        pickupTime: form.pickupTime,
        priorityType: form.priorityType,
        packageType: form.packageType,
        weight: form.weight,
        estimatedValue: form.estimatedValue,
        courierSpecialInstruction: form.courierSpecialInstruction,
        pickupLocation: form.pickupLocation,
        dropLocation: form.dropLocation,
      });
    }

    // Save to Firestore
    await addDoc(collection(db, "requests"), payload);

    console.log("✅ Data saved to Firestore:", payload);
    alert("Your request has been submitted successfully!");


    setSubmitted(true);
    // Automatically hide success message after 5 seconds
setTimeout(() => {
  setSubmitted(false);
}, 5000);

// Reset all form fields
setForm({
  useCurrentLocation: false,
  pickupLocation: null,
  dropLocation: null,
  name: "",
  number: "",
  date: "",
  time: "",
  passengers: "",
  vehicleType: "",
  selectedVehicle: "",
  specialInstruction: "",
  senderName: "",
  senderPhone: "",
  recipientName: "",
  recipientPhone: "",
  pickupDate: "",
  pickupTime: "",
  priorityType: "",
  packageType: "",
  weight: "",
  estimatedValue: "",
  courierSpecialInstruction: "",
});

  } catch (error) {
    console.error("❌ Firestore Error:", error);
    alert("Something went wrong while saving. Please try again.");
  }
};

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const eobj = validate();
  //   setErrors(eobj);
  //   setSubmitted(false);

  //   if (Object.keys(eobj).length > 0) {
  //     // focus first error field (optional)
  //     const first = Object.keys(eobj)[0];
  //     const el = document.querySelector(`[name="${first}"]`);
  //     if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  //     return;
  //   }

  //   // success
  //   setErrors({});
  //   setSubmitted(true);

  //   // TODO: send to your backend / firebase here
  //   console.log("FORM SUBMIT:", form);
  // };

  // vehicle choices per type
  const vehiclesFor = {
    economy: ["Suzuki Alto", "Toyota Vitz", "Honda City"],
    comfort: ["Toyota Corolla", "Honda Civic", "MG HS"],
    luxury: ["Audi A6", "BMW 5 Series", "Mercedes C-Class"],
  };

  return (
    <div className="ride-courier-container" style={{marginTop:"90px",marginBottom:"30px"}}>
      <div className="container">
        <Fade triggerOnce>
          <h2 className="text-center mb-4 fw-bold" style={{fontFamily:"Playfair Display"}}>Book Your Service</h2>
        </Fade>

        <div className="d-flex justify-content-center mb-4">
          <button
            className={`btn mx-2 ${selectedService === "ride" ? "btn-primary" : "btn-outline-success"}`}
            onClick={() => {
              setSelectedService("ride");
              setErrors({});
              setSubmitted(false);
            }}
          >
            Book a Ride
          </button>
          <button
            className={`btn mx-2 ${selectedService === "courier" ? "btn-primary" : "btn-outline-success"}`}
            onClick={() => {
              setSelectedService("courier");
              setErrors({});
              setSubmitted(false);
            }}
          >
            Courier Request
          </button>
        </div>

        <motion.form
          className="card shadow p-4"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h4 className="mb-3 text-secondary">{selectedService === "ride" ? "Book a Ride" : "Courier Request"}</h4>

          {/* --- pickup / drop --- */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Pick-up Location</label>
              <LocationAutocompleteInput
                placeholder="Enter Pickup Location"
                value={form.pickupLocation}
                onSelect={(loc) => handleLocationSelect("pickupLocation", loc)}
              />
              <div className="form-switch mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="useCurrentLocation"
                  id="useCurrentLocation"
                  checked={form.useCurrentLocation}
                  onChange={handleChange}
                />
                <label htmlFor="useCurrentLocation" className="form-check-label ms-2">
                  Use Current Location
                </label>
              </div>
              {errors.pickupLocation && <div className="error-text mt-1">{errors.pickupLocation}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Drop-off Location</label>
              <LocationAutocompleteInput
                placeholder="Enter Drop Location"
                value={form.dropLocation}
                onSelect={(loc) => handleLocationSelect("dropLocation", loc)}
              />
              {errors.dropLocation && <div className="error-text mt-1">{errors.dropLocation}</div>}
            </div>
          </div>

          {/* --- RIDE --- */}
          {selectedService === "ride" && (
            <Zoom triggerOnce>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name</label>
                  <input name="name" className={`form-control ${errors.name ? "is-invalid" : ""}`} onChange={handleChange} />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    name="number"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="03001234567"
                    className={`form-control ${errors.number ? "is-invalid" : ""}`}
                    value={form.number}
                    onChange={handleChange}
                    onPaste={(ev) => {
                      const pasted = ev.clipboardData.getData("text");
                      const digits = sanitizeDigits(pasted, 11);
                      if (digits !== pasted) ev.preventDefault(); // allow our sanitized replacement instead
                      setForm((p) => ({ ...p, number: digits }));
                    }}
                  />
                  {errors.number && <div className="invalid-feedback">{errors.number}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Date</label>
                  <input name="date" type="date" className={`form-control ${errors.date ? "is-invalid" : ""}`} onChange={handleChange} />
                  {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Time</label>
                  <input name="time" type="time" className={`form-control ${errors.time ? "is-invalid" : ""}`} onChange={handleChange} />
                  {errors.time && <div className="invalid-feedback">{errors.time}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">No. of Passengers</label>
                  <input name="passengers" type="number" min="1" className={`form-control ${errors.passengers ? "is-invalid" : ""}`} onChange={handleChange} />
                  {errors.passengers && <div className="invalid-feedback">{errors.passengers}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Vehicle Type</label>
                  <select name="vehicleType" className={`form-select ${errors.vehicleType ? "is-invalid" : ""}`} onChange={handleChange} value={form.vehicleType}>
                    <option value="">Select Vehicle Type</option>
                    <option value="economy">Economy</option>
                    <option value="comfort">Comfort</option>
                    <option value="luxury">Luxury</option>
                  </select>
                  {errors.vehicleType && <div className="invalid-feedback">{errors.vehicleType}</div>}
                </div>

                {form.vehicleType && (
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Select Vehicle</label>
                    <select
                      name="selectedVehicle"
                      className={`form-select ${errors.selectedVehicle ? "is-invalid" : ""}`}
                      onChange={handleChange}
                      value={form.selectedVehicle}
                    >
                      <option value="">Choose a Car</option>
                      {vehiclesFor[form.vehicleType].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {errors.selectedVehicle && <div className="invalid-feedback">{errors.selectedVehicle}</div>}
                  </div>
                )}

                <div className="col-12 mb-3">
                  <label className="form-label">Special Instructions</label>
                  <textarea name="specialInstruction" className="form-control" rows="2" placeholder="Optional..." onChange={handleChange} />
                </div>
              </div>
            </Zoom>
          )}

          {/* --- COURIER --- */}
          {selectedService === "courier" && (
            <Fade triggerOnce>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Sender Name</label>
                  <input name="senderName" className={`form-control ${errors.senderName ? "is-invalid" : ""}`} onChange={handleChange} />
                  {errors.senderName && <div className="invalid-feedback">{errors.senderName}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Sender Phone</label>
                  <input
                    name="senderPhone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="03001234567"
                    className={`form-control ${errors.senderPhone ? "is-invalid" : ""}`}
                    value={form.senderPhone}
                    onChange={handleChange}
                    onPaste={(ev) => {
                      const pasted = ev.clipboardData.getData("text");
                      const digits = sanitizeDigits(pasted, 11);
                      if (digits !== pasted) ev.preventDefault();
                      setForm((p) => ({ ...p, senderPhone: digits }));
                    }}
                  />
                  {errors.senderPhone && <div className="invalid-feedback">{errors.senderPhone}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Recipient Name</label>
                  <input name="recipientName" className={`form-control ${errors.recipientName ? "is-invalid" : ""}`} onChange={handleChange} />
                  {errors.recipientName && <div className="invalid-feedback">{errors.recipientName}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Recipient Phone</label>
                  <input
                    name="recipientPhone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="03001234567"
                    className={`form-control ${errors.recipientPhone ? "is-invalid" : ""}`}
                    value={form.recipientPhone}
                    onChange={handleChange}
                    onPaste={(ev) => {
                      const pasted = ev.clipboardData.getData("text");
                      const digits = sanitizeDigits(pasted, 11);
                      if (digits !== pasted) ev.preventDefault();
                      setForm((p) => ({ ...p, recipientPhone: digits }));
                    }}
                  />
                  {errors.recipientPhone && <div className="invalid-feedback">{errors.recipientPhone}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Pickup Date</label>
                  <input name="pickupDate" type="date" className={`form-control ${errors.pickupDate ? "is-invalid" : ""}`} onChange={handleChange} />
                  {errors.pickupDate && <div className="invalid-feedback">{errors.pickupDate}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Pickup Time</label>
                  <input name="pickupTime" type="time" className={`form-control ${errors.pickupTime ? "is-invalid" : ""}`} onChange={handleChange} />
                  {errors.pickupTime && <div className="invalid-feedback">{errors.pickupTime}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Priority Type</label>
                  <select name="priorityType" className={`form-select ${errors.priorityType ? "is-invalid" : ""}`} onChange={handleChange}>
                    <option value="">Select Priority</option>
                    <option value="standard">Standard (12-24 hours)</option>
                    <option value="urgent">Urgent (6-12 hours)</option>
                  </select>
                  {errors.priorityType && <div className="invalid-feedback">{errors.priorityType}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Package Type</label>
                  <select name="packageType" className={`form-select ${errors.packageType ? "is-invalid" : ""}`} onChange={handleChange}>
                    <option value="">Select Package</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                  {errors.packageType && <div className="invalid-feedback">{errors.packageType}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Weight (kg)</label>
                  <input name="weight" type="text" className={`form-control ${errors.weight ? "is-invalid" : ""}`} placeholder="e.g. 2.5" value={form.weight} onChange={handleChange} />
                  {errors.weight && <div className="invalid-feedback">{errors.weight}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Estimated Value (PKR)</label>
                  <input name="estimatedValue" type="text" className={`form-control ${errors.estimatedValue ? "is-invalid" : ""}`} placeholder="e.g. 5000" value={form.estimatedValue} onChange={handleChange} />
                  {errors.estimatedValue && <div className="invalid-feedback">{errors.estimatedValue}</div>}
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label">Special Instructions</label>
                  <textarea name="courierSpecialInstruction" className="form-control" rows="2" placeholder="Optional..." onChange={handleChange} />
                </div>
              </div>
            </Fade>
          )}

          {/* Map */}
          {form.pickupLocation && form.dropLocation && (
            <div className="mt-4">
              <Slide direction="up" triggerOnce>
                <GoogleMapWithRoute
                  origin={{ lat: form.pickupLocation.lat, lng: form.pickupLocation.lng }}
                  destination={{ lat: form.dropLocation.lat, lng: form.dropLocation.lng }}
                />
              </Slide>
            </div>
          )}

          {/* Submit + messages */}
          <div className="text-center mt-4">
            <motion.button type="submit" className="btn btn-primary px-5 py-2" whileHover={{ scale: 1.05 }}>
              Submit Request
            </motion.button>
          </div>

          {submitted && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="alert alert-success mt-3">
              Request submitted - We will contact You Soon.
            </motion.div>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default RideCourierPage;


