import { DayOfWeek, NoResponseData, ResponseBase } from "@5unwan/core/api/types/common";

export type TimeOffInformation = { dayOfWeek: DayOfWeek; dayOfTime: string };

/** 단일 Available Time Entry 인터페이스 */
export type AvailablePtTimeEntry = {
  availableTimeId: number;
  dayOfWeek: DayOfWeek;
  isHoliday: boolean;
  startTime: string;
  endTime: string;
};

/** 내(트레이너) 정보 조회 응답 */
type MyInformationResponse = {
  name: string;
  birthDate: string;
  phoneNumber: string;
  profileUrl: string;
};
export type MyInformationApiResponse = ResponseBase<MyInformationResponse>;

/** 내(트레이너) 정보 수정 요청 */
export type EditMyInformationRequestBody = { name?: string; phoneNumber?: string };
/** 내(트레이너) 정보 수정 응답 */
type EditMyInformationResponse = { name: string; phoneNumber: string };
export type EditMyInformationApiResponse = ResponseBase<EditMyInformationResponse>;

/** 트레이너 코드 조회 응답*/
type TrainerCodeResponse = { trainerCode: string };
export type TrainerCodeApiResponse = ResponseBase<TrainerCodeResponse>;

/** PT 수업 가능 시간 조회 응답 데이터 */
type AvailablePtTimeResponse = {
  currentSchedules: AvailablePtTimeEntry[];
  scheduledChanges: {
    applyAt: string;
    schedules: AvailablePtTimeEntry[];
  };
};
export type AvailablePtTimeApiResponse = ResponseBase<AvailablePtTimeResponse>;

/** PT 수업 가능 시간 삭제 요청 (경로 변수) */
export type DeleteAvailablePtTimeRequestPath = { availableTimesId: number };
// 응답 데이터
export type DeleteAvailableTimeApiResponse = NoResponseData;

/** PT 수업 가능 시간 추가 요청 */
export type AddAvailablePtTimeRequestBody = {
  applyAt: string;
  availableTimes: Omit<AvailablePtTimeEntry, "availableTimeId">[];
};
/** 응답 데이터 */
type AddAvailablePtTimeResponse = {
  applyAt: string;
  availableTimes: Omit<AvailablePtTimeEntry, "availableTimeId">[];
};
export type AddAvailablePtTimeApiResponse = ResponseBase<AddAvailablePtTimeResponse>;

/** 휴무일 추가 요청 */
export type AddTimeOffRequestBody = TimeOffInformation;
/** 응답 데이터 */
type AddTimeOffResponse = TimeOffInformation;
export type AddTimeOffApiResponse = ResponseBase<AddTimeOffResponse>;

/** 휴무일 삭제 요청 (경로 변수) */
export type DeleteTimeOffRequestPath = { dayOffId: number };
export type DeleteTimeOffRequestBody = TimeOffInformation;
/** 휴무일 삭제 응답 */
export type DeleteTimeOffApiResponse = NoResponseData;
