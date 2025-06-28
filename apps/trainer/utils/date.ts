import { toZonedTime } from "date-fns-tz";

const HOUR_OFFSET = 9;
const MINUTE_OFFSET = 60;
const SECOND_OFFSET = 60;
const MILLISECOND_OFFSET = 1000;

const KST_OFFSET = HOUR_OFFSET * MINUTE_OFFSET * SECOND_OFFSET * MILLISECOND_OFFSET; // 9시간을 밀리초로

export function getKoreanDate(): Date;
export function getKoreanDate(date: string): Date;
export function getKoreanDate(date: Date): Date;
export function getKoreanDate(date: number): Date;
export function getKoreanDate(date: string | number): Date;
export function getKoreanDate(date: string | Date): Date;
export function getKoreanDate(date?: string | Date | number): Date {
  try {
    if (date !== undefined) {
      let parsedDate: Date;

      if (typeof date === "number") {
        parsedDate = new Date(date);
      } else if (date instanceof Date) {
        parsedDate = new Date(date);
      } else {
        let dateString = date;
        if (!date.includes("T") && !date.includes(" ")) {
          dateString = `${date}T00:00:00`;
        }
        parsedDate = new Date(dateString);
      }

      if (isNaN(parsedDate.getTime())) {
        throw new Error(`Invalid date: ${date}`);
      }

      if (typeof window === "undefined") {
        const utcTime = new Date(parsedDate.getTime() - KST_OFFSET);

        return toZonedTime(utcTime, "Asia/Seoul");
      } else {
        if (typeof date === "number" || date instanceof Date) {
          return new Date(parsedDate);
        } else {
          let adjustedDateString = date;
          if (!date.includes("T") && !date.includes(" ")) {
            adjustedDateString = `${date}T00:00:00+09:00`;
          } else if (!date.includes("+") && !date.includes("Z")) {
            adjustedDateString = `${date}+09:00`;
          }

          return new Date(adjustedDateString);
        }
      }
    } else {
      return toZonedTime(new Date(), "Asia/Seoul");
    }
  } catch (error) {
    console.error("getKoreanDate error:", error);

    return toZonedTime(new Date(), "Asia/Seoul");
  }
}
