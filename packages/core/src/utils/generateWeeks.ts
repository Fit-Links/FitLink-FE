import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

const WEEK_LENGTH = 7;

export const generateWeeks = (fromDate: Date, toDate: Date) => {
  const calendarStart = startOfWeek(fromDate, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(toDate, { weekStartsOn: 0 });

  const dates = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weeks: Date[][] = [];

  for (let i = 0; i < dates.length; i += WEEK_LENGTH) {
    weeks.push(dates.slice(i, i + WEEK_LENGTH));
  }

  return weeks;
};
