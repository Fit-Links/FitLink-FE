import React from "react";

import InputOTP from "./InputOTP";
import Header from "../../_components/Header";

export default function ConnectTrainerContainer() {
  return (
    <>
      <Header title="트레이너 연동" />
      <p className="text-body-1 text-text-sub2"> 트레이너에게 받은 코드를 입력해주세요</p>

      <InputOTP />
    </>
  );
}
