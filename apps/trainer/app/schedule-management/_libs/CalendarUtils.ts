import { addHours, isEqual, isSameDay, startOfDay } from "date-fns";

import { ReservationStatusApiResponse } from "@trainer/services/types/reservations.dto";

export const mergeDateAndTime = (date: Date) => {
  return Array.from({ length: 24 }, (_, index) => addHours(startOfDay(date), index));
};

export const parsedReservationContent = (
  reservationContents: ReservationStatusApiResponse["data"],
  date: Date,
) => {
  const { reservations } = reservationContents;

  return reservations.filter((content) => {
    if (content.status === "휴무일") {
      return;
    }

    return Array.isArray(content.reservationDate)
      ? isEqual(date, content.reservationDate[0])
      : isEqual(date, content.reservationDate);
  });
};

export const isCheckDayOff = (
  reservationContents: ReservationStatusApiResponse["data"],
  date: Date,
) => {
  const { reservations } = reservationContents;

  return reservations.some((content) => {
    if (content.status === "휴무일") {
      return isSameDay(date, new Date(content.reservationDate[0]));
    }
  });
};
