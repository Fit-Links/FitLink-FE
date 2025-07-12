import { DayOfWeek } from "@5unwan/core/api/types/common";

const MIDNIGHT = 0;
const NOON = 12;

export const DAYS_OF_WEEK_MAP = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] satisfies DayOfWeek[];

export type TimeCell = {
  dayOfWeek: DayOfWeek;
  time: string;
  disabled: boolean;
};

export const splitTimeCellByAMPM = (
  timeCellInfo: TimeCell[],
): { am: TimeCell[]; pm: TimeCell[] } => {
  const am: TimeCell[] = [];
  const pm: TimeCell[] = [];
  timeCellInfo.forEach((timeCell) => {
    const { time } = timeCell;
    const [hourStr] = time.split(":");
    const hour = parseInt(hourStr, 10);

    if (hour >= MIDNIGHT && hour < NOON) {
      am.push(timeCell);
    } else {
      pm.push(timeCell);
    }
  });

  return { am, pm };
};
