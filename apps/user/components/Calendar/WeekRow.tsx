import { cn } from "@ui/lib/utils";
import { isToday } from "date-fns";
import React from "react";
import { RowProps, useDayPicker } from "react-day-picker";

type WeekRowProps = RowProps;

export default function WeekRow({ dates, displayMonth }: WeekRowProps) {
  const { classNames } = useDayPicker();

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
                "h-[1.875rem] w-[1.875rem]",
              )}
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
