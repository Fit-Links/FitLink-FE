/* eslint-disable no-magic-numbers */

import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

export const filterLatestReservationsByDate = (reservations: ModifiedReservationListItem[]) => {
  const dateMap: Record<string, ModifiedReservationListItem> = {};

  for (let i = 0; i < reservations.length; i += 1) {
    const reservation = reservations[i];
    reservation.reservationDates.forEach((dateString, index) => {
      const dateKey = `${dateString}-${reservation.reservationId}`;

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
