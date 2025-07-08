import dynamic from "next/dynamic";
import React from "react";

import { commonLayoutContents } from "@trainer/constants/styles";

const RegisterFunnel = dynamic(() => import("./_components/RegisterFunnel"), {
  ssr: false,
});

function RegisterPage() {
  return (
    <main className={commonLayoutContents}>
      <RegisterFunnel />
    </main>
  );
}

export default RegisterPage;
