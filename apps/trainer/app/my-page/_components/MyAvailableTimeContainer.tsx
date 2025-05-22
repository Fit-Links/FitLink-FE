"use client";

import { useQuery } from "@tanstack/react-query";
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
  const { data: response } = useQuery(myInformationQueries.ptAvailableTime());

  if (!response) return;

  const availablePtTimeData = response.data;

  const AVAILABLE_PT_TIME: PTScheduleProps = {
    currentSchedules: availablePtTimeData?.currentSchedules
      ? availablePtTimeData.currentSchedules.schedules
      : [],
    scheduledChanges: availablePtTimeData?.scheduledChanges
      ? [availablePtTimeData.scheduledChanges]
      : [],
  };

  return <ScheduleInformation className="mt-[1.563rem]" ptSchedule={AVAILABLE_PT_TIME} />;
}
