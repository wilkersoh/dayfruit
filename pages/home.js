import React from "react";
import { useAuth } from "@/utils/auth";
import { withApollo } from "@/apollo/client";

function Home() {
  const { user } = useAuth();

  return (
    <>
      <div>Producits</div>
    </>
  );
}

export default withApollo(Home);
