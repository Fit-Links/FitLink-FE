import { Button } from "@ui/components/Button";
import Icon from "@ui/components/Icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import React, { useState } from "react";

import ProfileCard from "@trainer/components/ProfileCard";

import SessionSetterSheet from "../SessionSetterSheet";

type ConnectTrainerSheetProps = {
  notificationId: number;
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
};

function ConnectTrainerSheet({ open, onChangeOpen }: ConnectTrainerSheetProps) {
  //TODO: 알림 상세 내역 조회 API 연결
  const { name, profilePictureUrl, birthDate, phoneNumber } = DUMMY_MEMBER_DATA;

  const [isDeclineSheetOpen, setIsDeclineSheetOpen] = useState(false);
  const [isAcceptSheetOpen, setIsAccepSheetOpen] = useState(false);
  const [isAcceptActionSheetOpen, setIsAcceptActionSheetOpen] = useState(false);

  const handleDeclineClick = () => {
    setIsDeclineSheetOpen(true);
  };
  const handleAcceptClick = () => {
    setIsAcceptActionSheetOpen(true);
  };
  const handleSubmit = () => {
    setIsAcceptActionSheetOpen(false);
    setIsAccepSheetOpen(true);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onChangeOpen}>
        <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
          <SheetHeader className="items-center">
            <SheetTitle className="flex justify-center">연동 승인</SheetTitle>
            <SheetDescription>{name} 회원이 연동 승인을 요청했어요</SheetDescription>
          </SheetHeader>
          <ProfileCard
            imgUrl={profilePictureUrl}
            userBirth={new Date(birthDate)}
            userName={name}
            phoneNumber={phoneNumber}
            className="bg-background-sub1 w-full hover:bg-none"
          />
          <SheetFooter>
            <div className="flex w-full justify-center gap-[0.625rem]">
              <SheetClose asChild>
                <Button
                  size={"xl"}
                  className="w-full"
                  variant={"secondary"}
                  onClick={handleDeclineClick}
                >
                  거절
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  size={"xl"}
                  className="w-full"
                  variant={"negative"}
                  onClick={handleAcceptClick}
                >
                  승인
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Sheet open={isDeclineSheetOpen} onOpenChange={setIsDeclineSheetOpen}>
        <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
          <SheetHeader className="items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="text-center">연동 요청이 거절되었습니다</SheetTitle>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button size={"xl"} className="w-full">
                확인
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <SessionSetterSheet
        isOpen={isAcceptActionSheetOpen}
        onOpenChange={setIsAccepSheetOpen}
        onSubmit={handleSubmit}
      />
      <Sheet open={isAcceptSheetOpen} onOpenChange={setIsAccepSheetOpen}>
        <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
          <SheetHeader className="items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="text-center">연동 요청이 승인되었습니다</SheetTitle>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button size={"xl"} className="w-full">
                확인
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ConnectTrainerSheet;

const DUMMY_MEMBER_DATA = {
  name: "홍길동",
  birthDate: "1999-10-14",
  phoneNumber: "01023212321",
  profilePictureUrl: "http://123",
};
