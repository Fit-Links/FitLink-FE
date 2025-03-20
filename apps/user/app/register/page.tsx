import dynamic from "next/dynamic";
import React from "react";

const RegisterFunnel = dynamic(() => import("@user/components/RegisterFunnel/index"), {
  ssr: false,
});

function RegisterPage() {
  return <RegisterFunnel />;
}

export default RegisterPage;
