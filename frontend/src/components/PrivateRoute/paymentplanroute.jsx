import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// Component to handle the mobile check and redirection
const MobileCheck = ({ children }) => {
  const [mobile, setMobile] = useState(window.innerWidth <= 1024);



  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 1024);
      console.log(window.innerWidth)
    };
    

    window.addEventListener('resize', handleResize);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (mobile) {
    return children;
  } else {
    return <Navigate to="/paymentplan" replace />;
  }
};

export default MobileCheck;
