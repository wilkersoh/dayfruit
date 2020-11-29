import React, { useState, useContext, createContext } from "react";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const signinWithCustom = (rawUser) => {
    setUser(rawUser);

    return user;
  };

  return {
    user,
    signinWithCustom,
    // signout,
  };
};
