import { useEffect } from "react";
import { useRouter } from "next/router";

export const Redirect = ({ to }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
};
