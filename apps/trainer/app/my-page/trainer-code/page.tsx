import React from "react";

import HeaderProvider from "@trainer/components/Providers/BasicHeaderProvider";

import { commonLayoutContents } from "@trainer/constants/styles";

import TrainerCodeContainer from "./_components/TrainerCodeContainer";

export default async function TrainnerCode() {
  return (
    <HeaderProvider title="트레이너 코드" back>
      <main className={commonLayoutContents}>
        <TrainerCodeContainer />
      </main>
    </HeaderProvider>
  );
}
