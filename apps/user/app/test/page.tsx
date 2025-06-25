"use client";

import { Button } from "@ui/components/Button";
import { ToggleGroup, ToggleGroupItem } from "@ui/components/ToggleGroup";
import { cn } from "@ui/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { showFcmToastForReservation } from "@user/lib/toastService";

import RouteInstance from "@user/constants/routes";

import { useRegisterFcmToken } from "../register/_hooks/useRegisterFcmToken";

// TODO: v1 배포 시 테스트 페이지 제거
function Page() {
  const router = useRouter();
  const [toastType, setToastType] = useState("default");
  const { requestFcmPermission, isPending: isRegisterFcmTokenPending } = useRegisterFcmToken();
  const handleClick = async () => {
    const granted = await requestFcmPermission();
    if (granted) router.push(RouteInstance.root());
  };

  const handleToastBtnClick = () => {
    switch (toastType) {
      case "default":
        toast("default");
        break;
      case "success":
        toast.success("success");
        break;
      case "error":
        toast.error("요청에 실패했습니다", {
          description: "error message",
        });
        break;
      case "info":
        toast.info("info", {
          description: "sonner info toast",
        });
        break;
      default:
        toast("default");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <label className="bg-background-sub3 text-body-1 flex items-center gap-4 rounded-xl p-2">
        <span className="">토스트 종류</span>
        <ToggleGroup type="single" value={toastType} onValueChange={setToastType} className="">
          <ToggleGroupItem value="default">default</ToggleGroupItem>
          <ToggleGroupItem value="success">success</ToggleGroupItem>
          <ToggleGroupItem value="error">error</ToggleGroupItem>
          <ToggleGroupItem value="info">info</ToggleGroupItem>
        </ToggleGroup>
      </label>

      <div className="flex items-center gap-4">
        <button
          onClick={handleClick}
          disabled={isRegisterFcmTokenPending}
          className={cn("rounded-lg border p-3", {
            "bg-green-200": isRegisterFcmTokenPending,
          })}
        >
          FCM 등록
        </button>

        <Button onClick={handleToastBtnClick}>토스트 테스트</Button>
        <Button
          onClick={() =>
            showFcmToastForReservation({
              title: "예약 요청",
              body: {
                message: "최용재회원 회원님의 PT 예약이 확정되었습니다.",
                eventDate: "07.07 (월) 오후 3시",
                other: null,
              },
              onClick: () => router.push(RouteInstance.notification()),
            })
          }
        >
          포그라운드 알림 UI 테스트
        </Button>
      </div>
    </div>
  );
}

export default Page;
