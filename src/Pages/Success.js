import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container mt-5">
      <div className="alert alert-success text-center">
        <h4>Your Customized Trip Request has been submitted!</h4>
        <p>We will get back to you soon.</p>
        <p className="text-muted">Redirecting to homepage...</p>
      </div>
    </div>
  );
};

export default SuccessPage;