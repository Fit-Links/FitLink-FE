import { cn } from "@ui/lib/utils";
import { isSameDay, isToday } from "date-fns";
import React from "react";
import { RowProps, useDayPicker } from "react-day-picker";

type WeekRowProps = RowProps & {
  selectedDate?: Date;
  onChangeSelectedDate?: (date: Date | undefined) => void;
};

export default function WeekRow({
  dates,
  displayMonth,
  selectedDate,
  onChangeSelectedDate,
}: WeekRowProps) {
  const { classNames } = useDayPicker();
  console.log("선택한 날", selectedDate);

  return (
    <tr className={cn(classNames.row, "flex h-[7.25rem]")}>
      {dates.map((date) => {
        const isOutsideMonth = displayMonth.getMonth() !== date.getMonth();
        const isCurrentDay = isToday(date);

        return (
          <td
            key={`${date}`}
            className={cn(
              classNames.cell,
              "first:text-brand-secondary-500 last:text-brand-secondary-500 flex h-full flex-col items-center",
            )}
          >
            <button
              className={cn(
                classNames.day,
                isOutsideMonth && classNames.day_outside,
                isCurrentDay && classNames.day_today,
                isSameDay(selectedDate as Date, date) && classNames.day_selected,
                "h-[1.875rem] w-[1.875rem]",
              )}
              onClick={() => onChangeSelectedDate && onChangeSelectedDate(date)}
            >
              {date.getDate()}
            </button>
            <div className="flex w-full flex-1 items-center">
              {/** TODO: DTO 타입 정의 이후 해당 DTO 타입에 맞는 인터페이스 props 설정 후 작업 예정 */}
            </div>
          </td>
        );
      })}
    </tr>
  );
}
