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
  ReservationStatusPathParams,
} from "./types/reservations.dto";

export const getReservationStatus = ({ date }: ReservationStatusPathParams) =>
  http.get<ReservationStatusApiResponse>({ url: `/v1/${RESERVATION_BASE_URL}`, params: { date } });

export const getReservationDetailStatus = ({ reservationId }: ReservationDetailStatusRequestPath) =>
  http.get<ReservationDetailStatusApiResponse>({
    url: `/v1/${RESERVATION_BASE_URL}/${reservationId}`,
  });

export const getReservationDetailPendingStatus = ({
  reservationDate,
}: ReservationDetailPendingStatusRequestPath) =>
  http.get<ReservationDetailPendingStatusApiResponse>({
    url: `/v1/${RESERVATION_BASE_URL}/waiting-members/${reservationDate}`,
  });

export const createReservationSetNotAvailable = ({
  date,
  reservationId,
}: ReservationSetNotAvailableRequestBody) =>
  http.post<ReservationSetNotAvailableApiResponse>({
    url: `/v1/${RESERVATION_BASE_URL}/availability/disable`,
    data: {
      date,
      reservationId,
    },
  });

export const createDirectReservation = ({
  trainerId,
  memberId,
  name,
  dates,
}: DirectReservationRequestBody) =>
  http.post<DirectReservationApiResponse>({
    url: `/v1/${RESERVATION_BASE_URL}`,
    data: { trainerId, memberId, name, dates },
  });

export const createFixReservation = ({ memberId, name, dates }: FixReservationRequestBody) =>
  http.post<FixReservationApiResponse>({
    url: `/v1/${RESERVATION_BASE_URL}/fixed-reservations`,
    data: { memberId, name, dates },
  });

export const createCancelReservation = (
  requestPath: CancelReservationRequestPath,
  requestBody: CancelReservationRequestBody,
) => {
  const { reservationId } = requestPath;
  const { cancelDate, cancelReason } = requestBody;

  return http.post<CancelReservationApiResponse>({
    url: `/v1/${RESERVATION_BASE_URL}/${reservationId}/cancel`,
    data: { cancelDate, cancelReason },
  });
};

export const createApproveReservation = (
  requestPath: ApproveReservationRequestPath,
  reqeustBody: ApproveReservationRequestBody,
) => {
  const { reservationId } = requestPath;
  const { memberId, reservationDate } = reqeustBody;

  return http.post<ApproveReservationApiResponse>({
    url: `/v1/${RESERVATION_BASE_URL}/${reservationId}/approve`,
    data: { memberId, reservationDate },
  });
};

export const createCompletedPt = (
  requestPath: CompletedPtRequestPath,
  requestBody: CompletedPtRequestBody,
) => {
  const { reservationId } = requestPath;
  const { memberId, isJoin } = requestBody;

  return http.post<CompletedPtApiResponse>({
    url: `/v1/${RESERVATION_BASE_URL}/${reservationId}/sessions/complete`,
    data: { memberId, isJoin },
  });
};

export const createConfirmReservationChange = (
  requestPath: ConfirmReservationChangeRequestPath,
  requestBody: ConfirmReservationChangeRequestBody,
) => {
  const { reservationId } = requestPath;
  const { memberId, trainerId } = requestBody;

  return http.post<ConfirmReservationChangeApiResponse>({
    url: `/v1/${RESERVATION_BASE_URL}/${reservationId}/changes/apporove`,
    data: { memberId, trainerId },
  });
};
