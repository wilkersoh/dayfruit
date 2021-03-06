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
  const [isLoading, setIsLoading] = useState({
    facebook: false,
    github: false,
  });
  const [session] = useSession();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setUser({ user: userInfo });
  }, []);

  const signinWithCustom = (rawUser) => {
    setIsLoading({ ...isLoading, custom: true });
    setUser({ user: rawUser });
    localStorage.setItem("user", JSON.stringify(rawUser));
  };

  const signinWithFacebook = () => {
    setIsLoading({ ...isLoading, facebook: true });
    signIn("facebook", {
      callbackUrl:
        process.env.NODE_ENV === "production"
          ? "https://dayfruit.staging.selfpaths.com/"
          : "http://localhost:3004/#_=_",
    });
  };
  const signinWithGithub = () => {
    // Github OAuth only can input one callback url, it already set to staging url. IF need to work, need to changed the OAuth in github setting
    setIsLoading({ ...isLoading, github: true });
    signIn("github", {
      callbackUrl: "https://dayfruit.staging.selfpaths.com/",
    });
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
    isLoading,
  };
};
