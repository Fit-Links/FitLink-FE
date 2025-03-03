"use client";

import { ko } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ComponentProps, Dispatch, useState } from "react";
import { DayPicker as Calendar } from "react-day-picker";

import { cn } from "../lib/utils";
import { currentYearWithMonth, isWeekend } from "../utils/DayPickerUtils";

const MONTH_OFFSET = 1;

export type DayPickerProps = ComponentProps<typeof Calendar> & {
  mode: "single";
  selectedDate?: Date;
  onChangeSelectedDate?: (date: Date | undefined) => void;
};
type CaptionProps = {
  month: Date;
  setMonth: Dispatch<React.SetStateAction<Date>>;
};

function Caption({ month, setMonth }: CaptionProps) {
  const handlePrevMonth = () => {
    setMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - MONTH_OFFSET));
  };

  const handleNextMonth = () => {
    setMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + MONTH_OFFSET));
  };

  return (
    <div className="flex items-center justify-center gap-3 text-center">
      <button onClick={handlePrevMonth}>
        <ChevronLeft className={"cursor-pointer"} />
      </button>
      <span className="font-mono">{currentYearWithMonth(month)}</span>
      <button onClick={handleNextMonth}>
        <ChevronRight className={"cursor-pointer"} />
      </button>
    </div>
  );
}

function DayPicker({
  className,
  classNames,
  showOutsideDays = true,
  components,
  selectedDate,
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
      month={month}
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
        nav_button: "h-7 w-7 text-white bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full h-full flex flex-col border-collapse",
        tbody: "flex flex-col justify-between flex-1 pt-1",
        head_row: "flex",
        head_cell:
          "rounded-md text-sm w-full font-normal [&:first-child]:text-brand-secondary-500 [&:last-child]:text-brand-secondary-500",
        row: "flex w-full h-full mt-2",
        cell: "w-full h-[40px] relative text-center",
        day: "h-8 w-8 rounded-full hover:bg-brand-primary-500 text-sm font-normal",
        day_selected: "bg-brand-primary-500 hover:bg-brand-primary-500",
        day_today: "bg-white text-text-sub5",
        day_outside: "text-text-sub4",
        ...classNames,
      }}
      components={{
        ...components,
        Caption: () => <Caption month={month} setMonth={setMonth} />,
      }}
      {...props}
    />
  );
}
DayPicker.displayName = "DayPicker";

export { DayPicker };
