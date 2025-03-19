import { queryOptions } from "@tanstack/react-query";

import {
  getReservationDetailStatus,
  getReservationDetailPendingStatus,
  getReservationStatus,
} from "@trainer/services/reservations";

export const reservationBaseKeys = {
  all: ["reservation"] as const,
  statuses: () => [...reservationBaseKeys.all, "statuses"] as const,
  details: () => [...reservationBaseKeys.all, "details"] as const,
  pendingDetails: () => [...reservationBaseKeys.all, "pendingDetails"] as const,
};

export const reservationQueries = {
  status: (date: Date | string) => {
    const parsedStringDate = String(date);

    return queryOptions({
      queryKey: [...reservationBaseKeys.statuses(), parsedStringDate] as const,
      queryFn: () => getReservationStatus({ date: parsedStringDate }),
    });
  },
  detail: (reservationId: number) =>
    queryOptions({
      queryKey: [...reservationBaseKeys.details(), reservationId] as const,
      queryFn: () => getReservationDetailStatus({ reservationId }),
    }),
  pendingDetail: (reservationId: number) =>
    queryOptions({
      queryKey: [...reservationBaseKeys.pendingDetails(), reservationId] as const,
      queryFn: () => getReservationDetailPendingStatus({ reservationId: reservationId }),
    }),
};
