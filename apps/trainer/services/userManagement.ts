import { TRAINER_BASE_URL } from "@trainer/constants/baseUrl";

import http from "../app/apiCore";
import {
  PtUserDetailApiResponse,
  PtUserDetailRequestPath,
  PtUserListApiResponse,
  PtUserListRequestQuery,
  SessionCountEditApiResponse,
  SessionCountEditRequestBody,
  SessionCountEditRequestPath,
  TargetMemberEditPtHistoryRequestBody,
  TargetMemberEditPtHistoryRequestPath,
  TargetMemberPtHistoryApiResponse,
  TargetMemberPtHistoryRequestPath,
  TargetMemberPtHistoryRequestQuery,
  TargetUserEditPtHistoryApiResponse,
  UnlinkMemberApiResponse,
  UnlinkMemberRequestPath,
} from "./types/userManagement.dto";

export const getTargetMemberPtHistory = (
  requestQuery: TargetMemberPtHistoryRequestQuery,
  requestPath: TargetMemberPtHistoryRequestPath,
) => {
  const { memberId } = requestPath;

  return http.get<TargetMemberPtHistoryApiResponse>({
    url: `/v1/${TRAINER_BASE_URL}/members/${memberId}/sessions`,
    params: requestQuery,
  });
};

export const getPtUserList = ({ q, page, size }: PtUserListRequestQuery) =>
  http.get<PtUserListApiResponse>({
    url: `/v1/members`,
    params: {
      q,
      page,
      size,
    },
  });

export const getPtUserDetail = ({ memberId }: PtUserDetailRequestPath) =>
  http.get<PtUserDetailApiResponse>({ url: `/v1/members/${memberId}` });

export const unLinkMember = ({ memberId }: UnlinkMemberRequestPath) =>
  http.post<UnlinkMemberApiResponse>({
    url: `/v1/${TRAINER_BASE_URL}/members/${memberId}/disconnect`,
  });

export const sessionCountEdit = (
  requestPath: SessionCountEditRequestPath,
  requestBody: SessionCountEditRequestBody,
) => {
  const { memberId, sessionInfoId } = requestPath;
  const { totalCount, remainingCount } = requestBody;

  return http.patch<SessionCountEditApiResponse>({
    url: `/v1/${TRAINER_BASE_URL}/${memberId}/session-info/${sessionInfoId}`,
    data: {
      totalCount,
      remainingCount,
    },
  });
};

export const targetMemberEditPtHistory = (
  requestPath: TargetMemberEditPtHistoryRequestPath,
  requestBody: TargetMemberEditPtHistoryRequestBody,
) => {
  const { memberId, sessionId } = requestPath;
  const { status } = requestBody;

  return http.patch<TargetUserEditPtHistoryApiResponse>({
    url: `/v1/${TRAINER_BASE_URL}/members/${memberId}/using-sessions/${sessionId}`,
    data: {
      status,
    },
  });
};
