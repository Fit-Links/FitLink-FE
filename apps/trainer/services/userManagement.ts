import { TRAINER_BASE_URL } from "@trainer/constants/baseUrl";

import http from "./core";
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
  TargetUserEditPtHistoryApiResponse,
  UnlinkMemberApiResponse,
  UnlinkMemberRequestPath,
} from "./types/userManagement.dto";

export const getPtUserList = ({ q, page, size }: PtUserListRequestQuery) => {
  http.get<PtUserListApiResponse>({
    url: `${TRAINER_BASE_URL}/members`,
    params: {
      q,
      page,
      size,
    },
  });
};

export const getPtUserDetail = ({ memberId }: PtUserDetailRequestPath) => {
  http.get<PtUserDetailApiResponse>({ url: `${TRAINER_BASE_URL}/members/${memberId}` });
};

export const unLinkMember = ({ memberId }: UnlinkMemberRequestPath) => {
  http.post<UnlinkMemberApiResponse>({
    url: `${TRAINER_BASE_URL}/members/${memberId}/disconnect`,
  });
};

export const sessionCountEdit = (
  requestPath: SessionCountEditRequestPath,
  requestBody: SessionCountEditRequestBody,
) => {
  const { memberId, sessionInfoId } = requestPath;
  const { totalCount, remainingCount } = requestBody;
  http.patch<SessionCountEditApiResponse>({
    url: `${TRAINER_BASE_URL}/${memberId}/session-info/${sessionInfoId}`,
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
  http.patch<TargetUserEditPtHistoryApiResponse>({
    url: `${TRAINER_BASE_URL}/members/${memberId}/using-sessions/${sessionId}`,
    data: {
      status,
    },
  });
};
