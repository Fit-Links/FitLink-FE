import React from "react";

import HeaderProvider from "@user/components/Providers/HeaderProvider";

import { commonLayoutContents } from "@user/constants/styles";

import ConnectTrainerContainer from "./_components/ConnectTrainerContainer";

const ConnectTrainerPageSubHeader = () => (
  <p className="text-body-1 text-text-sub2 text-center">트레이너에게 받은 코드를 입력해주세요</p>
);

export default function Home() {
  return (
    <HeaderProvider title="트레이너 연동" back subHeader={<ConnectTrainerPageSubHeader />}>
      <main className={commonLayoutContents}>
        <ConnectTrainerContainer />
      </main>
    </HeaderProvider>
  );
}
