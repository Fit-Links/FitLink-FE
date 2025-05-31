import { AvailablePtTime } from "@5unwan/core/api/types/common";

import { DAYS } from "@trainer/constants/Day";

/* eslint-disable no-magic-numbers */

export const formatAvailableScheduleToMeridiem = (time: string | null) => {
  if (!time) {
    return "";
  }

  if (!/^\d{1,2}:\d{2}$/.test(time)) {
    throw new Error(`Invalid time format: "${time}" (Expected "HH:mm")`);
  }

  const [hour, minute] = time.split(":").map(Number);

  if (hour < 0 || hour > 23) {
    throw new Error(`Invalid hour value: "${hour}" (Expected 0-23)`);
  }

  if (hour === 0) {
    return `오전 12:${minute.toString().padStart(2, "0")}`;
  } else if (hour < 12) {
    return `오전 ${hour}:${minute.toString().padStart(2, "0")}`;
  } else if (hour === 12) {
    return `오후 12:${minute.toString().padStart(2, "0")}`;
  } else {
    return `오후 ${hour - 12}:${minute.toString().padStart(2, "0")}`;
  }
};

export const formatAvailableScheduleConfirm = (
  availableSchedule: Omit<AvailablePtTime, "availableTimeId">,
) => {
  const { dayOfWeek, isHoliday, startTime, endTime } = availableSchedule;

  if (isHoliday) return;

  const formattedStartTime = formatAvailableScheduleToMeridiem(startTime);
  const formattedEndTime = formatAvailableScheduleToMeridiem(endTime);

  return `${DAYS[dayOfWeek]} ${formattedStartTime} - ${formattedEndTime}`;
};

export const formatDateToKorean = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export const formatDateStringToKorean = (dateString: string | number | undefined): string => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  return formatDateToKorean(date);
};
