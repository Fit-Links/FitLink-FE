/* eslint-disable no-magic-numbers */

import { ReservationStatus } from "@5unwan/core/api/types/common";
import { cn } from "@ui/lib/utils";
import { format } from "date-fns";
import { ComponentProps, useState } from "react";

import ScheduleBottomSheet from "@trainer/app/schedule-management/_components/ScheduleBottomSheet";

import { AvailablePtTimeApiResponse } from "@trainer/services/types/myInformation.dto";
import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

import { isToday } from "@trainer/utils/CalendarUtils";

import { RESERVATION_CONFIG } from "../../_constants/reservationConfig";
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
    "휴무일" | "예약 취소 요청" | "예약 변경 요청" | "예약 취소"
  > | null =
    reservationContent.length > 0 &&
    reservationContent[0].status !== "휴무일" &&
    reservationContent[0].status !== "예약 취소 요청" &&
    reservationContent[0].status !== "예약 변경 요청" &&
    reservationContent[0].status !== "예약 취소"
      ? reservationContent[0].status
      : null;

  const [isScheduleBottomSheetOpen, setIsScheduleBottomSheetOpen] = useState(false);
  const [isReservationManagementSheetOpen, setIsReservationManagementSheetOpen] = useState(false);

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
    if (!reservationContent.length) {
      setIsScheduleBottomSheetOpen(true);
    }

    setIsReservationManagementSheetOpen(true);
  };

  return (
    <>
      {isAvailableTime ? (
        <>
          <div
            onClick={handleClickBlock}
            className={cn(
              "bg-background-sub1 hover:bg-background-sub2 text-text-primary relative flex h-[3.9375rem] w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-[0.125rem] p-1",
              isToday(date) && "bg-background-sub3 hover:bg-background-sub4",
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

          <ScheduleBottomSheet
            open={isScheduleBottomSheetOpen}
            onChangeOpen={setIsScheduleBottomSheetOpen}
            selectedDate={date}
          />

          {RenderSheet}
        </>
      ) : (
        <div
          className={cn(
            "bg-background-sub2 hover:bg-background-sub2 text-text-primary relative flex h-[3.9375rem] w-full cursor-not-allowed flex-col items-center justify-center gap-1 rounded-[0.125rem] p-1",
            isToday(date) && "bg-background-sub3 hover:bg-background-sub4",
            reservationBlockStyle,
          )}
          {...props}
        >
          -
        </div>
      )}
    </>
  );
}
