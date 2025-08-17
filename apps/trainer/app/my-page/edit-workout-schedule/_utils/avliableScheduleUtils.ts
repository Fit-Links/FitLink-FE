import { PeriodType } from "../_types/schedule";

export const setHalfHours = (relative: number) => {
  return relative ? "30" : "00";
};

export const setTimePeriods = (relative: number) => {
  return relative ? "오후" : "오전";
};

export const isPM = (timePeriod: PeriodType) => {
  return timePeriod === "오후";
};
