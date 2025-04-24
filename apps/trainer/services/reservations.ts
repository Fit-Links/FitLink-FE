const RESERVATION_BASE_URL = "reservations";

import http from "../app/apiCore";
import {
  ReservationDetailStatusApiResponse,
  ReservationStatusApiResponse,
  ReservationDetailPendingStatusApiResponse,
  ReservationSetNotAvailableApiResponse,
  DirectReservationApiResponse,
  FixReservationApiResponse,
  CancelReservationApiResponse,
  ApproveReservationApiResponse,
  CompletedPtApiResponse,
  ConfirmReservationChangeApiResponse,
  ReservationStatusRequestQuery,
  ReservationDetailStatusRequestPath,
  ReservationDetailPendingStatusRequestPath,
  ReservationSetNotAvailableRequestBody,
  DirectReservationRequestBody,
  FixReservationRequestBody,
  CancelReservationRequestBody,
  CancelReservationRequestPath,
  ApproveReservationRequestBody,
  ApproveReservationRequestPath,
  CompletedPtRequestBody,
  CompletedPtRequestPath,
  ConfirmReservationChangeRequestBody,
  ConfirmReservationChangeRequestPath,
} from "./types/reservations.dto";

export const getReservationStatus = ({ date }: ReservationStatusRequestQuery) =>
  http.get<ReservationStatusApiResponse>({ url: `${RESERVATION_BASE_URL}`, params: { date } });

export const getReservationDetailStatus = ({ reservationId }: ReservationDetailStatusRequestPath) =>
  http.get<ReservationDetailStatusApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}`,
  });

export const getReservationDetailPendingStatus = ({
  reservationId,
}: ReservationDetailPendingStatusRequestPath) =>
  http.get<ReservationDetailPendingStatusApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}`,
  });

export const createReservationSetNotAvailable = ({ date }: ReservationSetNotAvailableRequestBody) =>
  http.post<ReservationSetNotAvailableApiResponse>({
    url: `${RESERVATION_BASE_URL}/availability/disable`,
    data: {
      date,
    },
  });

export const createDirectReservation = ({ reservations }: DirectReservationRequestBody) =>
  http.post<DirectReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}`,
    data: { reservations },
  });

export const createFixReservation = ({ memberId, name, reservations }: FixReservationRequestBody) =>
  http.post<FixReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}/fixed-reservation`,
    data: { memberId, name, reservations },
  });

export const createCancelReservation = (
  requestPath: CancelReservationRequestPath,
  requestBody: CancelReservationRequestBody,
) => {
  const { reservationId } = requestPath;
  const { cancel_reason } = requestBody;

  return http.post<CancelReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}/cancel`,
    data: { cancel_reason },
  });
};

export const createApproveReservation = (
  requestPath: ApproveReservationRequestPath,
  reqeustBody: ApproveReservationRequestBody,
) => {
  const { reservationId } = requestPath;
  const { memberId, trainerId } = reqeustBody;

  return http.post<ApproveReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}/approve`,
    data: { memberId, trainerId },
  });
};

export const createCompletedPt = (
  requestPath: CompletedPtRequestPath,
  requestBody: CompletedPtRequestBody,
) => {
  const { sessionId } = requestPath;
  const { isJoin } = requestBody;

  return http.post<CompletedPtApiResponse>({
    url: `${RESERVATION_BASE_URL}/${sessionId}/complete`,
    data: { isJoin },
  });
};

export const createConfirmReservationChange = (
  requestPath: ConfirmReservationChangeRequestPath,
  requestBody: ConfirmReservationChangeRequestBody,
) => {
  const { reservationId } = requestPath;
  const { memberId, trainerId } = requestBody;

  return http.post<ConfirmReservationChangeApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}/changes/apporove`,
    data: { memberId, trainerId },
  });
};
