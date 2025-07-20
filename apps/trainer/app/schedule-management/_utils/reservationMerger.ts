/* eslint-disable no-magic-numbers */

import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

export const filterLatestReservationsByDate = (reservations: ModifiedReservationListItem[]) => {
  const dateMap: Record<string, ModifiedReservationListItem> = {};

  for (let i = 0; i < reservations.length; i += 1) {
    const reservation = reservations[i];
    if (reservation.status === "예약 거절") continue;

    reservation.reservationDates.forEach((dateString, index) => {
      const dateKey = `${dateString}`;

      if (index === 0) dateMap[dateKey] = reservation;
      else
        dateMap[dateKey] = {
          ...reservation,
          reservationDates: [reservation.reservationDates[1], reservation.reservationDates[0]],
        };
    });
  }

  return Object.values(dateMap);
};

// 예약 대기 인원 수를 위한 새로운 함수
export const getPendingReservationCount = (
  reservations: ModifiedReservationListItem[],
  targetDate: Date,
) => {
  const pendingReservations = reservations.filter((reservation) => {
    if (reservation.status !== "예약 대기") return false;

    return reservation.reservationDates.some((dateString) => {
      const reservationDate = new Date(dateString);

      return reservationDate.getTime() === targetDate.getTime();
    });
  });

  return pendingReservations.length;
};
