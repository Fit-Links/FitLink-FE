import { toZonedTime } from "date-fns-tz";

export const getKoreanDate = (): Date => {
  return toZonedTime(new Date(), "Asia/Seoul");
};
