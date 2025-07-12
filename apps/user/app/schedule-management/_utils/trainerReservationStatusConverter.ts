import { format } from "date-fns";

import { TrainerReservationStatusApiResponse } from "@user/services/types/reservations.dto";

export const getInactiveTrainerReservationStatus = (
  trainerReservationStatus: TrainerReservationStatusApiResponse["data"],
): { [month: string]: { [day: string]: [string, string] } } => {
  const sortedTrainerReservationStatus = trainerReservationStatus.sort(
    (a, b) => new Date(a.reservationDates[0]).getTime() - new Date(b.reservationDates[0]).getTime(),
  );

  const filteredTrainerReservationStatus = sortedTrainerReservationStatus.filter(
    (reservationStatus) => {
      switch (reservationStatus.status) {
        case "예약 대기":
        case "예약 취소":
        case "예약 거절":
        case "예약 종료":
          return false;
        default:
          return true;
      }
    },
  );

  return filteredTrainerReservationStatus.reduce(
    (acc, filteredReservationStatus) => {
      const month = filteredReservationStatus.reservationDates[0].split("-")[1];
      const day = filteredReservationStatus.reservationDates[0].split("-")[2].split("T")[0];
      const time = filteredReservationStatus.reservationDates[0]
        .split("-")[2]
        .split("T")[1]
        .split(":")[0];
      const dayOfWeek = getDayOfWeek(filteredReservationStatus.reservationDates[0]);

      if (!acc[month]) {
        acc[month] = {};
      }

      acc[month][day] = [dayOfWeek, time];

      return acc;
    },
    {} as { [month: string]: { [day: string]: [string, string] } },
  );
};

const getDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString);
  const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

  return days[date.getDay()];
};

// 휴무일 체크 함수
export const isDateInDayoff = (date: Date, dayoffDates: string[]): boolean => {
  const dateString = format(date, "yyyy-MM-dd");

  return dayoffDates.includes(dateString);
};

// 예약된 시간 체크 함수
export const isTimeReserved = (
  date: Date,
  time: string,
  inactiveReservations: ReturnType<typeof getInactiveTrainerReservationStatus>,
): boolean => {
  const month = format(date, "MM");
  const day = format(date, "dd");
  const hour = time.split(":")[0];

  const monthData = inactiveReservations[month];
  if (!monthData) return false;

  const dayData = monthData[day];
  if (!dayData) return false;

  return dayData[1] === hour;
};

// 사용자 기존 예약 체크 함수
export const isUserHasReservation = (
  date: Date,
  userReservations: Array<{ reservationDates: string[] }>,
): boolean => {
  const dateString = format(date, "yyyy-MM-dd");

  return userReservations.some(
    (reservation) => reservation.reservationDates[0].split("T")[0] === dateString,
  );
};

// 편집 모드 시간 제한 체크 함수
export const isWithinEditTimeLimit = (date: Date, time: string, mode: string): boolean => {
  if (mode !== "edit") return false;

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const selectedHour = parseInt(time.split(":")[0], 10);
  const MIN_HOURS_BEFORE_EDIT = 1;

  return (
    date.toDateString() === currentDate.toDateString() &&
    selectedHour - currentHour <= MIN_HOURS_BEFORE_EDIT
  );
};

// 기본 스케줄 제약 체크 함수
export const isOutsideSchedule = (hour: number, startHour?: number, endHour?: number): boolean => {
  return startHour === undefined || endHour === undefined || hour < startHour || hour > endHour;
};
