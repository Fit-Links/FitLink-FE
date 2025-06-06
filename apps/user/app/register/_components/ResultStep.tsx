"use client";

import { Button } from "@ui/components/Button";
import RequestStatus, { Status } from "@ui/components/RequestStatus";
import { useRouter } from "next/navigation";
import React from "react";

import { saveTokens } from "@user/services/auth";
import { SignupRequestBody, UserVerificationStatus } from "@user/services/types/auth.dto";

import { useRegisterFcmToken } from "../_hooks/useRegisterFcmToken";
import { useSignupForm } from "../_hooks/useSignupForm";

const DEFAULT_VERIFICATION_STATUS = "DEFAULT" as const;

type ResultStepProps = {
  form: SignupRequestBody;
};

type UserSignupStatus = UserVerificationStatus | "DEFAULT";

const getUserStatusFromMessage = (message?: string): UserSignupStatus => {
  try {
    if (message === null || message === undefined) return DEFAULT_VERIFICATION_STATUS;

    // eslint-disable-next-line no-magic-numbers
    message = message.slice(1, -1).trim();
    const pairs = message.split(", ").map((pair) => pair.split(": "));
    const obj: { userId?: number; status?: UserVerificationStatus } = {};
    pairs.forEach(([key, value]) => {
      if (key !== "userId" && key !== "status") return;
      if (!isNaN(Number(value))) {
        obj["userId"] = Number(value);
      } else {
        obj["status"] = value as UserVerificationStatus;
      }
    });

    if (obj["status"]) return obj["status"];

    return DEFAULT_VERIFICATION_STATUS;
  } catch {
    return DEFAULT_VERIFICATION_STATUS;
  }
};

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

function ResultStep({ form }: ResultStepProps) {
  const { requestFcmPermission, isPending: isRegisterFcmTokenPending } = useRegisterFcmToken();

  const { onSubmit, networkStatus, error } = useSignupForm({
    onSuccess: async ({ data }) => {
      const {
        data: { success },
      } = await saveTokens(data);

      if (success) requestFcmPermission();

      // TODO: success false 시 정책 구현
      // TODO: status 별 정책 구현
    },
  });
  const router = useRouter();
  // const status = generateStatus(networkStatus, data);
  const userStatus = getUserStatusFromMessage(error?.message);

  const handleClick = (status: Status, userStatus: UserSignupStatus) => () => {
    if (status === "success") {
      router.replace("/");
    } else if (status === "error") {
      if (userStatus === "REQUIRED_REGISTER") onSubmit(form);
      else router.replace("/login");
    }
  };

  React.useEffect(() => {
    onSubmit(form);
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center">
        <RequestStatus
          status={networkStatus}
          contentPerStatus={{
            success: {
              title: "회원가입이 완료되었습니다",
            },
            error: generateErrorMessage(userStatus),
          }}
        />
      </div>
      <div className="h-[3.375rem] w-full">
        <SignupButton
          status={networkStatus}
          userStatus={userStatus}
          onClick={handleClick(networkStatus, userStatus)}
          disabled={isRegisterFcmTokenPending}
        />
      </div>
    </div>
  );
}

export default ResultStep;

const generateButtonContent = (status: Status, userStatus: UserSignupStatus) => {
  if (status === "success") return "홈으로 가기";
  if (userStatus === "REQUIRED_REGISTER") return "재시도 하기";
  if (userStatus === "REQUIRED_SMS" || userStatus === "DEFAULT") return "회원가입 다시하기";
  if (userStatus === "NORMAL") return "로그인 하기";
};

type SignupButtonProps = {
  status: Status;
  userStatus: UserSignupStatus;
  onClick: () => void;
  disabled?: boolean;
};
function SignupButton({ status, userStatus, onClick, disabled = false }: SignupButtonProps) {
  if (status === "pending" || status === "idle") return <></>;

  return (
    <Button size="xl" className="w-full" onClick={onClick} disabled={disabled}>
      {generateButtonContent(status, userStatus)}
    </Button>
  );
}
