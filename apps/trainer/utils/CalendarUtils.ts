import { getKoreanDate } from "./date";

const WEEK_LENGTH = 7;
const STEP = 1;
const INITIAL_OFFSET = 0;

export const isToday = (date: Date) => {
  const today = getKoreanDate();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

export const getWeekDates = (currentDate: Date) => {
  const dates: Date[] = [];

  const date = new Date(currentDate);

  const dayOfWeek = date.getDay();

  const lastSunday = new Date(date);
  lastSunday.setDate(date.getDate() - dayOfWeek);

  for (let i = 0; i < WEEK_LENGTH; i += STEP) {
    const newDate = new Date(lastSunday);
    newDate.setDate(lastSunday.getDate() + i);
    dates.push(newDate);
  }

  return dates;
};

export const getOffsetDate = (date: Date, offsetDays = INITIAL_OFFSET) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + offsetDays);

  return newDate;
};
