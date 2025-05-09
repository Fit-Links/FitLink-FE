/* eslint-disable no-magic-numbers */
export type DaysOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";
export type ObjectEntries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export const DAYS_OF_WEEK = {
  MONDAY: "월",
  TUESDAY: "화",
  WEDNESDAY: "수",
  THURSDAY: "목",
  FRIDAY: "금",
  SATURDAY: "토",
  SUNDAY: "일",
};

type TimeBlockSchedule = {
  type: "block";
  schedule: {
    dayOfWeek: DaysOfWeek;
    preferenceTimes: string[];
  }[];
};
type TimeSpanSchedule = {
  type: "span";
  schedule: {
    dayOfWeek: DaysOfWeek;
    isHoliday: boolean;
    startTime: string;
    endTime: string;
  }[];
};
export const makeWeekSchedule = (timeSchedule: TimeBlockSchedule | TimeSpanSchedule) => {
  const weekScheduleMap: Record<DaysOfWeek, string | null> = {
    MONDAY: null,
    TUESDAY: null,
    WEDNESDAY: null,
    THURSDAY: null,
    FRIDAY: null,
    SATURDAY: null,
    SUNDAY: null,
  };
  if (timeSchedule.type === "span") {
    timeSchedule.schedule.forEach(({ dayOfWeek, startTime, endTime, isHoliday }) => {
      console.log(dayOfWeek, startTime, endTime, isHoliday);
      if (!isHoliday || !startTime || !endTime) weekScheduleMap[dayOfWeek] = "-";
      else weekScheduleMap[dayOfWeek] = `${startTime} - ${endTime}`;
    });

    return weekScheduleMap;
  }

  timeSchedule.schedule.forEach(({ dayOfWeek, preferenceTimes }) => {
    weekScheduleMap[dayOfWeek] = groupContinuousTimes(preferenceTimes).join(", ");
  });

  return weekScheduleMap;
};

const groupContinuousTimes = (timeList: string[]): string[] => {
  if (timeList.length === 0) {
    return [];
  }

  const times = timeList
    .map((time) => new Date(`1970-01-01T${time}:00Z`))
    .sort((a, b) => a.getTime() - b.getTime());

  const result: string[] = [];
  let start = times[0];
  let prev = start;

  times.slice(1).forEach((time) => {
    const nextTime = new Date(prev.getTime() + 60 * 60 * 1000);
    if (time.getTime() !== nextTime.getTime()) {
      result.push(
        start.getTime() === prev.getTime()
          ? start.toISOString().substring(11, 16)
          : `${start.toISOString().substring(11, 16)} - ${prev.toISOString().substring(11, 16)}`,
      );
      start = time;
    }
    prev = time;
  });

  result.push(
    start.getTime() === prev.getTime()
      ? start.toISOString().substring(11, 16)
      : `${start.toISOString().substring(11, 16)} - ${prev.toISOString().substring(11, 16)}`,
  );

  return result;
};
