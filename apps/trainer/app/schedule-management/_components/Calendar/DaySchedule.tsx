import { addHours, startOfDay } from "date-fns"; // date-fns 활용

import TimeBlock from "./TimeBlock";

type DayScheduleProps = {
  date: Date;
};

export default function DaySchedule({ date }: DayScheduleProps) {
  const todayHours = Array.from({ length: 24 }, (_, index) => addHours(startOfDay(date), index));

  // TODO: 예약/일정 관련 API가 나오면 상위에서 reservationStatus 내려주는 로직 작성
  return (
    <div className="flex h-max w-full snap-start flex-col gap-[0.0625rem]">
      {todayHours.map((time, index) => (
        <TimeBlock key={`${time}-${index}`} date={date} />
      ))}
    </div>
  );
}
