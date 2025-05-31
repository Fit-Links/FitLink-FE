"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import {
  InputOTP as InputOTPComponent,
  InputOTPGroup,
  InputOTPMessage,
  InputOTPSlot,
} from "@ui/components/InputOTP";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { myInformationQueries } from "@user/queries/myInformation";

import { connectTrainer } from "@user/services/myInformation";

type otp_status = "default" | "focused" | "filled" | "error";

const OTP_LENGTH = 6;

export default function InputOTP() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [trainerCode, setTrainerCode] = useState("");
  const [status, setStatus] = useState<otp_status>("default");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate } = useMutation({
    mutationKey: ["connectTrainer"],
    mutationFn: (trainerCode: string) => connectTrainer({ trainerCode }),
  });

  const handleChangeValue = (newValue: string) => {
    setTrainerCode(newValue);

    if (newValue.length === OTP_LENGTH) {
      setStatus("filled");

      return;
    }

    setErrorMessage("");
    setStatus("default");
  };

  const handleRequestConnectTrainer = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    mutate(trainerCode, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: myInformationQueries.summary() });
        router.back();
      },

      onError: () => {
        setStatus("error");
        setErrorMessage("입력한 코드를 확인해 주세요.");
      },
    });
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
        disabled={trainerCode.length !== OTP_LENGTH}
      >
        연동 요청
      </Button>
    </form>
  );
}
