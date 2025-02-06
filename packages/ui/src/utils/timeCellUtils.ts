const MIDNIGHT = 0;
const NOON = 12;

type DaysOfWeek = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export type TimeCell = {
  dayOfWeek: DaysOfWeek;
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
