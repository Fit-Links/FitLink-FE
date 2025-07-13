import React from "react";

import HeaderProvider from "@user/components/Providers/HeaderProvider";

import { commonLayoutContents } from "@user/constants/styles";

import ConnectTrainerContainer from "./_components/ConnectTrainerContainer";

export default function Home() {
  return (
    <HeaderProvider title="트레이너 연동" back>
      <main className={commonLayoutContents}>
        <ConnectTrainerContainer />
      </main>
    </HeaderProvider>
  );
}
