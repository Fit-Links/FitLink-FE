import { DayOfWeek } from "@5unwan/core/api/types/common";
import { TimeCell } from "@ui/utils/timeCellUtils";
import { format } from "date-fns";

import { TrainerAvailableTimesApiResponse } from "@user/services/types/myInformation.dto";
import { ReservationStatusApiResponse } from "@user/services/types/reservations.dto";

import { RequestReservationMode } from "@user/app/schedule-management/reservation/[mode]/types/requestReservation";

import {
  getInactiveTrainerReservationStatus,
  isTimeReserved,
  isUserHasReservation,
  isWithinEditTimeLimit,
  isOutsideSchedule,
} from "./trainerReservationStatusConverter";

// 원래 예약된 날짜와 예약 페이지에서 선택된 날짜 같은지 비교 함수
export const isSameOriginalSelectedDateAndSelectedDate = (
  originalSelectedDate: string | null | undefined,
  selectedDate: Date,
) => {
  if (!originalSelectedDate) return false;

  const originalSelecteMDY = originalSelectedDate.split("T")[0];
  const selectedDateMDY = format(selectedDate, "yyyy-MM-dd");

  return originalSelecteMDY === selectedDateMDY;
};

export const generateIntegratedTimeCells = (
  selectedDate: Date,
  trainerAvailableTimes: TrainerAvailableTimesApiResponse["data"],
  inactiveReservations: ReturnType<typeof getInactiveTrainerReservationStatus>,
  userReservations: ReservationStatusApiResponse["data"],
  mode: RequestReservationMode,
  searchParamsDate?: string | null,
): TimeCell[] => {
  const dayOfWeek = format(selectedDate, "EEEE").toUpperCase() as DayOfWeek;

  // dayOffs 배열에서 휴무일 체크 (O 대문자 주의)
  const dayOffs: string[] = trainerAvailableTimes?.dayOffs ?? [];
  const selectedDateString = format(selectedDate, "yyyy-MM-dd");
  const isDayoff = dayOffs.includes(selectedDateString);

  // 기본 스케줄 정보 찾기
  const scheduleInfo = trainerAvailableTimes?.currentSchedules?.schedules?.find(
    ({ dayOfWeek: scheduleDay }: { dayOfWeek: string }) => scheduleDay === dayOfWeek,
  );

  const isHoliday = scheduleInfo?.isHoliday || false;
  const startTime = scheduleInfo?.startTime;
  const endTime = scheduleInfo?.endTime;
  const startHour = startTime ? parseInt(startTime.split(":")[0], 10) : undefined;
  const endHour = endTime ? parseInt(endTime.split(":")[0], 10) : undefined;

  const hasUserReservation = isSameOriginalSelectedDateAndSelectedDate(
    searchParamsDate,
    selectedDate,
  )
    ? false
    : isUserHasReservation(selectedDate, userReservations);

  const HOURS_IN_DAY = 24;
  const PAD_LENGTH = 2;

  return Array.from({ length: HOURS_IN_DAY }, (_, hour) => {
    const time = `${hour.toString().padStart(PAD_LENGTH, "0")}:00`;

    // 휴무일이면 무조건 disabled
    if (isDayoff) {
      return { dayOfWeek, time, disabled: true };
    }

    // 기본 스케줄 제약
    const isDisabledBySchedule = isHoliday || isOutsideSchedule(hour, startHour, endHour);

    // 예약된 시간인 경우
    const isReserved = isTimeReserved(selectedDate, time, inactiveReservations);

    // 사용자 기존 예약이 있는 경우
    const isDisabledByUserReservation = hasUserReservation;

    // 편집 모드 시간 제한
    const isDisabledByEditLimit = isWithinEditTimeLimit(selectedDate, time, mode);

    const disabled =
      isDisabledBySchedule || isReserved || isDisabledByUserReservation || isDisabledByEditLimit;

    return {
      dayOfWeek,
      time,
      disabled,
    };
  });
};
