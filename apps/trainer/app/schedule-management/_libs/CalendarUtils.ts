import { addHours, isEqual, isSameDay, startOfDay } from "date-fns";

import { GetReservationStatusApiResponse } from "@trainer/services/types/reservations.dto";

export const mergeDateAndTime = (date: Date) => {
  return Array.from({ length: 24 }, (_, index) => addHours(startOfDay(date), index));
};

export const parsedReservationContent = (
  reservationContents: GetReservationStatusApiResponse["data"],
  date: Date,
) => {
  const { reservations } = reservationContents;

  return reservations.filter((content) => {
    if (content.status === "휴무일") {
      return;
    }

    return Array.isArray(content.reservationDates)
      ? isEqual(date, content.reservationDates[0])
      : isEqual(date, content.reservationDates);
  });
};

export const isCheckDayOff = (
  reservationContents: GetReservationStatusApiResponse["data"],
  date: Date,
) => {
  const { reservations } = reservationContents;

  return reservations.some((content) => {
    if (content.status === "휴무일") {
      return isSameDay(date, new Date(content.reservationDates[0]));
    }
  });
};
