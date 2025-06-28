import { toZonedTime } from "date-fns-tz";

const HOUR_OFFSET = 9;
const MINUTE_OFFSET = 60;
const SECOND_OFFSET = 60;
const MILLISECOND_OFFSET = 1000;

const KST_OFFSET = HOUR_OFFSET * MINUTE_OFFSET * SECOND_OFFSET * MILLISECOND_OFFSET; // 9시간을 밀리초로

const DEFAULT_DAY = 1;

export function getKoreanDate(): Date;
export function getKoreanDate(date: string): Date;
export function getKoreanDate(date: Date): Date;
export function getKoreanDate(date: number): Date;
export function getKoreanDate(date: string | number): Date;
export function getKoreanDate(date: string | Date): Date;
export function getKoreanDate(year: number, month: number): Date;
export function getKoreanDate(year: number, month: number, day: number): Date;
export function getKoreanDate(
  dateOrYear?: string | Date | number,
  month?: number,
  day?: number,
): Date {
  try {
    if (typeof dateOrYear === "number" && typeof month === "number") {
      const parsedDate = new Date(dateOrYear, month, day ?? DEFAULT_DAY);

      if (isNaN(parsedDate.getTime())) {
        throw new Error(`Invalid date: ${dateOrYear}, ${month}, ${day}`);
      }

      if (typeof window === "undefined") {
        const utcTime = new Date(parsedDate.getTime() - KST_OFFSET);

        return toZonedTime(utcTime, "Asia/Seoul");
      } else {
        return parsedDate;
      }
    }

    if (dateOrYear !== undefined) {
      let parsedDate: Date;

      if (typeof dateOrYear === "number") {
        parsedDate = new Date(dateOrYear);
      } else if (dateOrYear instanceof Date) {
        parsedDate = new Date(dateOrYear);
      } else {
        let dateString = dateOrYear;
        if (!dateOrYear.includes("T") && !dateOrYear.includes(" ")) {
          dateString = `${dateOrYear}T00:00:00`;
        }
        parsedDate = new Date(dateString);
      }

      if (isNaN(parsedDate.getTime())) {
        throw new Error(`Invalid date: ${dateOrYear}`);
      }

      if (typeof window === "undefined") {
        const utcTime = new Date(parsedDate.getTime() - KST_OFFSET);

        return toZonedTime(utcTime, "Asia/Seoul");
      } else {
        if (typeof dateOrYear === "number" || dateOrYear instanceof Date) {
          return new Date(parsedDate);
        } else {
          let adjustedDateString = dateOrYear;
          if (!dateOrYear.includes("T") && !dateOrYear.includes(" ")) {
            adjustedDateString = `${dateOrYear}T00:00:00+09:00`;
          } else if (!dateOrYear.includes("+") && !dateOrYear.includes("Z")) {
            adjustedDateString = `${dateOrYear}+09:00`;
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
