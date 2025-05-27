import { queryOptions } from "@tanstack/react-query";

import {
  getReservationDetailStatus,
  getReservationDetailPendingStatus,
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
  /** TODO: 예약 대기 상세 조회 API 변경됨 */
  pendingDetail: (reservationDate: string) =>
    queryOptions({
      queryKey: [...reservationBaseKeys.details(), "pending", reservationDate] as const,
      queryFn: () => getReservationDetailPendingStatus({ reservationDate }),
    }),
};
