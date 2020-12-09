import React, { useState, useContext, createContext, useEffect } from "react";

let initialState = { user: null };

const authContext = createContext({});

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// export to outside then can access this all function
export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setUser({ user: userInfo });
  }, []);

  const signinWithCustom = (rawUser) => {
    setUser({ user: rawUser });
    localStorage.setItem("user", JSON.stringify(rawUser));
  };

  const signinWithFacebook = () => {
    //
  };
  const signinWithGoogle = () => {
    //
  };

  const signout = () => {
    localStorage.removeItem("user");
  };

  return {
    setUser,
    user,
    signinWithCustom,
    signout,
  };
};
