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
} from "./types/reservations";

const RESERVATION_BASE_URL = "reservations";

// 예약 현황 조회
export const getReservationStatus = ({ date }: ReservationStatusRequestQuery) => {
  http.get<ReservationStatusApiResponse>({ url: `${RESERVATION_BASE_URL}`, params: { date } });
};

// 예약 상세 조회
export const getReservationDetailStatus = ({
  reservationId,
}: ReservationDetailStatusRequestPath) => {
  http.get<ReservationDetailStatusApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}},`,
  });
};

// 직접 예약
export const directReservation = ({ reservations }: DirectReservationRequestBody) => {
  http.post<DirectReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}`,
    data: { reservations },
  });
};

// 예약 취소
export const cancelReservation = (
  requestPath: CancelReservationRequestPath,
  requestBody: CancelReservationRequestBody,
) => {
  const { reservationId } = requestPath;
  const { cancel_reason } = requestBody;

  http.post<CancelReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}}/cancel`,
    data: {
      cancel_reason,
    },
  });
};

// 예약 변경 요청
export const reservationChange = (
  requestPath: ReservationChangeRequestPath,
  requestBody: ReservationChangeRequestBody,
) => {
  const { reservationId } = requestPath;
  const { reservationDate, reservationDay, changeDate, changeDay } = requestBody;

  http.post<ReservationChangeApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}`,
    data: {
      reservationDate,
      reservationDay,
      changeDate,
      changeDay,
    },
  });
};
