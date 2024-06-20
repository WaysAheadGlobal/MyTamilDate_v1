import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from '../hooks/useCookies';

// Context creation
const AppContext = createContext();

// Custom hook
export const useAppContext = () => useContext(AppContext);

// Context provider component
export const AppContextProvider = ({ children }) => {
  const { getCookie, setCookie, deleteCookie } = useCookies();

  const [userDetails, setUserDetails] = useState({

    first_name: "",
    last_name: "",
    birthday: "",
    gender: "",
    want_gender: "",
  });

  const [locations, setLocations] = useState({
    country : "",
    locations_string: ""

  })

  const [isAdmin, setIsAdmin] = useState(false);
  const[phoneNumber, setPhoneNumber] = useState('')
  const [showFullPhoneNumberemail, setShowFullPhoneNumber] = useState(false);

  useEffect(() => {
    const userId = getCookie('userId');
    if (userId === 'adminlogin') {
      setIsAdmin(true);
    }
  }, [getCookie]);

  const loginAsAdmin = () => {
    setIsAdmin(true);
    setCookie('userId', 'adminlogin', 365);
  };

  const logout = () => {
    setIsAdmin(false);
    deleteCookie('userId'); // Remove the admin login state from cookies
  };

  const togglePhoneNumber = () => setShowFullPhoneNumber(!showFullPhoneNumberemail);

  return (
    <AppContext.Provider value={{locations, setLocations,phoneNumber, setPhoneNumber, userDetails, setUserDetails, isAdmin, loginAsAdmin, logout, togglePhoneNumber, showFullPhoneNumberemail }}>
      {children}
    </AppContext.Provider>
  );
};
