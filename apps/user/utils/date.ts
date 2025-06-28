import { toZonedTime } from "date-fns-tz";

export function getKoreanDate(): Date;
export function getKoreanDate(date: string): Date;
export function getKoreanDate(date?: string): Date {
  try {
    if (date) {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error(`Invalid date string: ${date}`);
      }

      return toZonedTime(parsedDate, "Asia/Seoul");
    } else {
      return toZonedTime(new Date(), "Asia/Seoul");
    }
  } catch (error) {
    console.error("getKoreanDate error:", error);

    // 에러 시 현재 시간 반환
    return toZonedTime(new Date(), "Asia/Seoul");
  }
}
