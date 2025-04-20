"use client";

import { Button } from "@ui/components/Button";
import RequestStatus, { Status } from "@ui/components/RequestStatus";
import { useRouter } from "next/navigation";
import React from "react";

import { SignupRequestBody } from "@trainer/services/types/auth.dto";

import RouteInstance from "@trainer/constants/route";

import { useSignupForm } from "../_hooks/useSignupForm";

type ResultStepProps = {
  form: SignupRequestBody;
};
function ResultStep({ form }: ResultStepProps) {
  const isInitializedRef = React.useRef(false);

  const { onSubmit, status } = useSignupForm();
  const router = useRouter();

  const handleClick = (status: "success" | "error") => {
    if (status === "success") {
      router.replace(RouteInstance.root());
    } else if (status === "error") {
      onSubmit(form);
    }
  };
  React.useEffect(() => {
    if (isInitializedRef.current) return;

    isInitializedRef.current = true;

    onSubmit(form);
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center">
        <RequestStatus
          status={status}
          contentPerStatus={{
            success: {
              title: "회원가입이 완료되었습니다",
            },
            error: {
              title: "회원가입에 실패했습니다",
              description: "네트워크 연결 상태를 확인하고 다시 시도해주세요",
            },
          }}
        />
      </div>
      <div className="h-[3.375rem] w-full">
        <SignupButton status={status} onClick={handleClick}></SignupButton>
      </div>
    </div>
  );
}

export default ResultStep;

type SignupButtonProps = {
  status: Status;
  onClick: (status: "success" | "error") => void;
};
function SignupButton({ status, onClick }: SignupButtonProps) {
  if (status === "pending" || status === "idle") return <></>;

  return (
    <Button size="xl" className="w-full" onClick={() => onClick(status)}>
      {status === "success" ? "홈으로 가기" : "재시도 하기"}
    </Button>
  );
}
