/* eslint-disable no-magic-numbers */
"use client";

import { generateWeeks } from "@5unwan/core/utils/generateWeeks";
import { addDays, format, isSameDay, isToday, isWithinInterval, subDays } from "date-fns";

import { cn } from "@ui/lib/utils";

import useControllableState from "@ui/hooks/useControllableState";

type DayOfTwoWeekPickerProps = {
  selectDate?: Date;
  onSelectDate?: (date: Date) => void;
  defaultDate?: Date;
};

type CaptionProps = {
  currentYear: number;
  currentMonth: number;
};

type WeeksProps = {
  currentDate: Date;
  selectedDate?: Date;
  onSelectedDate: (date: Date) => void;
};

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

export default function DayOfTwoWeekPicker({
  selectDate,
  defaultDate,
  onSelectDate,
}: DayOfTwoWeekPickerProps) {
  const [selectedDate, setSelectedDate] = useControllableState({
    prop: selectDate,
    onChange: onSelectDate,
    defaultProp: defaultDate,
  });
  const currentDate = new Date();

  return (
    <section className="w-[22.375rem] border">
      <Caption currentYear={currentDate.getFullYear()} currentMonth={currentDate.getMonth() + 1} />
      <WeekHeader />
      <Weeks
        currentDate={currentDate}
        selectedDate={selectedDate}
        onSelectedDate={setSelectedDate}
      />
    </section>
  );
}

function Caption({ currentYear, currentMonth }: CaptionProps) {
  return (
    <div className="text-title-2 text-text-primary mb-2.5 flex h-[2.188rem] w-[22.375rem] items-center justify-center">
      {`${currentYear}.${String(currentMonth).padStart(2, "0")}`}
    </div>
  );
}

function WeekHeader() {
  return (
    <div className="text-body-1 text-text-primary mb-[1.438rem] flex h-[1.875rem] w-full items-center justify-between">
      {WEEK_DAYS.map((day) => (
        <div
          className="first:text-brand-secondary-500 last:text-brand-secondary-500 flex h-[1.875rem] w-[1.875rem] items-center justify-center"
          key={day}
        >
          {day}
        </div>
      ))}
    </div>
  );
}

function Weeks({ currentDate, selectedDate, onSelectedDate }: WeeksProps) {
  const fromDate = subDays(currentDate, 1);
  const toDate = addDays(fromDate, 14);

  const weeks = generateWeeks(fromDate, toDate);

  const handleSelectDate = (date: Date) => () => {
    onSelectedDate(date);
  };

  return (
    <div className="text-text-primary text-body-1 w-full space-y-[1.438rem]">
      {weeks.map((week) => (
        <div key={`${week}`} className="flex w-full justify-between ">
          {week.map((day) => {
            const isVisible = isWithinInterval(day, { start: fromDate, end: toDate });

            return (
              <button
                key={day.toISOString()}
                data-testid={isVisible && format(day, "yyyy-MM-dd")}
                onClick={handleSelectDate(day)}
                className={cn(
                  "first:text-brand-secondary-500 last:text-brand-secondary-500 hover:bg-brand-primary-500 flex h-[1.875rem] w-[1.875rem] items-center justify-center rounded-full",
                  !isVisible && "invisible",
                  isToday(day) && "text-text-sub5 bg-white",
                  selectedDate && isSameDay(selectedDate, day) && "bg-brand-primary-500",
                )}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
