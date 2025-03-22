"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/Avatar";
import { Button } from "@ui/components/Button";
import Header from "@ui/components/Header";
import Icon from "@ui/components/Icon";
import { Popup, PopupTrigger } from "@ui/components/Popup";
import { ProfileItem } from "@ui/components/ProfileItem";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/components/Sheet";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { MyInformationDetailApiResponse } from "@user/services/types/myInformation.dto";

export default function MyInfomation() {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);

  const [mockData] = useState<MyInformationDetailApiResponse["data"]>({
    memberId: 2,
    name: "김민수",
    birthDate: "1990-05-12",
    phoneNumber: "010-2938-2312",
    profilePictureUrl: "https://github.com/shadcn.png",
  });
  const router = useRouter();

  const handleClickBack = () => {
    router.push("/my-page");
  };

  const handleClickPopupNegative = () => {
    // TODO
    // 트레이너 연동 해제 취소
  };

  const handleClickPopupPositive = () => {
    // TODO
    // 트레이너 연동 해제
    handleClickBack();
    setIsOpenBottomSheet(true);
  };

  const negative = {
    label: "취소",
    callback: handleClickPopupNegative,
  };

  const positive = {
    label: "확인",
    callback: handleClickPopupPositive,
  };

  return (
    <main className="flex h-screen w-full flex-col overflow-hidden pb-[5.063rem]">
      <Header>
        <Header.Left>
          <Header.Back onClick={handleClickBack} />
        </Header.Left>
        <Header.Title content="내 정보" />
      </Header>

      <section className="mt-[1.563rem] flex flex-col items-center justify-center">
        <Avatar className="h-[6.313rem] w-[6.313rem]">
          <AvatarFallback />
          <AvatarImage src={mockData.profilePictureUrl} />
        </Avatar>

        <div className={"mt-[1.25rem] w-full"}>
          <ProfileItem variant={"name"}>
            <div className="flex h-full items-center gap-[0.625rem]">
              <label>{mockData.name}</label>
            </div>
          </ProfileItem>
          <ProfileItem variant={"birthday"}>
            <div className="flex h-full items-center gap-[0.625rem]">
              <label>{mockData.birthDate}</label>
            </div>
          </ProfileItem>
          <Popup title="트레이너와 연동 해제하시겠습니까?" negative={negative} positive={positive}>
            <PopupTrigger className="w-full">
              <ProfileItem variant={"unlink"}>
                <div className="flex h-full items-center gap-[0.625rem]">
                  <div className="flex items-center">
                    <ChevronRight />
                  </div>
                </div>
              </ProfileItem>
            </PopupTrigger>
          </Popup>
        </div>
      </section>
      <Sheet open={isOpenBottomSheet} onOpenChange={setIsOpenBottomSheet}>
        <SheetTrigger></SheetTrigger>
        <SheetContent side={"bottom"}>
          <SheetHeader>
            <SheetTitle className="flex justify-center">
              <Icon name="Check" className="h-[3.125rem] w-[3.125rem]" background="brand" />
            </SheetTitle>
          </SheetHeader>
          <SheetDescription asChild>
            <div className="flex flex-col gap-[0.875rem] text-center">
              <p className="text-title-1">트레이너와 연동 해제되었습니다</p>
              <p className="text-body-1">트레이너에게 연동 해제 알람이 전송돼요</p>
            </div>
          </SheetDescription>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant={"brand"} className="h-[3.375rem] w-full">
                확인
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </main>
  );
}
