/* eslint-disable no-magic-numbers */
import { BaseReservationListItem } from "@5unwan/core/api/types/common";

const extractDateOnly = (dateString: string) => {
  return dateString.split("T")[0];
};

export const filterLatestReservationsByDate = (reservations: BaseReservationListItem[]) => {
  const dateMap: Record<string, BaseReservationListItem> = {};

  for (let i = 0; i < reservations.length; i += 1) {
    const reservation = reservations[i];

    if (reservation.status === "예약 취소") continue;

    reservation.reservationDates.forEach((dateString) => {
      const dateKey = extractDateOnly(dateString);
      dateMap[dateKey] = reservation;
    });
  }

  return Object.values(dateMap);
};
