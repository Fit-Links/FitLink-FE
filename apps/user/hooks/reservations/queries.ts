import { queryOptions } from "@tanstack/react-query";

import { getReservationDetailStatus, getReservationStatus } from "@user/services/reservations";

const reservationQueries = {
  all: () => ["reservations"],
  lists: () => [...reservationQueries.all(), "list"],
  list: (date?: string) =>
    queryOptions({
      queryKey: [...reservationQueries.lists(), date],
      queryFn: () => getReservationStatus({ date }),
    }),
  details: () => [...reservationQueries.all(), "detail"],
  detail: (reservationId: number) =>
    queryOptions({
      queryKey: [...reservationQueries.details(), reservationId],
      queryFn: () => getReservationDetailStatus({ reservationId }),
    }),
};

export default reservationQueries;
