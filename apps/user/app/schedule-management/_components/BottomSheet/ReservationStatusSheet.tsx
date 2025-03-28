import { BaseReservationListItem } from "@5unwan/core/api/types/common";
import { Badge } from "@ui/components/Badge";
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
import DateController from "@ui/lib/DateController";
import { cn } from "@ui/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

import RequestSuccessSheet from "./RequestSuccessSheet";
import ReservationCancelSheet from "./ReservationCancelSheet";
import { ROUTES } from "../../_constants/route";

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

  const { status, reservationDate } = reservationContent;
  const searchParams = new URLSearchParams({ reservationDate: reservationDate[0] });
  const validateDates = reservationDate.map((content) => DateController(content).validate());

  const [isReservationCancelSheetOpen, setIsReservationCancelSheetOpen] = useState(false);
  const [isReservationCancelSuccessSheetOpen, setIsReservationCancelSuccessSheetOpen] =
    useState(false);

  const handleClickCancelButton = () => {
    if (status === "예약 대기") {
      setIsReservationCancelSuccessSheetOpen(true);

      return;
    }

    setIsReservationCancelSheetOpen(true);
  };

  const handleClickChangeButton = () => {
    router.push(`${ROUTES.ROOT}/${ROUTES.EDIT_RESERVATION}?${searchParams.toString()}`);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onChangeOpen}>
        <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
          <SheetClose className="absolute right-5 top-5">
            <Icon name="X" size="lg" />
          </SheetClose>
          <SheetHeader>
            <SheetTitle className="flex justify-center">{reservationContent?.status}</SheetTitle>
            <SheetDescription className="flex justify-center">
              {status === "예약 대기" && (
                <Badge className="mb-5 h-8 w-[6.313rem] rounded-full">예약 대기중</Badge>
              )}
            </SheetDescription>
            <div className="bg-background-sub1 flex h-[5.625rem] w-full flex-col items-center justify-center rounded-[0.625rem]">
              {validateDates.map((validateDate) => (
                <p key={validateDate?.toAbsolute()}>
                  {validateDate?.toServiceFormat().untilMinutes}
                </p>
              ))}
            </div>
          </SheetHeader>
          <SheetFooter>
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
              {
                //TODO: popup 컴포넌트 리팩토링 완료되면 추가하여 예약을 취소 리마인더 팝업 구현 예정
                status !== "예약 대기" && (
                  <SheetClose asChild>
                    <Button
                      onClick={handleClickChangeButton}
                      className="bg-background-sub5 text-text-sub5 flex h-full w-full flex-1 items-center justify-center rounded-[0.625rem] transition-colors hover:bg-[#f5f5f5]"
                    >
                      예약 변경
                    </Button>
                  </SheetClose>
                )
              }
            </div>
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
    </>
  );
}

export default ReservationStatusSheet;
