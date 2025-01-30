import { format } from "date-fns";

const ZERO_TIME = 0;

export default function TimeColumn() {
  const TimeCoulmns = Array.from({ length: 24 }, (_, idx) => {
    const time = new Date();

    time.setHours(idx, ZERO_TIME, ZERO_TIME, ZERO_TIME);

    return format(time, "HH:mm");
  });

  return (
    <div className="text-body-4 bg-background-primary text-text-primary sticky left-0 z-10 flex h-max flex-col gap-[0.0625rem]">
      {TimeCoulmns.map((time) => (
        <div className="mr-2 flex h-[3.9375rem] w-[2.625rem] justify-end font-mono" key={time}>
          {time}
        </div>
      ))}
    </div>
  );
}
