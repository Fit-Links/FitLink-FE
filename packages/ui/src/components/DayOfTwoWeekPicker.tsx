/* eslint-disable no-magic-numbers */
"use client";
import { format, isSameDay, isToday } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { DayPicker as Calendar, RowProps, useDayPicker, useSelectSingle } from "react-day-picker";

import DateController from "@ui/lib/DateController";
import { cn } from "@ui/lib/utils";

export type DayofTwoWeekPickerProps = {
  className?: string;
  onChangeSelectedDate?: (date: Date | undefined) => void;
  selectedDate?: Date | undefined;
};

type CustomRowComponentProps = RowProps & {
  fromDate: Date;
  toDate: Date;
  onChangeSelectedDate: (date: Date | undefined) => void;
};

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

function CalendarHead() {
  const { classNames } = useDayPicker();

  return (
    <thead>
      <tr className={cn(classNames.head_row)}>
        {WEEK_DAYS.map((day, index) => (
          <th key={`${day}-${index}`} className={cn("flex justify-center", classNames.head_cell)}>
            {day}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function CalendarRow({
  fromDate,
  toDate,
  onChangeSelectedDate,
  ...props
}: CustomRowComponentProps) {
  const { dates } = props;
  const { classNames } = useDayPicker();
  const { selected } = useSelectSingle();

  const validatedDates = dates.map((date) => ({
    date,
    isInRange: DateController(date).validate()?.isDateInRange(fromDate, toDate) ?? false,
  }));

  if (!validatedDates.some((item) => item.isInRange)) return null;

  return (
    <tr className={cn(classNames.row)}>
      {validatedDates.map(({ date, isInRange }) => (
        <td key={`${date}`} className={cn(classNames.cell, !isInRange && "invisible")}>
          <button
            className={cn(
              "hover:bg-brand-primary-500",
              classNames.day,
              isToday(date) && classNames.day_today,
              isSameDay(selected as Date, date) && classNames.day_selected,
            )}
            onClick={() => onChangeSelectedDate(date)}
          >
            {date.getDate()}
          </button>
        </td>
      ))}
    </tr>
  );
}

export default function DayOfTwoWeekPicker({
  className,
  selectedDate,
  onChangeSelectedDate,
}: DayofTwoWeekPickerProps) {
  const [localSelectedDate, setLocalSelectedDate] = useState<Date | undefined>(undefined);
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 1);
  const toDate = new Date(fromDate);
  toDate.setDate(toDate.getDate() + 14);

  const handleChangeSelectedDate = (date: Date | undefined) => {
    setLocalSelectedDate(date);
  };

  return (
    <Calendar
      className={cn(className)}
      mode={"single"}
      locale={ko}
      fixedWeeks
      selected={selectedDate || localSelectedDate}
      onSelect={onChangeSelectedDate || handleChangeSelectedDate}
      fromDate={fromDate}
      toDate={toDate}
      showOutsideDays
      classNames={{
        months: "flex flex-col h-full space-y-4 text-title-2 text-text-primary",
        month: "flex flex-col h-full",
        caption: "flex justify-center relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "hidden",
        table: "w-full h-full flex flex-col border-collapse",
        tbody: "flex flex-col justify-between flex-1",
        head_row: "flex mt-5",
        head_cell:
          "rounded-md text-sm w-full font-normal [&:first-child]:text-brand-secondary-500 [&:last-child]:text-brand-secondary-500",
        row: "flex w-full h-full mt-3",
        cell: "w-full h-[2.5rem] relative text-center [&:first-child]:text-brand-secondary-500 [&:last-child]:text-brand-secondary-500",
        day: "h-8 w-8 rounded-full text-sm font-normal",
        day_selected: "bg-brand-primary-500 hover:bg-brand-primary-500",
        day_today: "bg-white text-text-sub5",
        day_outside: "text-text-sub4",
      }}
      formatters={{
        formatCaption: (date) => <div className="text-title-2">{format(date, "yyyy.MM")}</div>,
      }}
      components={{
        Head: () => <CalendarHead />,
        Row: (props) => (
          <CalendarRow
            toDate={toDate}
            fromDate={fromDate}
            onChangeSelectedDate={onChangeSelectedDate || handleChangeSelectedDate}
            {...props}
          />
        ),
      }}
    />
  );
}
