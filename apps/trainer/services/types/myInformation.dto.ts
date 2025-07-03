import {
  AvailablePtTime,
  DayOfWeek,
  NoResponseData,
  ResponseBase,
} from "@5unwan/core/api/types/common";

export type TimeOffInformation = { dayOfWeek: DayOfWeek; dayOfTime: string };
export type DayoffResponseInformation = { dayOffId: number; dayOffDate: string };

export type AvailablePtTimeEntry = {
  availableTimeId: number;
  dayOfWeek: DayOfWeek;
  isHoliday: boolean;
  startTime: string | null;
  endTime: string | null;
};
/** TODO: 트레이너ID 필드 추가 및 프로필 url 필드 이름 변경 */
type MyInformationResponse = {
  name: string;
  birthDate: string;
  phoneNumber: string;
  profilePictureUrl: string;
  trainerId: number;
};
export type MyInformationApiResponse = ResponseBase<MyInformationResponse>;

export type EditMyInformationRequestBody = { name?: string; phoneNumber?: string };
type EditMyInformationResponse = { name: string; phoneNumber: string };
export type EditMyInformationApiResponse = ResponseBase<EditMyInformationResponse>;

type TrainerCodeResponse = { trainerCode: string };
export type TrainerCodeApiResponse = ResponseBase<TrainerCodeResponse>;

type AvailablePtTimeResponse = {
  currentSchedules: { applyAt: string; schedules: AvailablePtTimeEntry[] };
  scheduledChanges: {
    applyAt: string;
    schedules: AvailablePtTimeEntry[];
  };
};
export type AvailablePtTimeApiResponse = ResponseBase<AvailablePtTimeResponse>;

export type DeleteAvailablePtTimeRequestPath = { availableTimeId: number };
export type DeleteAvailablePtTimeParams = { applyAt: string };
export type DeleteAvailableTimeApiResponse = NoResponseData;

export type AddAvailablePtTimeRequestBody = {
  applyAt: string;
  availableTimes: Omit<AvailablePtTime, "availableTimeId">[];
};
type AddAvailablePtTimeResponse = {
  applyAt: string;
  availableTimes: Omit<AvailablePtTime, "availableTimeId">[];
};
export type AddAvailablePtTimeApiResponse = ResponseBase<AddAvailablePtTimeResponse>;

export type AddTimeOffRequestBody = string[];
type AddTimeOffResponse = DayoffResponseInformation;
export type AddTimeOffApiResponse = ResponseBase<AddTimeOffResponse>;

export type GetDayOffResponse = DayoffResponseInformation[];

export type GetDayOffApiResponse = ResponseBase<GetDayOffResponse>;

export type DeleteTimeOffRequestPath = { dayOffId: number };
export type DeleteTimeOffRequestBody = TimeOffInformation;
export type DeleteTimeOffApiResponse = NoResponseData;

export type DayoffRequestBody = string[];
export type DayoffResponse = DayoffResponseInformation[];
export type GetDayoffApiResponse = ResponseBase<DayoffResponse>;
