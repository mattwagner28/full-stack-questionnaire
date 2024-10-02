'use client';

import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usernameContext, setUsernameContext ] = useState('');

  return (
    <UserContext.Provider value={{ usernameContext, setUsernameContext }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};