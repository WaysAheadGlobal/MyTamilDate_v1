import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from '../hooks/useCookies';

// Context creation
const AppContext = createContext();

// Custom hook
export const useAppContext = () => useContext(AppContext);

// Context provider component
export const AppContextProvider = ({ children }) => {
  const { getCookie, setCookie, deleteCookie } = useCookies();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showFullPhoneNumberemail, setShowFullPhoneNumber] = useState(false);

  useEffect(() => {
    const userId = getCookie('userId');
    if (userId === 'adminlogin') {
      setIsAdmin(true);
    }
  }, [getCookie]);

  const loginAsAdmin = () => {
    setIsAdmin(true);
    setCookie('userId', 'adminlogin', 365); // Store the admin login state in a cookie for 365 days
  };

  const logout = () => {
    setIsAdmin(false);
    deleteCookie('userId'); // Remove the admin login state from cookies
  };

  const togglePhoneNumber = () => setShowFullPhoneNumber(!showFullPhoneNumberemail);

  return (
    <AppContext.Provider value={{ isAdmin, loginAsAdmin, logout, togglePhoneNumber, showFullPhoneNumberemail }}>
      {children}
    </AppContext.Provider>
  );
};
