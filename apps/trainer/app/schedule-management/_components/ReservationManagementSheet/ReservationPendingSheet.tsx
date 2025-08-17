"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import { VisuallyHidden } from "@ui/components/VisuallyHidden";
import DateController from "@ui/lib/DateController";
import { useRouter } from "next/navigation";

import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

import RouteInstance from "@trainer/constants/route";

import { getPendingReservationCount } from "../../_utils/reservationMerger";
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
      <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
        <SheetHeader className="items-center">
          <SheetTitle className="flex justify-center">{selectedFormatDate}</SheetTitle>
          <VisuallyHidden>
            <SheetDescription>
              이 시트는 선택한 시간 블록의 예약 신청 현황을 확인할 수 있습니다.
            </SheetDescription>
          </VisuallyHidden>
        </SheetHeader>
        <div
          className="text-body-1 bg-background-sub1 flex h-[5.625rem] w-full cursor-pointer items-center justify-center rounded-[0.625rem]"
          onClick={handleClickRoutePendingReservationPage}
        >
          해당 시간에 PT 예약을 요청한 회원은
          <span className="bg-brand-secondary-500 text-body-1 text-text-sub5 mx-1 rounded-[0.625rem] px-[0.625rem] py-1">{`${getPendingReservationCount(memberInformations, selectedDate)}명`}</span>
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
