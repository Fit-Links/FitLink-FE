import { USER_MANAGEMENT_BASE_URL } from "@trainer/constants/baseUrl";

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

// PT 회원 리스트 확인
export const getPtUserList = ({ q, page, size }: PtUserListRequestQuery) => {
  http.get<PtUserListApiResponse>({
    url: `${USER_MANAGEMENT_BASE_URL}/members`,
    params: {
      q,
      page,
      size,
    },
  });
};

// PT 회원 상세 조회
export const getPtUserDetail = ({ memberId }: PtUserDetailRequestPath) => {
  http.get<PtUserDetailApiResponse>({ url: `${USER_MANAGEMENT_BASE_URL}/members/${memberId}` });
};

// 멤버 연결 해제 요청
export const unLinkMember = ({ memberId }: UnlinkMemberRequestPath) => {
  http.post<UnlinkMemberApiResponse>({
    url: `${USER_MANAGEMENT_BASE_URL}/members/${memberId}/disconnect`,
  });
};

// 전체 Pt 등록수, 남은 숫자 수정
export const sessionCountEdit = (
  requestPath: SessionCountEditRequestPath,
  requestBody: SessionCountEditRequestBody,
) => {
  const { memberId, sessionInfoId } = requestPath;
  const { totalCount, remainingCount } = requestBody;
  http.patch<SessionCountEditApiResponse>({
    url: `${USER_MANAGEMENT_BASE_URL}/${memberId}/session-info/${sessionInfoId}`,
    data: {
      totalCount,
      remainingCount,
    },
  });
};

// 특정 회원 PT 내역 수정
export const targetMemberEditPtHistory = (
  requestPath: TargetMemberEditPtHistoryRequestPath,
  requestBody: TargetMemberEditPtHistoryRequestBody,
) => {
  const { memberId, sessionId } = requestPath;
  const { status } = requestBody;
  http.patch<TargetUserEditPtHistoryApiResponse>({
    url: `${USER_MANAGEMENT_BASE_URL}/members/${memberId}/using-sessions/${sessionId}`,
    data: {
      status,
    },
  });
};
