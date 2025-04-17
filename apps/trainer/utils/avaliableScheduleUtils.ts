import { AvailablePtTimeEntry } from "@trainer/services/types/myInformation.dto";

/* eslint-disable no-magic-numbers */

const WEEK_DAYS = ["월", "화", "수", "목", "금", "토", "일"] as const;

export const formatAvailableScheduleToMeridiem = (time: string) => {
  if (!/^\d{1,2}:\d{2}$/.test(time)) {
    throw new Error(`Invalid time format: "${time}" (Expected "HH:mm")`);
  }

  const [hour, minute] = time.split(":").map(Number);

  if (hour < 0 || hour > 23) {
    throw new Error(`Invalid hour value: "${hour}" (Expected 0-23)`);
  }

  if (hour === 0) {
    return `오전 12 : ${minute.toString().padStart(2, "0")}`;
  } else if (hour < 12) {
    return `오전 ${hour} : ${minute.toString().padStart(2, "0")}`;
  } else if (hour === 12) {
    return `오후 12 : ${minute.toString().padStart(2, "0")}`;
  } else {
    return `오후 ${hour - 12} : ${minute.toString().padStart(2, "0")}`;
  }
};

export const formatAvailableScheduleConfirm = (availableSchedule: AvailablePtTimeEntry) => {
  const { availableTimeId, isHoliday, startTime, endTime } = availableSchedule;

  if (isHoliday) return;

  return `${WEEK_DAYS[availableTimeId]} ${formatAvailableScheduleToMeridiem(startTime)} - ${formatAvailableScheduleToMeridiem(endTime)}`;
};

export const formatDateToKorean = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export const formatDateStringToKorean = (dateString: string | number): string => {
  const date = new Date(dateString);

  return formatDateToKorean(date);
};
