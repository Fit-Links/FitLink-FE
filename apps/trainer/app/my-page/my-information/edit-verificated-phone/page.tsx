import React from "react";

import HeaderProvider from "@trainer/components/Providers/BasicHeaderProvider";

import { commonLayoutContents } from "@trainer/constants/styles";

import PhoneVerificationContainer from "./_components/PhoneVerificationContainer";

export default function page() {
  return (
    <HeaderProvider back title="기기 인증">
      <main className={commonLayoutContents}>
        <PhoneVerificationContainer />
      </main>
    </HeaderProvider>
  );
}
