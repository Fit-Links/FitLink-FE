"use client";

import { ko } from "date-fns/locale";
import { ComponentProps, useState } from "react";
import { DayPicker as Calendar } from "react-day-picker";

import { cn } from "@ui/lib/utils";

import { isWeekend } from "@ui/utils/DayPickerUtils";

import { Caption } from "./Caption";

export type DayPickerProps = ComponentProps<typeof Calendar> & {
  mode: "single";
  currentMonth?: Date;
  onChangeMonth?: (month: Date) => void;
  selectedDate?: Date;
  onChangeSelectedDate?: (date: Date | undefined) => void;
};

function DayPicker({
  className,
  classNames,
  showOutsideDays = true,
  components,
  selectedDate,
  currentMonth,
  onChangeMonth,
  onChangeSelectedDate,
  ...props
}: DayPickerProps) {
  const [month, setMonth] = useState(new Date());
  const [date, setDate] = useState(new Date());

  const handleChangeMonth = (date: Date | undefined) => {
    if (date) {
      setDate(date);
    }
  };

  return (
    <Calendar
      month={currentMonth || month}
      fixedWeeks
      onMonthChange={setMonth}
      selected={selectedDate || date}
      onSelect={onChangeSelectedDate || handleChangeMonth}
      locale={ko}
      showOutsideDays={showOutsideDays}
      modifiers={{ weekend: isWeekend }}
      modifiersClassNames={{
        weekend: "text-brand-secondary-500",
      }}
      className={cn("w-full p-1", className)}
      classNames={{
        months: "flex flex-col h-full space-y-4 text-title-2 text-text-primary",
        month: "flex flex-col space-y-5 h-full",
        caption: "flex justify-center relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 text-white bg-transparent p-0 opacity-50 md:hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full h-full flex flex-col border-collapse",
        tbody: "flex flex-col justify-between flex-1 pt-1",
        head_row: "flex",
        head_cell:
          "rounded-md text-sm w-full font-normal [&:first-child]:text-brand-secondary-500 [&:last-child]:text-brand-secondary-500",
        row: "flex w-full h-full mt-2",
        cell: "w-full h-[40px] relative text-center",
        day: "h-8 w-8 rounded-full md:hover:bg-brand-primary-500 text-sm font-normal",
        day_selected: "bg-brand-primary-500 md:hover:bg-brand-primary-500",
        day_today: "bg-white text-text-sub5",
        day_outside: "text-text-sub4",
        ...classNames,
      }}
      components={{
        Caption: () => (
          <Caption month={currentMonth || month} onChangeMonth={onChangeMonth || setMonth} />
        ),
        ...components,
      }}
      {...props}
    />
  );
}
DayPicker.displayName = "DayPicker";

export { DayPicker };
