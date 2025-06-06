"use client";

import { Button } from "@ui/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@ui/components/Dialog";
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
import { VisuallyHidden } from "@ui/components/VisuallyHidden";
import DateController from "@ui/lib/DateController";
import { format } from "date-fns";
import { useEffect, useState } from "react";

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
  const [isReservationNotAllowCancelSheetOpen, setIsReservationNotAllowCancelSheetOpen] =
    useState(false);

  const { reservationNotAllow, isSuccess } = useReservationNotAllowMutation();

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

  useEffect(() => {
    if (isSuccess) {
      setIsReservationNotAllowCancelSheetOpen(true);
    }
  }, [isSuccess]);

  return (
    <>
      <Sheet open={open} onOpenChange={onChangeOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
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

      <Sheet
        open={isReservationNotAllowCancelSheetOpen}
        onOpenChange={setIsReservationNotAllowCancelSheetOpen}
      >
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
          <SheetHeader className="items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="text-center">예약 불가 설정이 해제되었습니다</SheetTitle>
            <VisuallyHidden>
              <SheetDescription>
                이 시트는 예약 불가 설정 해제 처리가 완료되었음을 알려줍니다.
              </SheetDescription>
            </VisuallyHidden>
          </SheetHeader>
          <SheetFooter>
            <Button className="h-[3.375rem] w-full">확인</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ReservationNotAllowedCancelSheet;
