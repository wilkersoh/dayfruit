import React, { useState, useContext, createContext, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/client";

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
  const [session] = useSession();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setUser({ user: userInfo });
  }, []);

  const signinWithCustom = (rawUser) => {
    setUser({ user: rawUser });
    localStorage.setItem("user", JSON.stringify(rawUser));
  };

  const signinWithFacebook = () => {
    signIn();
  };
  const signinWithGithub = () => {
    // Github OAuth only can input one callback url, it already set to staging url.
    signIn();
  };

  const signout = () => {
    localStorage.removeItem("user");
    // next-auth
    signOut();
  };

  return {
    setUser,
    user,
    signinWithCustom,
    signinWithFacebook,
    signinWithGithub,
    session,
    signout,
  };
};
