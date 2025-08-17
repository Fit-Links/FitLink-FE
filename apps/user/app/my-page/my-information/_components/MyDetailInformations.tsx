"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import BrandSpinner from "@ui/components/BrandSpinner";
import { Button } from "@ui/components/Button";
import { ProfileItem } from "@ui/components/ProfileItem";
import PushPermissionSwitch from "@ui/components/PushPermissionSwitch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import { usePushPermissionSwitch } from "@ui/hooks/usePushPermissionSwitch";
import { HelpCircle } from "lucide-react";
import React, { useState } from "react";

import { useRegisterFcmToken } from "@user/app/register/_hooks/useRegisterFcmToken";
import { myInformationQueries } from "@user/queries/myInformation";

import { MemorizedChangePhoneLink } from "./MemorizedChangePhoneLink";
import { MemorizedProfileItem } from "./MemorizedProfileItem";
import { getFormattedPhoneNumber } from "../../_utils/getPhoneNumberFormat";

export default function MyDetailInformations() {
  const { data: response } = useSuspenseQuery(myInformationQueries.detail());

  const myDetailInformation = response?.data;

  const { requestFcmPermission, isPending: isRegisterFcmTokenPending } = useRegisterFcmToken();

  const [isReconnectPushDialogOpen, setIsReconnectPushDialogOpen] = useState(false);

  const {
    isHelpDialopOpen,
    setIsHelpDialogOpen,
    isNotificationGranted,
    handleToggle,
    helpDialogDescription,
  } = usePushPermissionSwitch(requestFcmPermission);

  return (
    <section className="w-full flex-col">
      <MemorizedProfileItem type="name" value={myDetailInformation?.name ?? ""} />
      <MemorizedProfileItem type="birthday" value={myDetailInformation?.birthDate ?? ""} />
      <MemorizedChangePhoneLink
        value={`${getFormattedPhoneNumber(myDetailInformation?.phoneNumber ?? "")}`}
      />
      <ProfileItem variant="pushAlarm" className="w-full">
        <PushPermissionSwitch
          checked={isNotificationGranted}
          onChecked={handleToggle}
          isDialogOpen={isHelpDialopOpen}
          setIsDialogOpen={setIsHelpDialogOpen}
          dialogDescription={helpDialogDescription}
        />
      </ProfileItem>
      {isNotificationGranted && (
        <>
          <div className="flex w-full items-center justify-center">
            <p
              className="text-text-sub3 text-body-1 mt-4 flex w-fit cursor-pointer items-center justify-center gap-2 md:hover:underline"
              onClick={() => setIsReconnectPushDialogOpen(true)}
            >
              <HelpCircle className="h-4 w-4" />
              <span>푸시 알림이 수신되지 않으시나요?</span>
            </p>
          </div>
          <Sheet open={isReconnectPushDialogOpen} onOpenChange={setIsReconnectPushDialogOpen}>
            <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
              <SheetHeader>
                <SheetTitle>푸시 알림이 수신되지 않으세요?</SheetTitle>
                <SheetDescription>
                  <div className="flex items-center justify-center md:justify-start">
                    <p className="text-left">
                      ① 2개 이상의 기기에서 동일 계정을 공유하시거나
                      <br />② 회원가입 진행 중 오류가 발생했을 경우
                    </p>
                  </div>
                  <br />
                  푸시 알림 연동에 실패했을 수 있습니다.
                  <br /> 아래 버튼을 눌러 푸시 알림 연동을 진행해주세요
                </SheetDescription>
              </SheetHeader>
              <div>
                <Button
                  disabled={isRegisterFcmTokenPending}
                  size="lg"
                  className="w-full"
                  onClick={async () => {
                    await requestFcmPermission();
                    setIsReconnectPushDialogOpen(false);
                  }}
                >
                  {isRegisterFcmTokenPending ? (
                    <BrandSpinner className="h-8 w-8" />
                  ) : (
                    "푸시 알림 재연동하기"
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </section>
  );
}
