import React from "react";

import PhoneVerificationContainer from "./_components/PhoneVerificationContainer";
import Header from "../../_components/Header";

export default function page() {
  return (
    <main className="bg-background-primary text-text-primary flex h-screen w-full flex-col items-center justify-center px-4">
      <Header title="기기 인증" />

      <PhoneVerificationContainer />
    </main>
  );
}
