/* eslint-disable no-magic-numbers */
"use client";

import { cn } from "@ui/lib/utils";
import { ComponentProps, useState } from "react";

import ScheduleBottomSheet from "@trainer/app/schedule-management/_components/ScheduleBottomSheet";

import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

import { isToday } from "@trainer/utils/CalendarUtils";

import { RESERVATION_CONFIG } from "../../_constants/reservationConfig";

type TimeBlockProps = ComponentProps<"div"> & {
  date: Date;
  PTstatus?: string;
  isNotificationRead?: boolean;
  reservationContent: ModifiedReservationListItem[];
};

export default function TimeBlock({
  date,
  isNotificationRead,
  reservationContent,
  ...props
}: TimeBlockProps) {
  const reservationBlockConfig =
    reservationContent.length > 0 && reservationContent[0].status !== "휴무일"
      ? RESERVATION_CONFIG[reservationContent[0].status]
      : null;
  const reservationBlockStyle = reservationBlockConfig?.style;
  const reservationBlockContent = reservationBlockConfig?.content(reservationContent[0]);
  const reservationBlockPtStatus = reservationBlockConfig?.ptStatus({
    reservationContents: reservationContent,
  });

  const [isScheduleBottomSheetOpen, setIsScheduleBottomSheetOpen] = useState(false);

  const handleClickBlock = () => {
    if (!reservationContent.length) {
      setIsScheduleBottomSheetOpen(true);
    }
  };

  return (
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
        <span className="text-body-2">{reservationBlockPtStatus}</span>
        {isNotificationRead && (
          <span className="bg-notification absolute right-1 top-1 h-[4px] w-[4px] rounded-full" />
        )}
      </div>

      <ScheduleBottomSheet
        open={isScheduleBottomSheetOpen}
        onChangeOpen={setIsScheduleBottomSheetOpen}
        selectedDate={date}
      />
    </>
  );
}
