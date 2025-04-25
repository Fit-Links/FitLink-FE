/* eslint-disable no-magic-numbers */

type Range = [start: number, end: number];

export const formatContinuousTimes = (times: string[]): string => {
  const toMinutes = (t: string): number => {
    const [h, m] = t.split(":").map(Number);

    return h * 60 + m;
  };

  const toTimeString = (mins: number): string => {
    const hh = String(Math.floor(mins / 60)).padStart(2, "0");
    const mm = String(mins % 60).padStart(2, "0");

    return `${hh}:${mm}`;
  };

  if (times.length === 0) return "";

  const sorted = times.map(toMinutes).sort((a, b) => a - b);

  const ranges = sorted.reduce<Range[]>((acc, curr) => {
    if (acc.length === 0) {
      return [[curr, curr]];
    }

    const lastRange = acc[acc.length - 1];
    const [start, end] = lastRange;

    if (curr - end === 60) {
      return [...acc.slice(0, -1), [start, curr]];
    } else {
      return [...acc, [curr, curr]];
    }
  }, []);

  return ranges
    .map(([start, end]) =>
      start === end ? toTimeString(start) : `${toTimeString(start)} ~ ${toTimeString(end)}`,
    )
    .join("\n");
};
