import { toZonedTime } from "date-fns-tz";

const HOUR_OFFSET = 9;
const MINUTE_OFFSET = 60;
const SECOND_OFFSET = 60;
const MILLISECOND_OFFSET = 1000;

const KST_OFFSET = HOUR_OFFSET * MINUTE_OFFSET * SECOND_OFFSET * MILLISECOND_OFFSET;

export function getKoreanDate(): Date;
export function getKoreanDate(date: string): Date;
export function getKoreanDate(date?: string): Date {
  try {
    if (date) {
      let dateString = date;

      if (!date.includes("T") && !date.includes(" ")) {
        dateString = `${date}T00:00:00`;
      }

      const parsedDate = new Date(dateString);
      if (isNaN(parsedDate.getTime())) {
        throw new Error(`Invalid date string: ${date}`);
      }

      const utcTime = new Date(parsedDate.getTime() - KST_OFFSET);

      return toZonedTime(utcTime, "Asia/Seoul");
    } else {
      return toZonedTime(new Date(), "Asia/Seoul");
    }
  } catch (error) {
    console.error("getKoreanDate error:", error);

    return toZonedTime(new Date(), "Asia/Seoul");
  }
}
