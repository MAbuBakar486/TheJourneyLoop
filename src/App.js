import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
// import Cursor from './Widgets/Cursor.js';
import ScrollToTop from '../src/Widgets/Scroll.js';
import Navbar from './Components/Header.js';
import Footer from './Components/Footer.js';
import Preloader from "./Components/Preloader.js";
import '../src/App.css';
import SmoothScrollWrapper from "./Components/SmoothScrollWrapper.js";
import WhatsAppButton from './Components/Whatsapp.js';
import ResetPage from '../src/Widgets/ResetPage.js';
// import { HashRouter ,Route, Routes } from 'react-router-dom';
//rename this 
import AppRoutes from "./routes.js";
import CookieBanner from "./Widgets/Cookies.js";

function App() {
  return (
    <HelmetProvider>
      <div id="app-container">
        <Navbar />
        <Preloader duration={4700} />

        <SmoothScrollWrapper>
        <div className="main-content">
          <AppRoutes />   {/* ✅ works now */}
        </div>


        <Footer />
        </SmoothScrollWrapper>


        <ScrollToTop />
        <ResetPage />
        {/* <Cursor /> */}
      </div>
      <CookieBanner />
        <WhatsAppButton />
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: 999999 }}
        toastOptions={{ duration: 5000, style: { fontSize: 14 } }}
      />
    </HelmetProvider>
  );
}

export default App;   

// const Container = styled.div``;
// const Banner = styled.div`
// // margin-top : 70px;
// margin-bottom : 30px;
// background: #1E1820;
// // clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 70% 95%, 0px 100%);
// // background: linear-gradient(270deg, #DF8908 10%, #B415FF 100%);
// `;
// const Skills = styled.div`
// background: #1E1820;
// // clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 70% 95%, 0px 100%);
// // background: linear-gradient(270deg, #DF8908 10%, #B415FF 100%);
// `;
// const MyServices = styled.div`
// background: #1E1820;
// // background: linear-gradient(135deg, #0f4c75, #1b262c);
// // background: linear-gradient(135deg, #2e2e2e, #121212);
// // background: radial-gradient(circle, rgba(0,0,0,0.4) 1px, transparent 1px);
// // background-size: 3px 3px;
// // background-color: #121212;


// // background: linear-gradient(135deg, #1e3a5f, #121212);

// `;

