/* eslint-disable no-magic-numbers */

import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

export const filterLatestReservationsByDate = (reservations: ModifiedReservationListItem[]) => {
  const dateMap: Record<string, ModifiedReservationListItem> = {};

  for (let i = 0; i < reservations.length; i += 1) {
    const reservation = reservations[i];
    const dateKey = reservation.reservationDates[0];

    dateMap[dateKey] = reservation;
  }

  return Object.values(dateMap);
};
