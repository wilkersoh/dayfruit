import React from "react";
import { useAuth } from "@/utils/auth";

export default function Product() {
  const { user } = useAuth();

  return (
    <>
      <div>Producits</div>
    </>
  );
}
