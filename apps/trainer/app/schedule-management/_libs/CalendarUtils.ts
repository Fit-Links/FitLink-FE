import { addHours, isEqual, isSameDay, startOfDay } from "date-fns";

import { GetDayoffApiResponse } from "@trainer/services/types/myInformation.dto";
import { ReservationStatusApiResponse } from "@trainer/services/types/reservations.dto";

export const mergeDateAndTime = (date: Date) => {
  return Array.from({ length: 24 }, (_, index) => addHours(startOfDay(date), index));
};

export const parsedReservationContent = (
  reservationContents: ReservationStatusApiResponse["data"],
  date: Date,
) => {
  return reservationContents.filter((content) => {
    if (content.status === "휴무일") {
      return;
    }

    return Array.isArray(content.reservationDates)
      ? isEqual(date, content.reservationDates[0])
      : isEqual(date, content.reservationDates);
  });
};

export const isCheckDayOff = (date: Date, reservationContents?: GetDayoffApiResponse["data"]) => {
  if (!reservationContents) return false;

  return reservationContents.some((content) => {
    return isSameDay(date, new Date(content.dayOffDate));
  });
};
