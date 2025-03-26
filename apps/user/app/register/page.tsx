import dynamic from "next/dynamic";
import React from "react";

const RegisterFunnel = dynamic(() => import("./_components/RegisterFunnel"), {
  ssr: false,
});

function RegisterPage() {
  return (
    <main className="h-full w-full">
      <RegisterFunnel />
    </main>
  );
}

export default RegisterPage;
