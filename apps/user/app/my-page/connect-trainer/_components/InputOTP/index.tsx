import { Button } from "@ui/components/Button";
import {
  InputOTP as InputOTPComponent,
  InputOTPGroup,
  InputOTPMessage,
  InputOTPSlot,
} from "@ui/components/InputOTP";
import React, { useState } from "react";
type otp_status = "default" | "focused" | "filled" | "error";

export default function InputOTP() {
  const OTP_LENGTH = 5;

  const [otpValue, setOtpValue] = useState("");
  const [status, setStatus] = useState<otp_status>("default");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeValue = (newValue: string) => {
    setOtpValue(newValue);

    if (newValue.length === OTP_LENGTH) {
      setStatus("filled");

      return;
    }

    setErrorMessage("");
    setStatus("default");
  };

  const handleRequestConnectTrainer = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // TODO
    // 트레이너 코드 제출 시, 코드가 서버에 없는 경우 variant를 error로 설정

    setStatus("error");
    setErrorMessage("입력한 코드를 확인해 주세요.");
  };

  return (
    <form className="mt-[3.75rem] flex h-full w-full flex-col justify-between">
      <InputOTPComponent maxLength={OTP_LENGTH} onChange={handleChangeValue}>
        <InputOTPGroup className="flex justify-center">
          {Array.from({ length: OTP_LENGTH }, (_, index) => (
            <InputOTPSlot key={`otp-slot-${index}`} index={index} variant={status} />
          ))}
        </InputOTPGroup>
        <InputOTPMessage className="flex justify-center" variant={status}>
          {errorMessage}
        </InputOTPMessage>
      </InputOTPComponent>

      <Button
        type="submit"
        className="relative bottom-2 h-[3.5rem] w-full"
        onClick={handleRequestConnectTrainer}
        disabled={otpValue.length !== OTP_LENGTH}
      >
        연동 요청
      </Button>
    </form>
  );
}
