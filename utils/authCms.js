import { useState, useEffect } from "react";
import { useContext, createContext } from "react";
import jwt from "jsonwebtoken";

const authCmsContext = createContext({});

export function AuthCmsProvider({ children }) {
  const auth = useProviderAuthCms();
  return (
    <authCmsContext.Provider value={auth}>{children}</authCmsContext.Provider>
  );
}

export const useAuthCms = () => {
  return useContext(authCmsContext);
};

const useProviderAuthCms = () => {
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    // const decoded = jwt.verify(userCookie["auth_u"], process.env.JWT_SECRET);
  }, []);

  const signInAsAdmin = () => {
    //
  };

  return {
    admin,
  };
};
