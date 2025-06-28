/* eslint-disable no-magic-numbers */
"use client";

import { BaseReservationListItem } from "@5unwan/core/api/types/common";
import { Badge } from "@ui/components/Badge";
import { cn } from "@ui/lib/utils";

import { getKoreanDate } from "@user/utils/date";

type WeekCellProps = {
  date: Date;
  ptReservation?: BaseReservationListItem;
};
function WeekCell({ ptReservation }: WeekCellProps) {
  if (!ptReservation) return;

  const { status, reservationDates } = ptReservation;

  const parsedTime = (reservationDate: string) => {
    const time = getKoreanDate(reservationDate).getHours();

    return `${time < 12 ? "오전" : "오후"} ${time % 12 === 0 ? 12 : time % 12}시`;
  };

  return (
    <div className="flex flex-col items-center gap-[0.625rem]">
      {status !== "예약 취소 요청" && status !== "예약 취소" && (
        <>
          {reservationDates.map((date) => (
            <Badge
              key={date}
              variant={status === "예약 대기" ? "secondary" : "brand"}
              className="text-body-5 flex h-[1.063rem] min-w-[2.813rem] items-center justify-center rounded-[0.313rem] px-[0.063rem] py-[0.313rem]"
            >
              {parsedTime(date)}
            </Badge>
          ))}
        </>
      )}
      <div
        className={cn("text-body-6 text-text-primary whitespace-pre-wrap", {
          "font-bold": status === "예약 취소 요청",
          "text-text-sub3": status === "예약 취소 요청",
        })}
      >
        {status === "예약 취소 요청" ? "예약 취소\n요청중" : status}
      </div>
    </div>
  );
}

export default WeekCell;
