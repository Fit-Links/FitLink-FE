"use client";

import DayOfTwoWeekPicker from "@ui/components/DayOfTwoWeekPicker";

type TwoWeekCalendarProps = {
  selectedDate: Date;
  onChangeSelectedDate: (date: Date) => void;
};

function TwoWeekCalendar({ selectedDate, onChangeSelectedDate }: TwoWeekCalendarProps) {
  return (
    <DayOfTwoWeekPicker
      selectDate={selectedDate}
      onSelectDate={onChangeSelectedDate}
      className="md:max-w-mobile mt-[0.625rem]"
    />
  );
}

export default TwoWeekCalendar;
