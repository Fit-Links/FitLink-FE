import TimePicker from "@ui/components/TimePicker";
import React, { useRef } from "react";

import { useOutsideClick } from "@trainer/hooks/useOutsideClick";

type MerdiemTimePickerProps = {
  time: string;
  type: "startTime" | "endTime";
  onChangeTime: (key: "startTime" | "endTime", time: string) => void;
};

const PERIOD_MAP = {
  0: "오전",
  1: "오후",
} as const;

const NUMBER_PADDING = 2;
const AM_PERIOD = 0;
const PM_PERIOD = 1;
const PERIOD_SPLIT_NUMBER = 12;

const setHalfHours = (relative: number) => {
  return relative ? "30" : "00";
};

const setTimePeriods = (relative: number) => {
  return PERIOD_MAP[relative as keyof typeof PERIOD_MAP];
};

type PeriodType = (typeof PERIOD_MAP)[keyof typeof PERIOD_MAP];

const isPM = (timePeriod: PeriodType) => {
  return timePeriod === PERIOD_MAP[PM_PERIOD];
};

const generateTrainerScheduleTime = (
  timePeriod: PeriodType,
  hours: string | null,
  minutes: string | null,
) => {
  const adjustedHours = isPM(timePeriod) ? Number(hours) + PERIOD_SPLIT_NUMBER : Number(hours);

  return `${adjustedHours.toString().padStart(NUMBER_PADDING, "0")}:${minutes}`;
};

function MerdiemTimePicker({ time, type, onChangeTime }: MerdiemTimePickerProps) {
  const timePickerRef = useRef<HTMLDivElement | null>(null);

  const timePeriodRef = useRef<PeriodType>(
    Number(time.split(":")[0]) < PERIOD_SPLIT_NUMBER
      ? PERIOD_MAP[AM_PERIOD]
      : PERIOD_MAP[PM_PERIOD],
  );

  const hour = Number(time.split(":")[0]);
  const hourRef = useRef(hour > PERIOD_SPLIT_NUMBER ? hour - PERIOD_SPLIT_NUMBER : hour);
  const minuteRef = useRef(time.split(":")[1]);

  const handleClickClosePicker = () => {
    onChangeTime(
      type,
      generateTrainerScheduleTime(
        timePeriodRef.current,
        hourRef.current.toString(),
        minuteRef.current,
      ),
    );
  };

  useOutsideClick({ ref: timePickerRef, callback: handleClickClosePicker });

  return (
    <div
      ref={timePickerRef}
      className="absolute right-0 top-[2.5rem] z-10 flex rounded-lg bg-black p-2"
    >
      <div className="h-[180px] w-[70px]">
        <TimePicker
          initIdx={Number(
            Object.keys(PERIOD_MAP).find(
              (key) => PERIOD_MAP[Number(key) as keyof typeof PERIOD_MAP] === timePeriodRef.current,
            ),
          )}
          length={2}
          width={40}
          loop={false}
          viewPerspective="right"
          setValue={setTimePeriods}
          ref={timePeriodRef}
        />
      </div>
      <div className="h-[180px] w-[70px]">
        <TimePicker
          startNumber={0}
          initIdx={Number(hourRef.current)}
          length={12}
          width={23}
          loop={false}
          ref={hourRef}
        />
      </div>
      <div className="h-[180px] w-[70px]">
        <TimePicker
          startNumber={0}
          initIdx={Number(minuteRef.current)}
          length={2}
          width={23}
          loop={false}
          viewPerspective="left"
          setValue={setHalfHours}
          ref={minuteRef}
        />
      </div>
    </div>
  );
}

export default MerdiemTimePicker;
