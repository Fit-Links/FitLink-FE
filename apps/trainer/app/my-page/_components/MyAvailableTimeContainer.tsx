"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { DaysOfWeek } from "@ui/utils/makeWeekSchedule";

import { myInformationQueries } from "@trainer/queries/myInformation";

import { AvailablePtTimeEntry } from "@trainer/services/types/myInformation.dto";

import ScheduleInformation from "./ScheduleInformation";

export type SpanScheduleUnit = {
  availableTimeId: number;
  dayOfWeek: DaysOfWeek;
  isHoliday: boolean;
  startTime: string;
  endTime: string;
};

export type PTScheduleProps = {
  currentSchedules: AvailablePtTimeEntry[];
  scheduledChanges: {
    applyAt: string;
    schedules: AvailablePtTimeEntry[];
  }[];
};

export default function MyAvailableTimeContainer() {
  const { data: response } = useSuspenseQuery(myInformationQueries.ptAvailableTime());

  const AVAILABLE_PT_TIME: PTScheduleProps = {
    currentSchedules: response.currentSchedules ? response.currentSchedules.schedules : [],
    scheduledChanges: response.scheduledChanges ? [response.scheduledChanges] : [],
  };

  return <ScheduleInformation className="mt-[1.563rem]" ptSchedule={AVAILABLE_PT_TIME} />;
}
