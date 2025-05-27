/* eslint-disable no-magic-numbers */

import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

export const filterLatestReservationsByDate = (reservations: ModifiedReservationListItem[]) => {
  const dateMap: Record<string, ModifiedReservationListItem> = {};

  for (let i = 0; i < reservations.length; i += 1) {
    const reservation = reservations[i];
    reservation.reservationDates.forEach((dateString) => {
      const dateKey = dateString;
      dateMap[dateKey] = reservation;
    });
  }

  return Object.values(dateMap);
};
