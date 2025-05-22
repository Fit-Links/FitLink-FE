"use client";

import { BaseReservationListItem } from "@5unwan/core/api/types/common";
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
import { ChangeEvent, useState } from "react";

import RequestSuccessSheet from "./RequestSuccessSheet";
import { useReservationCancelMutation } from "../../_hooks/mutation/useReservationCancelMutation";

type ReservationCancelSheetProps = {
  reservationContent: BaseReservationListItem;
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
};

const REQUEST_SUCCESS_MAP: Record<string, { title: string; description?: string }> = {
  "예약 대기": {
    title: "PT 예약이 취소되었습니다",
    description: undefined,
  },
  "예약 확정": {
    title: "트레이너에게\nPT 예약 취소를 요청했습니다",
    description: "당일 취소는 PT 횟수 1회 차감되요",
  },
};

function ReservationCancelSheet({
  reservationContent,
  open,
  onChangeOpen,
}: ReservationCancelSheetProps) {
  const { status, reservationDates, reservationId } = reservationContent;

  if (status === "예약 변경 요청") return;

  const [inputValue, setInputValue] = useState("");
  const [isRequestSuccessOpen, setIsRequestSuccessOpen] = useState(false);

  const { reservationCancel } = useReservationCancelMutation();

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClickCancelReservation = () => {
    reservationCancel({
      reservationId: reservationId,
      cancelReason: inputValue,
      cancelDate: reservationDates[0],
    });

    setIsRequestSuccessOpen(true);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onChangeOpen}>
        <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
          <SheetClose className="absolute right-5 top-5">
            <Icon name="X" size="lg" />
          </SheetClose>
          <SheetHeader>
            <SheetTitle className="flex justify-center">예약 취소</SheetTitle>
            <SheetDescription className="flex justify-center">
              예약을 취소하려는 사유를 입력해주세요
            </SheetDescription>
            <Input
              className="mt-5 w-full"
              value={inputValue}
              onChange={handleChangeInput}
              placeholder="취소 사유"
            />
          </SheetHeader>
          <SheetFooter>
            <div className="flex h-[3.375rem] w-full gap-2">
              <SheetClose asChild>
                <Button
                  onClick={handleClickCancelReservation}
                  disabled={!inputValue.length}
                  className="bg-brand-primary-500 hover:bg-brand-primary-400 disabled:bg-background-sub1 flex h-full flex-1 items-center justify-center rounded-[0.625rem] transition-colors"
                >
                  취소 요청
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <RequestSuccessSheet
        open={isRequestSuccessOpen}
        onChangeOpen={setIsRequestSuccessOpen}
        title={REQUEST_SUCCESS_MAP[status].title}
        description={REQUEST_SUCCESS_MAP[status].description}
        closeSheetText="확인"
      />
    </>
  );
}

export default ReservationCancelSheet;
