/* eslint-disable no-magic-numbers */
"use client";

import { BaseReservationListItem } from "@5unwan/core/api/types/common";
import { Badge } from "@ui/components/Badge";

type WeekCellProps = {
  date: Date;
  ptReservation?: BaseReservationListItem;
};
function WeekCell({ ptReservation }: WeekCellProps) {
  if (!ptReservation) return;

  const { status, reservationDate } = ptReservation;

  const parsedTime = (reservationDate: string) => {
    const time = new Date(reservationDate).getHours();

    return `${time < 12 ? "오전" : "오후"} ${time % 12 === 0 ? 12 : time % 12}시`;
  };

  return (
    <div className="flex flex-col items-center gap-[0.625rem]">
      {reservationDate.map((date) => (
        <Badge
          key={date}
          variant={status === "예약 대기" ? "secondary" : "brand"}
          className="text-body-5 flex h-[1.063rem] min-w-[2.813rem] items-center justify-center rounded-[0.313rem] px-[0.063rem] py-[0.313rem]"
        >
          {parsedTime(date)}
        </Badge>
      ))}
      <div className="text-body-6">{status}</div>
    </div>
  );
}

export default WeekCell;
