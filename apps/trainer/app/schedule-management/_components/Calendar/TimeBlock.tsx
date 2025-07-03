/* eslint-disable no-magic-numbers */

import { ReservationStatus } from "@5unwan/core/api/types/common";
import { Button } from "@ui/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ui/components/Dialog";
import Icon from "@ui/components/Icon";
import { cn } from "@ui/lib/utils";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { ComponentProps, useEffect, useState } from "react";

import ScheduleBottomSheet from "@trainer/app/schedule-management/_components/ScheduleBottomSheet";

import { AvailablePtTimeApiResponse } from "@trainer/services/types/myInformation.dto";
import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

import { isToday } from "@trainer/utils/CalendarUtils";

import { RESERVATION_CONFIG } from "../../_constants/reservationConfig";
import { useFixReservationChangeMutation } from "../../fixed-reservation/select-pt-times/_hooks/mutations/useFixReservationChangeMutation";
import { SheetAdapter } from "../ReservationManagementSheet";

type TimeBlockProps = ComponentProps<"div"> & {
  date: Date;
  PTstatus?: string;
  isNotificationRead?: boolean;
  reservationContent: ModifiedReservationListItem[];
  ptAvailableTime: AvailablePtTimeApiResponse;
};

export default function TimeBlock({
  date,
  isNotificationRead,
  reservationContent,
  ptAvailableTime,
  ...props
}: TimeBlockProps) {
  const searchParams = useSearchParams();

  const { fixReservationChange, isSuccess } = useFixReservationChangeMutation();

  const ptTimeInformation = (
    ptAvailableTime.data.currentSchedules || ptAvailableTime.data.scheduledChanges
  ).schedules?.find(({ dayOfWeek }) => dayOfWeek === format(date, "EEEE").toUpperCase());

  const isAvailableTime =
    Number(ptTimeInformation?.startTime.split(":")[0]) <= date.getHours() &&
    Number(ptTimeInformation?.endTime.split(":")[0]) >= date.getHours();

  const reservationBlockConfig =
    reservationContent.length > 0 &&
    reservationContent[0].status !== "휴무일" &&
    reservationContent[0].status !== "예약 취소 요청" &&
    reservationContent[0].status !== "예약 변경 요청" &&
    reservationContent[0].status !== "예약 취소"
      ? RESERVATION_CONFIG[reservationContent[0].status as keyof typeof RESERVATION_CONFIG]
      : null;
  const reservationBlockStyle = reservationBlockConfig?.style;
  const reservationBlockContent = reservationBlockConfig?.content(reservationContent[0]);
  const reservationBlockPtStatus = reservationBlockConfig?.ptStatus({
    reservationContents: reservationContent,
  });

  const currentStatus: Exclude<
    ReservationStatus,
    "휴무일" | "예약 취소 요청" | "예약 변경 요청" | "예약 취소" | "예약 거절"
  > | null =
    reservationContent.length > 0 &&
    reservationContent[0].status !== "휴무일" &&
    reservationContent[0].status !== "예약 취소 요청" &&
    reservationContent[0].status !== "예약 변경 요청" &&
    reservationContent[0].status !== "예약 취소" &&
    reservationContent[0].status !== "예약 거절"
      ? reservationContent[0].status
      : null;

  const [isScheduleBottomSheetOpen, setIsScheduleBottomSheetOpen] = useState(false);
  const [isReservationManagementSheetOpen, setIsReservationManagementSheetOpen] = useState(false);
  const [fixedReservationChangePopupOpen, setFixedReservationChangePopupOpen] = useState(false);

  const RenderSheet =
    currentStatus &&
    SheetAdapter[currentStatus](
      {
        open: isReservationManagementSheetOpen,
        onChangeOpen: setIsReservationManagementSheetOpen,
        selectedDate: date,
      },
      reservationContent,
    );

  const handleClickBlock = () => {
    if (searchParams.get("fixReservationChangeMode")) {
      const fixReservationChangeMode = JSON.parse(
        searchParams.get("fixReservationChangeMode") || "{}",
      );

      fixReservationChange({
        reservationId: fixReservationChangeMode.reservationId,
        reservationDate: fixReservationChangeMode.reservationDate,
        changeRequestDate: format(date, "yyyy-MM-dd'T'HH:mm"),
      });

      return;
    }

    if (!reservationContent.length || reservationContent[0].status === "예약 취소") {
      setIsScheduleBottomSheetOpen(true);
    }
    setIsReservationManagementSheetOpen(true);
  };

  useEffect(() => {
    if (!isScheduleBottomSheetOpen) {
      setIsReservationManagementSheetOpen(false);
    }
  }, [isScheduleBottomSheetOpen]);

  useEffect(() => {
    if (isSuccess) {
      setFixedReservationChangePopupOpen(true);

      const url = new URL(window.location.href);
      url.searchParams.delete("fixReservationChangeMode");
      window.history.pushState({}, "", url);
    }
  }, [isSuccess]);

  return (
    <>
      {isAvailableTime ? (
        <>
          <div
            onClick={handleClickBlock}
            className={cn(
              "bg-background-sub1 md:hover:bg-background-sub2 text-text-primary relative flex h-[3.9375rem] w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-[0.125rem] p-1",
              isToday(date) && "bg-background-sub3 md:hover:bg-background-sub4",
              reservationBlockStyle,
            )}
            {...props}
          >
            <span className="text-body-2 whitespace-pre-line">{reservationBlockContent}</span>
            <span className="text-body-5">{reservationBlockPtStatus}</span>
            {isNotificationRead && (
              <span className="bg-notification absolute right-1 top-1 h-[4px] w-[4px] rounded-full" />
            )}
          </div>

          {isScheduleBottomSheetOpen && (
            <ScheduleBottomSheet
              open={isScheduleBottomSheetOpen}
              onChangeOpen={setIsScheduleBottomSheetOpen}
              selectedDate={date}
            />
          )}

          {RenderSheet}
        </>
      ) : (
        <div
          className={cn(
            "bg-background-sub2 text-text-primary relative flex h-[3.9375rem] w-full cursor-not-allowed flex-col items-center justify-center gap-1 rounded-[0.125rem] p-1",
            isToday(date) && "bg-background-sub3 md:hover:bg-background-sub4",
            reservationBlockStyle,
          )}
          {...props}
        >
          <Icon name="CircleOff" size="sm" className="text-gray-400" />
        </div>
      )}
      <Dialog
        open={fixedReservationChangePopupOpen}
        onOpenChange={setFixedReservationChangePopupOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>고정 예약 변경이 완료되었습니다.</DialogTitle>
            <DialogDescription>
              {`변경 날짜 -> ${format(new Date(date), "yyyy년 MM월 dd일 HH시")}`}
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="w-full">확인</Button>
              </DialogClose>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
