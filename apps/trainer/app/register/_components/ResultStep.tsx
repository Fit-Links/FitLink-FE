"use client";

import { Button } from "@ui/components/Button";
import RequestStatus, { Status } from "@ui/components/RequestStatus";
import { useRouter } from "next/navigation";
import React from "react";

import {
  SignupApiResponse,
  SignupRequestBody,
  UserVerificationStatus,
} from "@trainer/services/types/auth.dto";

import RouteInstance from "@trainer/constants/route";

import { useFCMToken } from "../_hooks/useFCMToken";
import { useSignupForm } from "../_hooks/useSignupForm";

const DEFAULT_VERIFICATION_STATUS = "REQUIRED_SMS" as const;
const USER_VERIFICATION_STATUS_LIST = ["REQUIRED_SMS", "NORMAL", "REQUIRED_REGISTER"] as const;

type ResultStepProps = {
  form: SignupRequestBody;
};

const generateStatus = (
  networkStatus: "error" | "idle" | "pending" | "success",
  data?: SignupApiResponse,
) => {
  if (data === undefined || data === null) return networkStatus;
  if (!data.success) return "error";

  return "success";
};

const getUserStatusFromMessage = (message?: string): UserVerificationStatus => {
  try {
    if (message === null || message === undefined) return DEFAULT_VERIFICATION_STATUS;
    const [, detail] = message.split(". ");
    const detailArray = new Array(detail);

    const status = detailArray[1];

    if (USER_VERIFICATION_STATUS_LIST.some((value) => value === status))
      return status as UserVerificationStatus;

    return DEFAULT_VERIFICATION_STATUS as UserVerificationStatus;
  } catch {
    return DEFAULT_VERIFICATION_STATUS as UserVerificationStatus;
  }
};

const generateErrorMessage = (status: Status, userStatus: UserVerificationStatus) => {
  if (status === "error")
    return {
      title: "회원가입에 실패했습니다",
      description: "네트워크 연결 상태를 확인하고 다시 시도해주세요",
    };

  switch (userStatus) {
    case "NORMAL":
      return {
        title: "회원가입에 실패했습니다",
        description: "사용하신 휴대폰 번호로 이미 회원가입을 하셨습니다. 로그인을 진행해주세요",
      };
    case "REQUIRED_REGISTER":
      return {
        title: "네트워크 연결 상태를 확인하고 다시 시도해주세요",
        description: "",
      };
    case "REQUIRED_SMS":
      return {
        title: "회원가입에 실패했습니다",
        description: "휴대폰 인증이 필요합니다. 회원가입을 다시 시도해주세요",
      };
  }
};

function ResultStep({ form }: ResultStepProps) {
  const initailizeFCM = useFCMToken();
  const { onSubmit, networkStatus, data } = useSignupForm({
    onSuccess: ({ success }) => {
      if (success) initailizeFCM();
      // TODO: status 별 정책 구현
    },
  });
  const router = useRouter();
  const status = generateStatus(networkStatus, data);
  const userStatus = getUserStatusFromMessage(data?.msg);

  const handleClick = (status: Status, userStatus: UserVerificationStatus) => () => {
    if (status === "success") {
      router.replace(RouteInstance.root());
    } else if (status === "error") {
      if (userStatus === "NORMAL" || userStatus === "REQUIRED_SMS")
        router.replace(RouteInstance.login());
      else if (userStatus === "REQUIRED_REGISTER") onSubmit(form);
    }
  };

  React.useEffect(() => {
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
            error: generateErrorMessage(networkStatus, userStatus),
          }}
        />
      </div>
      <div className="h-[3.375rem] w-full">
        <SignupButton
          status={status}
          userStatus={userStatus}
          onClick={handleClick(status, userStatus)}
        ></SignupButton>
      </div>
    </div>
  );
}

export default ResultStep;

const generateButtonContent = (status: Status, userStatus: UserVerificationStatus) => {
  if (status === "success") return "홈으로 가기";
  if (userStatus === "REQUIRED_REGISTER") return "재시도 하기";
  if (userStatus === "REQUIRED_SMS") return "회원가입 다시하기";
  if (userStatus === "NORMAL") return "로그인 하기";
};

type SignupButtonProps = {
  status: Status;
  userStatus: UserVerificationStatus;
  onClick: () => void;
};
function SignupButton({ status, userStatus, onClick }: SignupButtonProps) {
  if (status === "pending" || status === "idle") return <></>;

  return (
    <Button size="xl" className="w-full" onClick={onClick}>
      {generateButtonContent(status, userStatus)}
    </Button>
  );
}
