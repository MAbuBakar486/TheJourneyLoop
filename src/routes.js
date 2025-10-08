// routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";

//  Pages Import
import Home from './Pages/Home.js';

import About from './Pages/About.js';
import Faq from './Pages/Faq.js';
import CitiesPage from './Pages/CitiesPage.js';
import ChooseUs from './Pages/ChooseUs.js';

import CarRentalPage from './Pages/CarRentalPage.js';
import TourPage from './Pages/TourPage.js';
import UpcomingTours from './Pages/UpcomingTours.js';
import RideCourierPage from './Pages/RideCourierPage.js';
import Contact from './Pages/Contact.js';

import Success from './Pages/Success.js';
// import Success from './Pages/Success.js';
import NotFound from './Pages/NotFound.js';
import Maintainance from './Pages/Maintainance.js';

import PrivacyPolicy from './Pages/PrivacyPolicy.js';
import Terms from './Pages/Terms.js';
import Detailpage from './Pages/Detailpage.js';


const AppRoutes = () => (
  <Routes>
      {/* Main Links */}
    <Route path="/" element={<Home />} />
    
    <Route path="/about-us/" element={<About />} />
    <Route path="/faq" element={<Faq />} />
    <Route path="/Cities" element={<CitiesPage />} />
    <Route path="/Why-Choose-Us" element={<ChooseUs />} />
    
      {/* Services Links */}
    <Route path="/RentACar" element={<CarRentalPage />} />
    <Route path="/tours" element={<TourPage />} />
    <Route path="/Upcomingtours" element={<UpcomingTours />} />
    <Route path="/Ride-Courier" element={<RideCourierPage />} />
    <Route path="/Contactus" element={<Contact />} />

    {/* Footer Links */}
    <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
    <Route path="/terms" element={<Terms />} />

    {/* Others Page */}
    <Route path="/desinationdetail/" element={<Detailpage />} />
    <Route path="/Success" element={<Success />} />
    <Route path="*" element={<NotFound />} />
    {/* <Route path="/" element={<Maintainance />} /> */}
  </Routes>
);

export default AppRoutes;
