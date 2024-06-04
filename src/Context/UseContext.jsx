// UseContext.jsx

import React, { createContext, useContext, useState } from 'react';

// Context creation
const AppContext = createContext();

// Custom hook
export const useAppContext = () => useContext(AppContext);

// Context provider component
export const AppContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showFullPhoneNumberemail, setShowFullPhoneNumber] = useState(false);
 
  const loginAsAdmin = () => {
    setIsAdmin(true);
  };

  const togglePhoneNumber = () => setShowFullPhoneNumber(!showFullPhoneNumberemail);

  const logout = () => {
    setIsAdmin(false);
    
  };

  return (
    <AppContext.Provider value={{ isAdmin, loginAsAdmin, logout, togglePhoneNumber, showFullPhoneNumberemail }}>
      {children}
    </AppContext.Provider>
  );
};
