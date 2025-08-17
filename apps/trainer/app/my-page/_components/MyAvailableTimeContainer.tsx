"use client";

import { AvailablePtTime, DayOfWeek } from "@5unwan/core/api/types/common";
import { useSuspenseQuery } from "@tanstack/react-query";

import { myInformationQueries } from "@trainer/queries/myInformation";

import ScheduleInformation from "./ScheduleInformation";

export type SpanScheduleUnit = {
  availableTimeId: number;
  dayOfWeek: DayOfWeek;
  isHoliday: boolean;
  startTime: string;
  endTime: string;
};

export type PTScheduleProps = {
  currentSchedules: AvailablePtTime[];
  scheduledChanges: {
    applyAt: string;
    schedules: AvailablePtTime[];
  }[];
};

export default function MyAvailableTimeContainer() {
  const { data: response } = useSuspenseQuery(myInformationQueries.ptAvailableTime());

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
