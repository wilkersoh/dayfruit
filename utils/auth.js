import React, { useState, useContext, createContext } from "react";

const initialState = { info: { username: null } };

const authContext = createContext({});
const isClient = () => typeof window !== "undefined";

if (isClient()) {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  initialState.info = userInfo;
}

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

  const signinWithCustom = (rawUser) => {
    const user = rawUser[Object.keys(rawUser)];
    localStorage.setItem("user", JSON.stringify(user));
    setUser(rawUser);

    return user;
  };

  const signinWithFacebook = () => {
    //
  };
  const signinWithGoogle = () => {
    //
  };

  const signout = () => {
    localStorage.removeItem("user");
    // clear refreshToken and accessToken
  };

  return {
    user,
    signinWithCustom,
    signout,
  };
};
