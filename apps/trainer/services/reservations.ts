import http from "../app/apiCore";
import {
  CreateDirectReservationApiResponse,
  CreateDirectReservationRequestBody,
  GetReservationDetailStatusApiResponse,
  GetReservationDetailStatusRequestPath,
  GetReservationStatusApiResponse,
  GetReservationStatusRequestQuery,
  GetReservationWaitingMembersRequestPath,
  GetReservationWaitingMembersApiResponse,
  SetReservationDateAvailabilityApiResponse,
  SetReservationDateAvailabilityRequestBody,
  EditFixedReservationRequestPath,
  EditFixedReservationRequestBody,
  EditFixedReservationApiResponse,
  ProcessPTApiResponse,
  ProcessPTRequestPath,
  ProcessPTRequestBody,
  ProcessReservationChangeRequestPath,
  ProcessReservationChangeRequestBody,
  ProcessReservationChangeApiResponse,
  ProcessCancelReservationRequestPath,
  ProcessCancelReservationRequestBody,
  ProcessCancelReservationApiResponse,
  CancelReservationRequestPath,
  CancelReservationRequestBody,
  CancelReservationApiResponse,
  TerminateFixedReservationRequestPath,
  TerminateFixedReservationApiResponse,
  CreateFixedReservationRequestBody,
  CreateFixedReservationApiResponse,
} from "./types/reservations.dto";
import {
  ApproveReservationApiResponse,
  ApproveReservationRequestBody,
  ApproveReservationRequestPath,
} from "./types/reservations.dto";

const RESERVATION_BASE_URL = "reservations";

export const getReservationStatus = ({ date }: GetReservationStatusRequestQuery) =>
  http.get<GetReservationStatusApiResponse>({ url: `${RESERVATION_BASE_URL}`, params: { date } });

export const getReservationDetailStatus = ({
  reservationId,
}: GetReservationDetailStatusRequestPath) =>
  http.get<GetReservationDetailStatusApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}`,
  });

export const getReservationWaitingMembers = ({
  reservationDate,
}: GetReservationWaitingMembersRequestPath) =>
  http.get<GetReservationWaitingMembersApiResponse>({
    url: `${RESERVATION_BASE_URL}/waiting-members/${reservationDate}`,
  });

export const setReservationDateAvailability = (
  requestBody: SetReservationDateAvailabilityRequestBody,
) =>
  http.post<SetReservationDateAvailabilityApiResponse>({
    url: `${RESERVATION_BASE_URL}/availability/disable`,
    data: requestBody,
  });

export const createDirectReservation = (requestBody: CreateDirectReservationRequestBody) =>
  http.post<CreateDirectReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}`,
    data: requestBody,
  });

export const createFixedReservation = (requestBody: CreateFixedReservationRequestBody) =>
  http.post<CreateFixedReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}/fixed-reservations`,
    data: requestBody,
  });

export const terminateFixedReservation = ({
  reservationId,
}: TerminateFixedReservationRequestPath) =>
  http.post<TerminateFixedReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}/fixed-reservations/${reservationId}/release`,
  });

export const approveReservation = ({
  requestPath,
  requestBody,
}: {
  requestPath: ApproveReservationRequestPath;
  requestBody: ApproveReservationRequestBody;
}) => {
  const { reservationId } = requestPath;

  return http.post<ApproveReservationApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}/approve`,
    data: requestBody,
  });
};

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

export const processPT = ({
  requestPath,
  requestBody,
}: {
  requestPath: ProcessPTRequestPath;
  requestBody: ProcessPTRequestBody;
}) => {
  const { reservationId } = requestPath;

  return http.post<ProcessPTApiResponse>({
    url: `${RESERVATION_BASE_URL}/${reservationId}/sessions/complete`,
    data: requestBody,
  });
};

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
