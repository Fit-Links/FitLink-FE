import { queryOptions } from "@tanstack/react-query";

import {
  getReservationDetailStatus,
  getReservationStatus,
  getTrainerReservationStatus,
} from "@user/services/reservations";

export const baseReservationKeys = {
  all: () => ["reservations"] as const,
  lists: () => [...baseReservationKeys.all(), "list"] as const,
  details: () => [...baseReservationKeys.all(), "detail"] as const,
  trainerReservationStatus: () =>
    [...baseReservationKeys.all(), "trainerReservationStatus"] as const,
};

export const reservationQueries = {
  list: (date?: string) =>
    queryOptions({
      queryKey: [...baseReservationKeys.lists(), date],
      queryFn: () => getReservationStatus({ date }),
    }),
  detail: (reservationId: number) =>
    queryOptions({
      queryKey: [...baseReservationKeys.details(), reservationId],
      queryFn: () => getReservationDetailStatus({ reservationId }),
    }),
  trainerReservationStatus: (date: string) =>
    queryOptions({
      queryKey: [...baseReservationKeys.trainerReservationStatus(), date],
      queryFn: () => getTrainerReservationStatus({ date }),
    }),
};
