import { cn } from "@ui/lib/utils";

import { isToday } from "@trainer/utils/CalendarUtils";

import { Days } from "@trainer/types/Day";

type DayOfWeekProps = {
  currentWeek: Date[];
  currentMonth: number;
};

const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"] as const;

export default function DayOfWeek({ currentWeek, currentMonth }: DayOfWeekProps) {
  return (
    <div className="md:max-w-mobile bg-background-primary z-10 h-[4.4375rem] w-full pb-1">
      <div className="text-text-primary flex h-full w-full items-center justify-center">
        <div className="text-subhead-2 mr-2 flex h-full w-[2.625rem] items-center justify-center">
          {currentMonth}월
        </div>
        <div className="flex h-full w-full flex-1 flex-col justify-around">
          <div className="text-text-primary text-body-3 flex gap-[0.125rem]">
            {DAY_LIST.map((day, index) => (
              <span
                className={cn(
                  "flex w-full items-center justify-center",
                  (index === Days.Sunday || index === Days.Saturday) && "text-brand-secondary-500",
                )}
                key={day}
              >
                {day}
              </span>
            ))}
          </div>
          <div className="flex gap-[0.125rem]">
            {currentWeek.map((day, index) => (
              <span
                key={`${day}`}
                className={cn(
                  "text-text-primary flex w-full items-center justify-center",
                  (index === Days.Sunday || index === Days.Saturday) && "text-brand-secondary-500",
                )}
              >
                <span
                  className={cn(
                    "flex h-[1.875rem] w-[1.875rem] items-center justify-center",
                    isToday(day) && "bg-background-sub5 text-text-sub5 rounded-full",
                  )}
                >
                  {day.getDate()}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
