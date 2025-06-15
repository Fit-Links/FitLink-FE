"use client";

import { Button } from "@ui/components/Button";
import RequestStatus from "@ui/components/RequestStatus";
import React from "react";

import { UserVerificationStatus } from "@user/services/types/auth.dto";

type ResultStepProps = {
  onNext: () => void;
};

type UserSignupStatus = UserVerificationStatus | "DEFAULT";

const generateErrorMessage = (userStatus: UserSignupStatus) => {
  switch (userStatus) {
    case "NORMAL":
      return {
        title: "회원가입에 실패했습니다",
        description: "사용하신 휴대폰 번호로 이미 회원가입을 하셨습니다. 로그인을 진행해주세요",
      };
    case "REQUIRED_REGISTER":
      return {
        title: "회원가입에 실패했습니다",
        description: "네트워크 연결 상태를 확인하고 다시 시도해주세요",
      };
    case "REQUIRED_SMS":
      return {
        title: "회원가입에 실패했습니다",
        description: "휴대폰 인증이 필요합니다. 회원가입을 다시 시도해주세요",
      };
    case "DEFAULT":
      return {
        title: "회원가입에 실패했습니다",
        description: "회원가입을 다시 시도해주세요",
      };
  }
};

function ResultStep({ onNext }: ResultStepProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center">
        <RequestStatus
          status="success"
          contentPerStatus={{
            success: {
              title: "회원가입이 완료되었습니다",
            },
            error: generateErrorMessage("DEFAULT"),
          }}
        />
      </div>
      <div className="h-[3.375rem] w-full">
        <Button size="xl" onClick={onNext} className="w-full">
          다음
        </Button>
      </div>
    </div>
  );
}

export default ResultStep;
