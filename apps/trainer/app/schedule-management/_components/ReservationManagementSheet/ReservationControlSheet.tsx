"use client";

import { Button } from "@ui/components/Button";
import Icon from "@ui/components/Icon";
import { Input } from "@ui/components/Input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import DateController from "@ui/lib/DateController";
import { ChangeEvent, useState } from "react";

import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

import ProfileCard from "@trainer/components/ProfileCard";

type ReservationControlSheetProps = {
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  selectedDate: Date;
  memberInformation: ModifiedReservationListItem;
};

function ReservationControlSheet({
  open,
  onChangeOpen,
  selectedDate,
  memberInformation,
}: ReservationControlSheetProps) {
  const { memberInfo } = memberInformation;
  /** TODO: memberId로 특정 회원의 상세 정보를 불러와 이미지,번호,생일,총 PT횟수, 잔여 PT 횟수 불러오기 */
  const { name } = memberInfo;
  const selectedFormatDate = DateController(selectedDate).toDateTimeWithDayFormat();

  const [inputValue, setInputValue] = useState("");
  const [isReservationCancelSheetOpen, setIsReservationCancelSheetOpen] = useState(false);
  const [isReservationCancelSuccessSheetOpen, setIsReservationCancelSuccessSheetOpen] =
    useState(false);

  const handleClickReservationCancelSheetOpen = () => {
    setIsReservationCancelSheetOpen(true);
  };

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClickReservationCancelSuccessSheetOpen = () => {
    setIsReservationCancelSuccessSheetOpen(true);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onChangeOpen}>
        <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
          <SheetHeader className="items-center">
            <SheetTitle className="flex justify-center">{selectedFormatDate}</SheetTitle>
          </SheetHeader>
          <ProfileCard
            imgUrl={""}
            userBirth={new Date()}
            userName={name as string}
            phoneNumber={""}
            className="bg-background-sub1 w-full hover:bg-none"
          />
          <SheetFooter>
            <div className="flex w-full justify-center gap-[0.625rem]">
              <SheetClose asChild>
                <Button
                  className="h-[3.375rem] w-full"
                  variant={"secondary"}
                  onClick={handleClickReservationCancelSheetOpen}
                >
                  예약 취소
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button className="h-[3.375rem] w-full" variant={"negative"}>
                  닫기
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {/** TODO: reservationId를 사용하여 예약 취소 API 붙히기 */}
      <Sheet open={isReservationCancelSheetOpen} onOpenChange={setIsReservationCancelSheetOpen}>
        <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
          <SheetHeader>
            <SheetTitle className="text-center">예약 취소</SheetTitle>
            <SheetDescription className="text-center">
              예약을 취소하려는 사유를 입력해주세요
            </SheetDescription>
            <Input
              value={inputValue}
              onChange={handleChangeInputValue}
              className="mt-5 h-[2.813rem] w-full"
              placeholder="취소 사유"
            />
            <p className="text-body-1 text-text-sub3 mt-5 whitespace-pre-line text-center">{`홍길동 회원에게\n사유와 함께 예약 취소 알림이 전송돼요`}</p>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                disabled={!inputValue.length}
                className="disabled:bg-background-sub1 h-[3.375rem] w-full"
                onClick={handleClickReservationCancelSuccessSheetOpen}
              >
                예약 취소
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet
        open={isReservationCancelSuccessSheetOpen}
        onOpenChange={setIsReservationCancelSuccessSheetOpen}
      >
        <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
          <SheetHeader className="items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="text-center">PT 예약이 취소되었습니다</SheetTitle>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button className="h-[3.375rem] w-full">확인</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ReservationControlSheet;
