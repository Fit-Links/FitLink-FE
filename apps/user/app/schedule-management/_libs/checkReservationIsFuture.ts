import { format } from "date-fns";

import { getKoreanDate } from "@user/utils/date";

export const checkReservationIsFuture = (reservationDate?: string) => {
  if (!reservationDate) return false;

  const today = format(getKoreanDate(), "yyyy-MM-dd'T'HH:mm:ss");
  const parsedReservationDate = format(new Date(reservationDate), "yyyy-MM-dd'T'HH:mm:ss");

  return today <= parsedReservationDate;
};
