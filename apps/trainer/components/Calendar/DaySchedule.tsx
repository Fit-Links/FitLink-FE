import { addHours, startOfDay } from "date-fns"; // date-fns 활용

import TimeBlock from "./TimeBlock";

type DayScheduleProps = {
  date: Date;
};

export default function DaySchedule({ date }: DayScheduleProps) {
  const todayHours = Array.from({ length: 24 }, (_, index) => addHours(startOfDay(date), index));

  return (
    <div className="flex h-max snap-start flex-col gap-[0.0625rem]">
      {todayHours.map((time, index) => (
        <TimeBlock key={`${time}-${index}`} date={date} />
      ))}
    </div>
  );
}
