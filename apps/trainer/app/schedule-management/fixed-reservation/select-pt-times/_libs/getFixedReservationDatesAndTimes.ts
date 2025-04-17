import { addDays, format, setHours, setMinutes, startOfWeek } from "date-fns";

export const getFixedReservationDatesAndTimes = (
  schedule: Record<string, string[]>,
  today: Date = new Date(),
): string[] => {
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const result: string[] = [];

  Object.entries(schedule).forEach(([dayIndex, times]) => {
    const dayDate = addDays(weekStart, parseInt(dayIndex, 10));

    times.forEach((timeStr) => {
      const [hourStr, minuteStr] = timeStr.split(":");
      const dateWithTime = setMinutes(
        setHours(dayDate, parseInt(hourStr, 10)),
        parseInt(minuteStr, 10),
      );

      result.push(format(dateWithTime, "yyyy-MM-dd'T'HH:mm"));
    });
  });

  return result;
};
