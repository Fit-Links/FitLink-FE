import http from "../app/apiCore";
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
  TrainerReservationStatusApiResponse,
  TrainerReservationStatusPathParams,
} from "./types/reservations.dto";

const RESERVATION_BASE_URL = "reservations";

export const getReservationStatus = ({ date }: ReservationStatusRequestQuery) =>
  http.get<ReservationStatusApiResponse>({ url: `/v1/${RESERVATION_BASE_URL}`, params: { date } });

export const getTrainerReservationStatus = ({ date }: TrainerReservationStatusPathParams) =>
  http.get<TrainerReservationStatusApiResponse>({
    url: `/v1/${RESERVATION_BASE_URL}/trainers`,
    params: { date },
  });

export const getReservationDetailStatus = ({ reservationId }: ReservationDetailStatusRequestPath) =>
  http.get<ReservationDetailStatusApiResponse>({
    url: `/v1/${RESERVATION_BASE_URL}/${reservationId}`,
  });

export const directReservation = ({
  trainerId,
  memberId,
  name,
  dates,
}: DirectReservationRequestBody) =>
  http.post<DirectReservationApiResponse>({
    url: `/v1/${RESERVATION_BASE_URL}`,
    data: {
      trainerId,
      memberId,
      name,
      dates,
    },
  });

export const cancelReservation = (
  requestPath: CancelReservationRequestPath,
  requestBody: CancelReservationRequestBody,
) => {
  const { reservationId } = requestPath;
  const { cancelReason, cancelDate } = requestBody;

  return http.post<CancelReservationApiResponse>({
    url: `/v1/${RESERVATION_BASE_URL}/${reservationId}/cancel`,
    data: {
      cancelReason,
      cancelDate,
    },
  });
};

export const reservationChange = (
  requestPath: ReservationChangeRequestPath,
  requestBody: ReservationChangeRequestBody,
) => {
  const { reservationId } = requestPath;
  const { reservationDate, changeRequestDate } = requestBody;

  return http.post<ReservationChangeApiResponse>({
    url: `/v1/${RESERVATION_BASE_URL}/${reservationId}/change-request`,
    data: {
      reservationDate,
      changeRequestDate,
    },
  });
};
