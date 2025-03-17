import http from "./core";
import {
  CancelReservationApiResponse,
  CancelReservationRequestBody,
  CancelReservationRequestPath,
  DirectReservationApiResponse,
  DirectReservationRequestBody,
  ReservationChangeApiResponse,
  ReservationChangeRequestBody,
  ReservationChangeRequestPath,
  ReservationDetailStatusApiResponse,
  ReservationDetailStatusRequestPath,
  ReservationStatusApiResponse,
  ReservationStatusRequestQuery,
} from "./types/reservations.dto";

const RESERVATION_BASE_URL = "reservations";

export const getReservationStatus = ({ date }: ReservationStatusRequestQuery) =>
  http.get<ReservationStatusApiResponse>({ url: `${RESERVATION_BASE_URL}`, params: { date } });

export const getReservationDetailStatus = ({ reservationId }: ReservationDetailStatusRequestPath) =>
  http.get<ReservationDetailStatusApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}},`,
  });

export const directReservation = ({ reservations }: DirectReservationRequestBody) =>
  http.post<DirectReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}`,
    data: { reservations },
  });

export const cancelReservation = (
  requestPath: CancelReservationRequestPath,
  requestBody: CancelReservationRequestBody,
) => {
  const { reservationId } = requestPath;
  const { cancel_reason } = requestBody;

  return http.post<CancelReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}}/cancel`,
    data: {
      cancel_reason,
    },
  });
};

export const reservationChange = (
  requestPath: ReservationChangeRequestPath,
  requestBody: ReservationChangeRequestBody,
) => {
  const { reservationId } = requestPath;
  const { reservationDate, reservationDay, changeDate, changeDay } = requestBody;

  return http.post<ReservationChangeApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}`,
    data: {
      reservationDate,
      reservationDay,
      changeDate,
      changeDay,
    },
  });
};
