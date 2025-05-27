"use client";

import { Button } from "@ui/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@ui/components/Dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import DateController from "@ui/lib/DateController";
import { format } from "date-fns";
import { useState } from "react";

import { useReservationNotAllowMutation } from "../../_hooks/mutations/useReservationNotAllowMutation";
type ReservationNotAllowedCancelSheetProps = {
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  selectedDate: Date;
  reservationId: number;
};

/** TODO: 예약 불가 해제 API 붙이기 */
function ReservationNotAllowedCancelSheet({
  open,
  onChangeOpen,
  selectedDate,
  reservationId,
}: ReservationNotAllowedCancelSheetProps) {
  const selectedFormatDate = DateController(selectedDate).toDateTimeWithDayFormat();

  const [isRemindPopupOpen, setIsRemindPopupOpen] = useState(false);

  const { reservationNotAllow } = useReservationNotAllowMutation();

  const handleClickOpenPopup = () => {
    setIsRemindPopupOpen(true);
  };

  /** 예약 불가 설정을 취소하면  예약 내역에서 사라짐 */
  const handleClickDeleteNotAllowedReservation = () => {
    reservationNotAllow({
      date: format(selectedDate, "yyyy-MM-dd'T'HH:mm"),
      reservationId,
    });
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onChangeOpen}>
        <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
          <SheetHeader className="itmes-center">
            <SheetTitle className="flex justify-center">예약 불가 시간</SheetTitle>
          </SheetHeader>
          <div className="text-headline bg-background-sub1 flex h-[5.625rem] w-full flex-col items-center justify-center rounded-[0.625rem]">
            {selectedFormatDate}
          </div>
          <SheetFooter>
            <div className="flex h-[3.375rem] w-full gap-2">
              <SheetClose asChild>
                <Button
                  onClick={handleClickOpenPopup}
                  className="bg-background-sub1 hover:bg-background-sub3 flex h-full w-full flex-1 items-center justify-center rounded-[0.625rem] transition-colors"
                >
                  삭제
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button className="bg-background-sub5 text-text-sub5 flex h-full w-full flex-1 items-center justify-center rounded-[0.625rem] transition-colors hover:bg-[#f5f5f5]">
                  확인
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Dialog open={isRemindPopupOpen} onOpenChange={setIsRemindPopupOpen}>
        <DialogContent>
          <DialogHeader className="whitespace-pre-line">{`예약 불가 시간을\n삭제 하시겠습니까?`}</DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full" variant={"secondary"}>
                닫기
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleClickDeleteNotAllowedReservation} className="w-full">
                삭제
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ReservationNotAllowedCancelSheet;
