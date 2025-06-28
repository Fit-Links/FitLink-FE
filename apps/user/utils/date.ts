import { toZonedTime } from "date-fns-tz";

export function getKoreanDate(): Date;
export function getKoreanDate(date: string): Date;
export function getKoreanDate(date?: string): Date {
  try {
    if (date) {
      let dateString = date;

      if (!date.includes("T") && !date.includes(" ")) {
        dateString = `${date}T00:00:00+09:00`;
      } else if (date.includes("T") && !date.includes("+") && !date.includes("Z")) {
        dateString = `${date}+09:00`;
      }

      const parsedDate = new Date(dateString);
      if (isNaN(parsedDate.getTime())) {
        throw new Error(`Invalid date string: ${date}`);
      }

      return parsedDate;
    } else {
      return toZonedTime(new Date(), "Asia/Seoul");
    }
  } catch (error) {
    console.error("getKoreanDate error:", error);

    return toZonedTime(new Date(), "Asia/Seoul");
  }
}
