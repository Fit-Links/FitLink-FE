import http from "@trainer/utils/ApiClient";

const RESERVATION_BASE_URL = "reservations";

import {
  ReservationDetailStatusPathParam,
  ReservationDetailStatusApiResponse,
  ReservationStatusApiResponse,
  ReservationStatusParams,
  ReservationDetailPendingStatusPathParams,
  ReservationDetailPendingStatusApiResponse,
  ReservationSetNotAvailableApiResponse,
  ReservationSetNotAvailableRequest,
  DirectReservationRequest,
  DirectReservationApiResponse,
  FixReservationRequest,
  FixReservationApiResponse,
  CancelReservationRequest,
  CancelReservationApiResponse,
  ApproveReservationRequest,
  ApproveReservationApiResponse,
  CompletedPtRequest,
  CompletedPtApiResponse,
  ConfirmReservationChangeRequest,
  ConfirmReservationChangeApiResponse,
} from "./types/reservations";

// 예약 현황 조회
export const getReservationStatus = ({ date }: ReservationStatusParams) => {
  http.get<ReservationStatusApiResponse>({ url: `${RESERVATION_BASE_URL}`, params: { date } });
};

// 예약 상세 조회
export const getReservationDetailStatus = ({ reservationId }: ReservationDetailStatusPathParam) => {
  http.get<ReservationDetailStatusApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}`,
  });
};

// 예약 상세 대기 조회
export const getReservationDetailStatusPendingStatus = ({
  reservationId,
}: ReservationDetailPendingStatusPathParams) => {
  http.get<ReservationDetailPendingStatusApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}`,
  });
};

// 예약 불가 설정
export const createReservationSetNotAvailable = ({ date }: ReservationSetNotAvailableRequest) => {
  http.post<ReservationSetNotAvailableApiResponse>({
    url: `${RESERVATION_BASE_URL}/availability/disable`,
    data: {
      date,
    },
  });
};

// 직접 예약
export const createDirectReservation = ({ reservations }: DirectReservationRequest) => {
  http.post<DirectReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}`,
    data: { reservations },
  });
};

// 고정 예약
export const createFixReservation = ({ memberId, name, reservations }: FixReservationRequest) => {
  http.post<FixReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}/fixed-reservation`,
    data: { memberId, name, reservations },
  });
};

// 예약 취소
export const createCancelReservation = ({
  reservationId,
  cancel_reason,
}: CancelReservationRequest) => {
  http.post<CancelReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}/cancel`,
    data: { cancel_reason },
  });
};

// 예약 승인
export const createApproveReservation = ({
  reservationId,
  trainerId,
  memberId,
}: ApproveReservationRequest) => {
  http.post<ApproveReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}/approve`,
    data: { memberId, trainerId },
  });
};

// 진행한 PT 처리
export const createCompletedPt = ({ sessionId, isJoin }: CompletedPtRequest) => {
  http.post<CompletedPtApiResponse>({
    url: `${RESERVATION_BASE_URL}/${sessionId}/complete`,
    data: { isJoin },
  });
};

// 예약 변경 승인
export const createConfirmReservationChange = ({
  reservationId,
  trainerId,
  memberId,
}: ConfirmReservationChangeRequest) => {
  http.post<ConfirmReservationChangeApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}/changes/apporove`,
    data: { memberId, trainerId },
  });
};
