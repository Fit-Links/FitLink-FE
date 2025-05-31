/* eslint-disable no-magic-numbers */
import { GetDayoffApiResponse } from "@trainer/services/types/myInformation.dto";
import { ReservationStatusApiResponse } from "@trainer/services/types/reservations.dto";

import { getFixedReservationDatesAndTimes } from "../_libs/getFixedReservationDatesAndTimes";

export const checkForReservationConflicts = (
  dates: string[],
  reservations: ReservationStatusApiResponse["data"],
  dayoff: GetDayoffApiResponse["data"],
) => {
  const isConflicts = reservations.filter(({ status, reservationDates }) => {
    if (status === "예약 확정" || status === "고정 예약" || status === "예약 불가 설정") {
      return dates.some((date) => {
        const newDateString = `${date}:00`;

        return new Date(reservationDates[0]).getTime() === new Date(newDateString).getTime();
      });
    }

    return false;
  });

  if (isConflicts.length === 0) {
    return dayoff.filter(({ dayOffDate }) => {
      return dates.some((date) => {
        const newDateString = date.split("T")[0];

        return dayOffDate === newDateString;
      });
    });
  }

  return isConflicts;
};

export const createNonConflictingFixedReservation = (
  selectedFixedSchedules: Record<string, string[]>,
  currentDate: Date,
  reservations: ReservationStatusApiResponse["data"],
  dayoff: GetDayoffApiResponse["data"],
  depth: number,
): string[] | undefined => {
  if (!reservations || !dayoff) return;

  console.log("reservations", reservations);
  console.log("dayoff", dayoff);

  const fixedReservationDatesAndTimes = getFixedReservationDatesAndTimes(
    selectedFixedSchedules,
    currentDate,
    depth,
  );

  const reservationConflicts = checkForReservationConflicts(
    fixedReservationDatesAndTimes,
    reservations,
    dayoff,
  );

  if (reservationConflicts.length > 0) {
    return createNonConflictingFixedReservation(
      selectedFixedSchedules,
      currentDate,
      reservations,
      dayoff,
      depth + 1,
    );
  }

  return fixedReservationDatesAndTimes;
};
