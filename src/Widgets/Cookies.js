// export default CookieBanner;
import { useEffect, useState } from "react";


const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user already accepted (UI-only)
    const accepted = localStorage.getItem("ui_cookie_banner");

    // Show only on desktop
    const isDesktop = window.innerWidth >= 996;

    if (!accepted && isDesktop) {
      setTimeout(() => setVisible(true), 500); // small delay for smooth entry
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ui_cookie_banner", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <div className="cookie-text">
          <h4>Let’s Talk Cookies 🍪</h4>
          <p>
            We use cookies to enhance your browsing experience and analyze site
            performance. By clicking “Accept all”, you consent to the use of cookies that 
            help us deliver tailored content and improve how our site work !.
          </p>
        </div>

        <div className="cookie-actions">
          <button className="btn-outline" onClick={handleAccept}>
            Essential only
          </button>
          <button className="btn-primary" onClick={handleAccept}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
