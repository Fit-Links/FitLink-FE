"use client";

import { PtStatus, ReservationStatus } from "@5unwan/core/api/types/common";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@ui/components/Badge";
import { Button } from "@ui/components/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import DateController from "@ui/lib/DateController";

import { reservationQueries } from "@trainer/queries/reservation";

import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

import ProfileCard from "@trainer/components/ProfileCard";

import { useReservationCompletionMutation } from "../../_hooks/mutations/useReservationCompletionMutation";

type ReservationOutcomeSheetProps = {
  reservationStatus: Extract<ReservationStatus, "예약 종료" | "예약 확정" | "고정 예약">;
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  selectedDate: Date;
  memberInformation: ModifiedReservationListItem;
};

function ReservationOutcomeSheet({
  reservationStatus,
  open,
  onChangeOpen,
  selectedDate,
  memberInformation,
}: ReservationOutcomeSheetProps) {
  const { memberInfo, reservationId } = memberInformation;

  const { name, memberId } = memberInfo;

  const selectedFormatDate = DateController(selectedDate).toDateTimeWithDayFormat();

  const { data: reservationDetail } = useQuery(reservationQueries.detail(reservationId));

  const { reservationCompletion } = useReservationCompletionMutation();

  const handleClickChangeStatus = (status: Extract<PtStatus, "NO_SHOW" | "COMPLETED">) => () => {
    if (!reservationDetail) return;

    reservationCompletion({
      reservationId,
      memberId: memberId as number,
      isJoin: status === "COMPLETED",
    });
  };

  return (
    <Sheet open={open} onOpenChange={onChangeOpen}>
      <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
        <SheetHeader className="items-center">
          <SheetTitle className="flex justify-center">{selectedFormatDate}</SheetTitle>
          {reservationStatus !== "예약 확정" && (
            <Badge className="h-8 w-20">{reservationStatus}</Badge>
          )}
        </SheetHeader>
        <ProfileCard
          imgUrl={""}
          userBirth={new Date()}
          userName={name as string}
          phoneNumber={""}
          className="bg-background-sub1 w-full hover:bg-none"
        />
        <SheetFooter>
          {reservationStatus === "예약 확정" ? (
            <div className="flex w-full justify-center gap-[0.625rem]">
              <Button
                className="h-[3.375rem] w-full"
                variant={"secondary"}
                onClick={handleClickChangeStatus("NO_SHOW")}
              >
                불참석
              </Button>
              <Button
                className="h-[3.375rem] w-full"
                variant={"negative"}
                onClick={handleClickChangeStatus("COMPLETED")}
              >
                PT 완료
              </Button>
            </div>
          ) : (
            <SheetClose asChild>
              <Button variant={"secondary"} className="h-[3.375rem] w-full">
                확인
              </Button>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ReservationOutcomeSheet;
