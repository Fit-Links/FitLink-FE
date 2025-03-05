import http from "@user/utils/apiClient";

import {
  CancelReservationApiResponse,
  CancelReservationRequest,
  DirectReservationApiResponse,
  DirectReservationRequest,
  ReservationChangeApiResponse,
  ReservationChangeRequest,
  ReservationDetailStatusApiResponse,
  ReservationDetailStatusPathParmas,
  ReservationStatusApiResponse,
  ReservationStatusParams,
} from "./types/reservations";

const RESERVATION_BASE_URL = "reservations";

// 예약 현황 조회
export const getReservationStatus = ({ date }: ReservationStatusParams) => {
  http.get<ReservationStatusApiResponse>({ url: `${RESERVATION_BASE_URL}`, params: { date } });
};

// 예약 상세 조회
export const gerReservationDetailStatus = ({
  reservationId,
}: ReservationDetailStatusPathParmas) => {
  http.get<ReservationDetailStatusApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}},`,
  });
};

// 직접 예약
export const createDirectReservation = ({ reservations }: DirectReservationRequest) => {
  http.post<DirectReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}`,
    data: { reservations },
  });
};

// 예약 취소
export const createCancelReservation = ({
  reservationId,
  cancel_reason,
}: CancelReservationRequest) => {
  http.post<CancelReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}}/cancel`,
    data: {
      cancel_reason,
    },
  });
};

// 예약 변경 요청
export const createReservationChange = ({
  reservationId,
  reservationDate,
  reservationDay,
  changeDate,
  changeDay,
}: ReservationChangeRequest) => {
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
