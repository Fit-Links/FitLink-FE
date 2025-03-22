"use client";

import { Button } from "@ui/components/Button";
import Header from "@ui/components/Header";
import { InputOTP, InputOTPGroup, InputOTPMessage, InputOTPSlot } from "@ui/components/InputOTP";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type otp_status = "default" | "focused" | "filled" | "error";

export default function Home() {
  const router = useRouter();
  const OTP_LENGTH = 5;

  const [value, setValue] = useState("");
  const [status, setStatus] = useState<otp_status>("default");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickBack = () => {
    router.push("/my-page");
  };

  const handleChangeValue = (newValue: string) => {
    setValue(newValue);

    if (newValue.length === OTP_LENGTH) {
      setStatus("filled");
    } else {
      setErrorMessage("");
      setStatus("default");
    }
  };

  const handleSubmit = () => {
    // TODO
    // 트레이너 코드 제출 시, 없는 경우 variant를 error로 설정
    setStatus("error");
    setErrorMessage("입력한 코드를 확인해 주세요.");
  };

  return (
    <main className="flex h-screen w-full flex-col items-center pb-[5.063rem]">
      <Header>
        <Header.Left>
          <Header.Back onClick={handleClickBack} />
        </Header.Left>
        <Header.Title content="트레이너 연동" />
      </Header>

      <p className="text-body-1 text-text-sub2"> 트레이너에게 받은 코드를 입력해주세요</p>

      <section className="mt-[3.75rem] flex h-full w-full flex-col">
        <InputOTP maxLength={OTP_LENGTH} onChange={handleChangeValue}>
          <InputOTPGroup className="flex justify-center">
            {Array.from({ length: OTP_LENGTH }, (_, index) => (
              <InputOTPSlot key={`otp-slot-${index}`} index={index} variant={status} />
            ))}
          </InputOTPGroup>
          <InputOTPMessage className="flex justify-center" variant={status}>
            {errorMessage}
          </InputOTPMessage>
        </InputOTP>
      </section>
      <section className="relative flex h-full w-full items-end">
        <Button
          type="submit"
          className="relative bottom-2 h-[3.5rem] w-full"
          onClick={handleSubmit}
          disabled={value.length !== OTP_LENGTH}
        >
          연동 요청
        </Button>
      </section>
    </main>
  );
}
