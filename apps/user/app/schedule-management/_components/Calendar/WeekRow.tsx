import { BaseReservationListItem } from "@5unwan/core/api/types/common";
import { cn } from "@ui/lib/utils";
import { isSameDay, isToday } from "date-fns";
import { RowProps } from "react-day-picker";

import WeekCell from "./WeekCell";

type WeekRowProps = RowProps & {
  selectedDate: Date | undefined;
  onChangeSelectedDate: (date: Date | undefined) => void;
  reservationContent: BaseReservationListItem[];
  onSelectedReservationContent: (reservationContent?: BaseReservationListItem) => void;
  onChangeOpen: (isOpen: boolean) => void;
};

export default function WeekRow({
  dates,
  displayMonth,
  selectedDate,
  onChangeSelectedDate,
  reservationContent,
  onSelectedReservationContent,
  onChangeOpen,
}: WeekRowProps) {
  const findReservationByDate = (date: Date) => {
    return reservationContent.find((status) => isSameDay(status.reservationDates[0], date));
  };

  const handleClickDate = (date: Date) => {
    const reservationContent = findReservationByDate(date);

    onChangeSelectedDate(date);
    onSelectedReservationContent(
      reservationContent?.status === "예약 취소 요청" || reservationContent?.status === "예약 취소"
        ? undefined
        : reservationContent,
    );
    onChangeOpen(true);
  };

  return (
    <tr className="mt-2 flex h-full w-full cursor-pointer">
      {dates.map((date) => {
        const isOutsideMonth = displayMonth.getMonth() !== date.getMonth();
        const isCurrentDay = isToday(date);

        return (
          <td
            key={`${date}`}
            onClick={() => handleClickDate(date)}
            className="first:text-brand-secondary-500 last:text-brand-secondary-500 relative flex h-full w-full flex-col items-center text-center"
          >
            <button
              className={cn(
                "md:hover:bg-brand-primary-500 h-8 w-8 rounded-full text-sm font-normal",
                isOutsideMonth && "text-text-sub4",
                isCurrentDay && "text-text-sub5 bg-white",
                isSameDay(selectedDate as Date, date) &&
                  "bg-brand-primary-500 md:hover:bg-brand-primary-500",
                "mb-1 h-[1.875rem] w-[1.875rem]",
              )}
            >
              {date.getDate()}
            </button>
            <WeekCell date={date} ptReservation={findReservationByDate(date)} />
          </td>
        );
      })}
    </tr>
  );
}
