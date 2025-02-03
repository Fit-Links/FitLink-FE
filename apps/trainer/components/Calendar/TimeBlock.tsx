"use client";

import { cn } from "@ui/lib/utils";
import { ComponentProps } from "react";

import { isToday } from "@trainer/utils/CalendarUtils";

type ResercationStateType = "예약 대기" | "예약 확정";

type TimeBlockProps = ComponentProps<"div"> & {
  date: Date;
  userName?: string;
  PTstatus?: string;
  isNotificationRead?: boolean;
  reservationStatus?: ResercationStateType;
};

export default function TimeBlock({
  date,
  userName,
  PTstatus,
  isNotificationRead,
  reservationStatus,
  ...props
}: TimeBlockProps) {
  return (
    <div
      className={cn(
        "bg-background-sub1 hover:bg-background-sub2 text-text-primary relative flex h-[3.9375rem] w-[2.625rem] cursor-pointer flex-col items-center justify-center gap-1 rounded-[0.125rem] p-1",
        isToday(date) && "bg-background-sub3 hover:bg-background-sub4",
        reservationStatus !== undefined &&
          reservationStatus === "예약 대기" &&
          "bg-brand-secondary-500 hover:bg-brand-secondary-600",
        reservationStatus !== undefined &&
          reservationStatus === "예약 확정" &&
          "bg-brand-primary-500 hover:bg-brand-primary-600",
      )}
      {...props}
    >
      <span className="text-body-2">{userName}</span>
      <span className="text-[0.625rem]">{PTstatus}</span>
      {isNotificationRead && (
        <span className="bg-notification absolute right-1 top-1 h-[4px] w-[4px] rounded-full" />
      )}
    </div>
  );
}
