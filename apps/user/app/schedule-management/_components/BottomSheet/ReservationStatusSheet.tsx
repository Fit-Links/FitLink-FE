import { BaseReservationListItem } from "@5unwan/core/api/types/common";
import { Badge } from "@ui/components/Badge";
import { Button } from "@ui/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ui/components/Dialog";
import Icon from "@ui/components/Icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import DateController from "@ui/lib/DateController";
import { cn } from "@ui/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

import RouteInstance from "@user/constants/routes";

import RequestSuccessSheet from "./RequestSuccessSheet";
import ReservationCancelSheet from "./ReservationCancelSheet";
import { useReservationCancelMutation } from "../../_hooks/mutation/useReservationCancelMutation";

type ReservationStatusSheetProps = {
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  reservationContent: BaseReservationListItem;
};

function ReservationStatusSheet({
  open,
  onChangeOpen,
  reservationContent,
}: ReservationStatusSheetProps) {
  const router = useRouter();

  const { status, reservationDates, reservationId } = reservationContent;

  const validateDates = reservationDates.map((content) => DateController(content).validate());

  const [isReservationCancelSheetOpen, setIsReservationCancelSheetOpen] = useState(false);
  const [isReservationCancelSuccessSheetOpen, setIsReservationCancelSuccessSheetOpen] =
    useState(false);
  const [isReservationRemindCancelPopupOpen, setIsReservationRemindCancelPopupOpen] =
    useState(false);

  const { reservationCancel } = useReservationCancelMutation();

  const handleClickCancelButton = () => {
    if (status === "예약 대기") {
      setIsReservationRemindCancelPopupOpen(true);

      return;
    }

    setIsReservationCancelSheetOpen(true);
  };

  const handleClickChangeButton = () => {
    router.push(
      RouteInstance.reservation("edit", {
        reservationDate: reservationDates[0],
        reservationId: String(reservationId),
      }),
    );
  };

  const handleClickRemindButton = () => {
    reservationCancel({
      reservationId: reservationId,
      cancelReason: "예약 대기 취소 요청",
      cancelDate: reservationDates[0],
    });

    setIsReservationCancelSuccessSheetOpen(true);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onChangeOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
          <SheetClose className="absolute right-5 top-5">
            <Icon name="X" size="lg" />
          </SheetClose>
          <SheetHeader>
            <SheetTitle className="flex justify-center">{reservationContent?.status}</SheetTitle>
            <div className="text-body-1 flex justify-center">
              {status === "예약 대기" && (
                <Badge className="mb-5 h-8 w-[6.313rem] rounded-full">예약 대기중</Badge>
              )}
            </div>
            <div className="bg-background-sub1 flex h-[5.625rem] w-full flex-col items-center justify-center rounded-[0.625rem]">
              {validateDates.map((validateDate) => (
                <p key={validateDate?.toAbsolute()}>
                  {validateDate?.toServiceFormat().untilMinutes}
                </p>
              ))}
            </div>
          </SheetHeader>
          <SheetFooter>
            {status === "예약 변경 요청" ? (
              <SheetClose asChild>
                <Button className="bg-background-sub1  hover:bg-background-sub3 flex h-[3.375rem] w-full items-center justify-center ">
                  확인
                </Button>
              </SheetClose>
            ) : (
              <div className="flex h-[3.375rem] w-full gap-2">
                <SheetClose asChild>
                  <Button
                    onClick={handleClickCancelButton}
                    className={cn(
                      "bg-background-sub1 hover:bg-background-sub3 flex h-full w-full flex-1 items-center justify-center rounded-[0.625rem] transition-colors",
                      reservationContent.status === "예약 대기" &&
                        "bg-background-sub5 text-text-sub5 hover:bg-[#f5f5f5]",
                    )}
                  >
                    예약 취소
                  </Button>
                </SheetClose>
                {status !== "예약 대기" && (
                  <SheetClose asChild>
                    <Button
                      onClick={handleClickChangeButton}
                      className="bg-background-sub5 text-text-sub5 flex h-full w-full flex-1 items-center justify-center rounded-[0.625rem] transition-colors hover:bg-[#f5f5f5]"
                    >
                      예약 변경
                    </Button>
                  </SheetClose>
                )}
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <RequestSuccessSheet
        open={isReservationCancelSuccessSheetOpen}
        onChangeOpen={setIsReservationCancelSuccessSheetOpen}
        title="PT 예약이 취소되었습니다"
        closeSheetText="확인"
      />

      <ReservationCancelSheet
        open={isReservationCancelSheetOpen}
        reservationContent={reservationContent}
        onChangeOpen={setIsReservationCancelSheetOpen}
      />

      <Dialog
        open={isReservationRemindCancelPopupOpen}
        onOpenChange={setIsReservationRemindCancelPopupOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>대기중인 예약을 취소하시겠습니까?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose className="flex w-full items-center justify-center gap-[0.625rem]">
              <Button variant="secondary" className="flex-1">
                닫기
              </Button>
              <Button onClick={handleClickRemindButton} className="flex-1">
                확인
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ReservationStatusSheet;
