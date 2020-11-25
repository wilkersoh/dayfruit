import React, { useState, useEffect, useContext, createContext } from "react";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState({});

  const signinWithCustom = (rawUser) => {
    console.log("inside handleUser");
    setUser(rawUser);
  };

  return {
    user,
    signinWithCustom,
    // signout,
  };
};
