import http from "../app/apiCore";
import {
  ReservationStatusApiResponse,
  ReservationDetailPendingStatusApiResponse,
  ReservationSetNotAvailableApiResponse,
  CancelReservationApiResponse,
  ApproveReservationApiResponse,
  ReservationDetailPendingStatusRequestPath,
  ReservationSetNotAvailableRequestBody,
  DirectReservationRequestBody,
  FixReservationRequestBody,
  CancelReservationRequestBody,
  GetReservationDetailStatusApiResponse,
  GetReservationDetailStatusRequestPath,
  EditFixedReservationRequestPath,
  EditFixedReservationRequestBody,
  EditFixedReservationApiResponse,
  ProcessReservationChangeRequestPath,
  ProcessReservationChangeRequestBody,
  ProcessReservationChangeApiResponse,
  ProcessCancelReservationRequestPath,
  ProcessCancelReservationRequestBody,
  ProcessCancelReservationApiResponse,
  CancelReservationRequestPath,
  TerminateFixedReservationRequestPath,
  TerminateFixedReservationApiResponse,
  ApproveReservationRequestBody,
  ApproveReservationRequestPath,
  CompletedPtRequestBody,
  CompletedPtRequestPath,
  ReservationStatusPathParams,
  CreateFixedReservationApiResponse,
  CreateDirectReservationApiResponse,
  CompletedPtApiResponse,
} from "./types/reservations.dto";

export const getReservationStatus = ({ date }: ReservationStatusPathParams) =>
  http.get<ReservationStatusApiResponse>({ url: `/v1/${RESERVATION_BASE_URL}`, params: { date } });

export const getReservationDetailStatus = ({
  reservationId,
}: GetReservationDetailStatusRequestPath) =>
  http.get<GetReservationDetailStatusApiResponse>({
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
  http.post<CreateDirectReservationApiResponse>({
    url: `/v1/${RESERVATION_BASE_URL}`,
    data: { trainerId, memberId, name, dates },
  });

export const createFixReservation = ({ memberId, name, dates }: FixReservationRequestBody) =>
  http.post<CreateFixedReservationApiResponse>({
    url: `/v1/${RESERVATION_BASE_URL}/fixed-reservations`,
    data: { memberId, name, dates },
  });

const RESERVATION_BASE_URL = "reservations";

// export const getReservationStatus = ({ date }: GetReservationStatusRequestQuery) =>
//   http.get<GetReservationStatusApiResponse>({ url: `${RESERVATION_BASE_URL}`, params: { date } });

// export const getReservationDetailStatus = ({
//   reservationId,
// }: GetReservationDetailStatusRequestPath) =>
//   http.get<GetReservationDetailStatusApiResponse>({
//     url: `${RESERVATION_BASE_URL}/${reservationId}`,
//   });

// export const getReservationWaitingMembers = ({
//   reservationDate,
// }: GetReservationWaitingMembersRequestPath) =>
//   http.get<GetReservationWaitingMembersApiResponse>({
//     url: `${RESERVATION_BASE_URL}/waiting-members/${reservationDate}`,
//   });

// export const setReservationDateAvailability = (
//   requestBody: SetReservationDateAvailabilityRequestBody,
// ) =>
//   http.post<SetReservationDateAvailabilityApiResponse>({
//     url: `${RESERVATION_BASE_URL}/availability/disable`,
//     data: requestBody,
//   });

// export const createDirectReservation = (requestBody: CreateDirectReservationRequestBody) =>
//   http.post<CreateDirectReservationApiResponse>({
//     url: `${RESERVATION_BASE_URL}`,
//     data: requestBody,
//   });

// export const createFixedReservation = (requestBody: CreateFixedReservationRequestBody) =>
//   http.post<CreateFixedReservationApiResponse>({
//     url: `${RESERVATION_BASE_URL}/fixed-reservations`,
//     data: requestBody,
//   });

export const terminateFixedReservation = ({
  reservationId,
}: TerminateFixedReservationRequestPath) =>
  http.post<TerminateFixedReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}/fixed-reservations/${reservationId}/release`,
  });

// export const approveReservation = ({
//   requestPath,
//   requestBody,
// }: {
//   requestPath: ApproveReservationRequestPath;
//   requestBody: ApproveReservationRequestBody;
// }) => {
//   const { reservationId } = requestPath;
//   const { memberId, reservationDate } = requestBody;

//   return http.post<CancelReservationApiResponse>({
//     url: `/v1/${RESERVATION_BASE_URL}/${reservationId}/approve`,
//     data: { memberId, reservationDate },
//   });
// };

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

// export const createConfirmReservationChange = (
//   requestPath: ConfirmReservationChangeRequestPath,
//   requestBody: ConfirmReservationChangeRequestBody,
// ) => {
//   return http.post<ApproveReservationApiResponse>({
//     url: `${RESERVATION_BASE_URL}/${reservationId}/approve`,
//     data: requestBody,
//   });
// };

export const cancelReservation = ({
  requestPath,
  requestBody,
}: {
  requestPath: CancelReservationRequestPath;
  requestBody: CancelReservationRequestBody;
}) => {
  const { reservationId } = requestPath;

  return http.post<CancelReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}/cancel`,
    data: requestBody,
  });
};

export const processCancelReservation = ({
  requestPath,
  requestBody,
}: {
  requestPath: ProcessCancelReservationRequestPath;
  requestBody: ProcessCancelReservationRequestBody;
}) => {
  const { reservationId } = requestPath;

  return http.post<ProcessCancelReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}/cancel-approve`,
    data: requestBody,
  });
};

// export const processPT = ({
//   requestPath,
//   requestBody,
// }: {
//   requestPath: ProcessPTRequestPath;
//   requestBody: ProcessPTRequestBody;
// }) => {
//   const { reservationId } = requestPath;

//   return http.post<ProcessPTApiResponse>({
//     url: `${RESERVATION_BASE_URL}/${reservationId}/sessions/complete`,
//     data: requestBody,
//   });
// };

export const editFixedReservation = ({
  requestPath,
  requestBody,
}: {
  requestPath: EditFixedReservationRequestPath;
  requestBody: EditFixedReservationRequestBody;
}) => {
  const { reservationId } = requestPath;

  return http.post<EditFixedReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}/fixed-change-request`,
    data: requestBody,
  });
};

export const processReservationChange = ({
  requestPath,
  requestBody,
}: {
  requestPath: ProcessReservationChangeRequestPath;
  requestBody: ProcessReservationChangeRequestBody;
}) => {
  const { reservationId } = requestPath;

  return http.post<ProcessReservationChangeApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}/change-apporove`,
    data: requestBody,
  });
};
