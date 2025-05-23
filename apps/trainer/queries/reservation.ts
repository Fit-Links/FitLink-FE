import { queryOptions } from "@tanstack/react-query";

import {
  getReservationDetailStatus,
  getReservationWaitingMembers,
  getReservationStatus,
} from "@trainer/services/reservations";

export const reservationBaseKeys = {
  all: ["reservation"] as const,
  lists: () => [reservationBaseKeys.all, "lists"] as const,
  details: () => [reservationBaseKeys.all, "details"] as const,
};

export const reservationQueries = {
  list: (date: Date | string) => {
    const parsedStringDate = String(date);

    return queryOptions({
      queryKey: [...reservationBaseKeys.lists(), parsedStringDate] as const,
      queryFn: () => getReservationStatus({ date: parsedStringDate }),
    });
  },
  detail: (reservationId: number) =>
    queryOptions({
      queryKey: [...reservationBaseKeys.details(), reservationId] as const,
      queryFn: () => getReservationDetailStatus({ reservationId }),
    }),
  pendingDetail: (reservationDate: string) =>
    queryOptions({
      queryKey: [...reservationBaseKeys.details(), reservationDate] as const,
      queryFn: () => getReservationWaitingMembers({ reservationDate }),
    }),
};
