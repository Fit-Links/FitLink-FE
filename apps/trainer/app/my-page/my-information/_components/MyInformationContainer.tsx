"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "@ui/components/Avatar";
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
import Image from "next/image";
import { useState } from "react";

import { useRegisterFcmToken } from "@trainer/app/register/_hooks/useRegisterFcmToken";
import { myInformationQueries } from "@trainer/queries/myInformation";

import { MemorizedProfileItem } from "./MemorizedProfileItem";
import { getFormattedPhoneNumber } from "../_utils/getFormattedPhoneNumber";
import EditProfileBottomSheet from "./BottomSheet/EditProfileBottomSheet";

export default function MyInformationContainer() {
  const { data: response } = useSuspenseQuery(myInformationQueries.myInformation());

  if (!response) return;

  const myDetailInformation = response.data;

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
    <section className="bg-background-primary text-text-primary flex w-full flex-1 flex-col items-center">
      <Avatar className="mt-[1.563rem] h-[6.313rem] w-[6.313rem]">
        {myDetailInformation.profilePictureUrl ? (
          <Image
            width={50}
            height={50}
            src={myDetailInformation.profilePictureUrl}
            alt={`${myDetailInformation.name} 프로필`}
            className="h-full w-full"
          />
        ) : (
          <AvatarFallback />
        )}
      </Avatar>

      <EditProfileBottomSheet>
        <Button className="mt-[1.25rem]" variant={"brand"} size={"sm"} corners={"pill"}>
          {myDetailInformation.profilePictureUrl ? "프로필 사진 수정" : "프로필 사진 등록"}
        </Button>
      </EditProfileBottomSheet>

      <MemorizedProfileItem
        className="mt-[1.25rem]"
        variant="name"
        value={myDetailInformation.name}
      />
      <MemorizedProfileItem variant="birthday" value={myDetailInformation.birthDate} />

      <MemorizedProfileItem
        variant="phone"
        value={getFormattedPhoneNumber(myDetailInformation.phoneNumber)}
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
              className="text-text-sub3 text-body-1 flex w-fit cursor-pointer items-center justify-center gap-2 md:hover:underline"
              onClick={() => setIsReconnectPushDialogOpen(true)}
            >
              <HelpCircle className="h-4 w-4" />
              <span>푸시 알림이 수신되지 않으시나요?</span>
            </p>
          </div>
          <Sheet open={isReconnectPushDialogOpen} onOpenChange={setIsReconnectPushDialogOpen}>
            <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
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
