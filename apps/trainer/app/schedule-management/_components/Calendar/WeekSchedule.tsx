"use client";

import DaySchedule from "./DaySchedule";

type DayScheduleProps = {
  dayOfWeek: Date[];
};

export default function WeekSchedule({ dayOfWeek }: DayScheduleProps) {
  return (
    <div className="flex gap-[0.125rem]">
      {dayOfWeek.map((day, index) => (
        <DaySchedule key={`${day}-${index}`} date={day} />
      ))}
    </div>
  );
}
