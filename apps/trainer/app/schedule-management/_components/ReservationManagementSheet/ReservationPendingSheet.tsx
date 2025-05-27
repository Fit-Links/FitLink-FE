"use client";

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@ui/components/Sheet";
import DateController from "@ui/lib/DateController";
import { useRouter } from "next/navigation";

import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

import RouteInstance from "@trainer/constants/route";

import TimeOptionList from "../TimeOptionList";

type ReservationPendingSheetProps = {
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  selectedDate: Date;
  memberInformations: ModifiedReservationListItem[];
};

function ReservationPendingSheet({
  open,
  onChangeOpen,
  selectedDate,
  memberInformations,
}: ReservationPendingSheetProps) {
  const router = useRouter();

  const selectedFormatDate = DateController(selectedDate).toDateTimeWithDayFormat();

  const handleClickRoutePendingReservationPage = () => {
    router.push(
      RouteInstance["pending-reservations"]("", {
        selectedDate: String(selectedDate),
        formattedSelectedDate: selectedFormatDate,
      }),
    );
  };

  return (
    <Sheet open={open} onOpenChange={onChangeOpen}>
      <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
        <SheetHeader className="items-center">
          <SheetTitle className="flex justify-center">{selectedFormatDate}</SheetTitle>
        </SheetHeader>
        <div
          className="text-body-1 bg-background-sub1 flex h-[5.625rem] w-full cursor-pointer items-center justify-center rounded-[0.625rem]"
          onClick={handleClickRoutePendingReservationPage}
        >
          해당 시간에 PT 예약을 요청한 회원은
          <span className="bg-brand-secondary-500 text-body-1 text-text-sub5 mx-1 rounded-[0.625rem] px-[0.625rem] py-1">{`${memberInformations.length}명`}</span>
          입니다
        </div>
        <SheetFooter>
          <TimeOptionList
            onChangeOpen={onChangeOpen}
            selectedDate={selectedDate}
            selectedFormatDate={selectedFormatDate}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ReservationPendingSheet;
