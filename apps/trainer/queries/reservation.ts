import { queryOptions } from "@tanstack/react-query";

import {
  getReservationDetailStatus,
  getReservationDetailStatusPendingStatus,
  getReservationStatus,
} from "@trainer/services/reservations";

export const reservationBaseKeys = {
  all: ["reservation"] as const,
  status: () => [...reservationBaseKeys.all, "status"] as const,
};

export const reservationQueries = {
  status: (date: Date | string) => {
    const parsedStringDate = String(date);

    return queryOptions({
      queryKey: [...reservationBaseKeys.status(), parsedStringDate],
      queryFn: () => getReservationStatus({ date: parsedStringDate }),
    });
  },
  detail: (reservationId: number) =>
    queryOptions({
      queryKey: [...reservationBaseKeys.status(), "detail", reservationId],
      queryFn: () => getReservationDetailStatus({ reservationId }),
    }),
  pendingDetail: (reservatio: number) =>
    queryOptions({
      queryKey: [...reservationBaseKeys.status(), "pending", reservatio],
      queryFn: () => getReservationDetailStatusPendingStatus({ reservationId: reservatio }),
    }),
};
