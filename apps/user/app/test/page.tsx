"use client";

import { cn } from "@ui/lib/utils";
import { useRouter } from "next/navigation";

import RouteInstance from "@user/constants/routes";

import { useRegisterFcmToken } from "../register/_hooks/useRegisterFcmToken";

// TODO: FCM 등록이 안 되어 있는 기존 계정들을 위해 남겨놓겠습니다

function Page() {
  const router = useRouter();

  const { requestFcmPermission, isPending: isRegisterFcmTokenPending } = useRegisterFcmToken();
  const handleClick = async () => {
    const granted = await requestFcmPermission();
    if (granted) router.push(RouteInstance.root());
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={isRegisterFcmTokenPending}
        className={cn("rounded-lg border p-3", {
          "bg-green-200": isRegisterFcmTokenPending,
        })}
      >
        FCM 등록
      </button>
    </div>
  );
}

export default Page;
