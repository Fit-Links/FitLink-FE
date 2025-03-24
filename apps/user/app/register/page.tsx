import dynamic from "next/dynamic";
import React from "react";

import TokenProvider from "@user/components/Providers/TokenProvider";

const RegisterFunnel = dynamic(() => import("@user/components/RegisterFunnel/index"), {
  ssr: false,
});

function RegisterPage() {
  return (
    <TokenProvider>
      <RegisterFunnel />
    </TokenProvider>
  );
}

export default RegisterPage;
