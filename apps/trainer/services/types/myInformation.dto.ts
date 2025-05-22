import { DayOfWeek, NoResponseData, ResponseBase } from "@5unwan/core/api/types/common";

export type TimeOffInformation = { dayOfWeek: DayOfWeek; dayOfTime: string };
export type DayOffInformation = {
  dayOffId: number;
  dayOffDate: string;
};

export type AvailablePtTimeEntry = {
  availableTimeId: number;
  dayOfWeek: DayOfWeek;
  isHoliday: boolean;
  startTime: string;
  endTime: string;
};
type MyInformationResponse = {
  name: string;
  birthDate: string;
  phoneNumber: string;
  profilePictureUrl: string;
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
  availableTimes: Omit<AvailablePtTimeEntry, "availableTimeId">[];
};
type AddAvailablePtTimeResponse = {
  applyAt: string;
  availableTimes: Omit<AvailablePtTimeEntry, "availableTimeId">[];
};
export type AddAvailablePtTimeApiResponse = ResponseBase<AddAvailablePtTimeResponse>;

export type AddTimeOffRequestBody = TimeOffInformation;
type AddTimeOffResponse = TimeOffInformation;
export type AddTimeOffApiResponse = ResponseBase<AddTimeOffResponse>;

export type GetDayOffResponse = DayOffInformation[];

export type GetDayOffApiResponse = ResponseBase<GetDayOffResponse>;

export type DeleteTimeOffRequestPath = { dayOffId: number };
export type DeleteTimeOffRequestBody = TimeOffInformation;
export type DeleteTimeOffApiResponse = NoResponseData;
