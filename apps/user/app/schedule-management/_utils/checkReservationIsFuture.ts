import { format } from "date-fns";

export const checkReservationIsFuture = (reservationDate?: string) => {
  if (!reservationDate) return false;

  const today = format(new Date(), "yyyy-MM-dd");
  const parsedReservationDate = format(new Date(reservationDate), "yyyy-MM-dd");

  return today <= parsedReservationDate;
};
