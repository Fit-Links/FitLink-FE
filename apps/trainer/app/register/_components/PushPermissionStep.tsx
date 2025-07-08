"use client";

import BrandSpinner from "@ui/components/BrandSpinner";
import { Button } from "@ui/components/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import { Text } from "@ui/components/Text";
import { getEnvironment } from "@ui/utils/getEnvironment";
import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useRegisterFcmToken } from "../_hooks/useRegisterFcmToken";

type PushPermissionStepProps = {
  onNext: () => void;
};
function PushPermissionStep({ onNext }: PushPermissionStepProps) {
  const { requestFcmPermission, isPending, isError } = useRegisterFcmToken();

  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isDeniedNoticeOpen, setIsDeniedNoticeOpen] = useState(false);
  const [isGrantedNoticeOpen, setIsGrantedNoticeOpen] = useState(false);
  const [isUnsupportedNoticeOpen, setIsUnsupportedNoticeOpen] = useState(false);

  const environmentRef = useRef<ReturnType<typeof getEnvironment>>("desktop-web");

  const handleClick = async () => {
    if (Notification.permission === "denied") {
      setIsNoticeOpen(true);

      return;
    }

    const resultPermission = await requestFcmPermission();

    if (resultPermission === "denied") {
      setIsDeniedNoticeOpen(true);
    } else if (resultPermission === "granted") {
      setIsGrantedNoticeOpen(true);
    } else if (resultPermission === "unSupported") {
      setIsUnsupportedNoticeOpen(true);
    }
  };

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      environmentRef.current = getEnvironment();
    }
  }, []);

  const isMobilePwa = environmentRef.current === "mobile-pwa";
  const systemBasedDescription = `${isMobilePwa ? "앱 시스템 설정" : "브라우저 환경설정"}에서 [알림] 항목을 설정해주세요`;

  return (
    <>
      <>
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="bg-brand-primary-500 mb-[1.75rem] flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-full">
            <Bell className="text-text-primary" aria-hidden="true" />
          </div>
          <Text.Title1>알림 설정</Text.Title1>
          <Text.Subhead2 className="text-text-sub1 text-center">
            PT 예약 현황, 트레이너 연동과 같이 <br />
            중요한 알림을 받을 수 있도록 알림을 설정해 주세요
          </Text.Subhead2>
        </div>
        {isPending ? (
          <div className="flex h-[3.375rem] w-full items-center justify-center">
            <BrandSpinner />
          </div>
        ) : (
          <div className="flex h-[3.375rem] w-full items-center gap-4">
            <Button size="xl" variant="outline" className="w-full" onClick={onNext}>
              건너뛰기
            </Button>
            <Button size="xl" variant="brand" className="w-full" onClick={handleClick}>
              알림 권한 설정하기
            </Button>
          </div>
        )}
      </>
      <Sheet open={isNoticeOpen} onOpenChange={setIsNoticeOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader>
            <SheetTitle>알림 권한이 거부되어 있습니다</SheetTitle>
            <SheetDescription>
              알림 권한 재설정 후 마이페이지에서 재시도해주세요
              <br />
              <br />
              알림 권한을 재설정하려면
              <br />
              {systemBasedDescription}
            </SheetDescription>
          </SheetHeader>
          <SheetClose asChild>
            <Button className="w-full" size="lg" onClick={onNext}>
              홈으로 이동하기
            </Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
      <Sheet open={isDeniedNoticeOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader>
            <SheetTitle>알림 권한을 거부하셨습니다</SheetTitle>
            <SheetDescription>
              알림 권한을 재설정하려면 <br />
              {systemBasedDescription}
            </SheetDescription>
          </SheetHeader>
          <SheetClose asChild>
            <Button className="w-full" size="lg" onClick={onNext}>
              홈으로 이동하기
            </Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
      <Sheet open={isGrantedNoticeOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader>
            <SheetTitle>알림 권한을 승인하셨습니다</SheetTitle>
            <SheetDescription>
              알림 권한을 재설정하려면 <br />
              {systemBasedDescription}
            </SheetDescription>
          </SheetHeader>
          <SheetClose asChild>
            <Button className="w-full" size="lg" onClick={onNext}>
              홈으로 이동하기
            </Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
      <Sheet open={isUnsupportedNoticeOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader>
            <SheetTitle>알림 기능이 지원되지 않는 환경입니다</SheetTitle>
            <SheetDescription>사용하시는 기기 또는 브라우저를 바꿔서 시도해주세요</SheetDescription>
          </SheetHeader>
          <SheetClose asChild>
            <Button className="w-full" size="lg" onClick={onNext}>
              홈으로 이동하기
            </Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
      <Sheet open={isError}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader>
            <SheetTitle>오류가 발생했습니다</SheetTitle>
            <SheetDescription>
              알림 기능을 설정하던 중 예상치 못한 오류가 발생했습니다. <br />
              {isMobilePwa ? "앱" : "브라우저"} 알림 권한 재설정 후 마이페이지에서 재시도해주세요
            </SheetDescription>
          </SheetHeader>
          <SheetClose asChild>
            <Button className="w-full" size="lg" onClick={onNext}>
              홈으로 이동하기
            </Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default PushPermissionStep;
