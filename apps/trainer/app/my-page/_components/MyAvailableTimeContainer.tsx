"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { DaysOfWeek } from "@ui/utils/makeWeekSchedule";

import { myInformationQueries } from "@trainer/queries/myInformation";

import ScheduleInformation from "./ScheduleInformation";

export type SpanScheduleUnit = {
  availableTimeId: number;
  dayOfWeek: DaysOfWeek;
  isHoliday: boolean;
  startTime: string;
  endTime: string;
};

export type PTScheduleProps = {
  currentSchedules: SpanScheduleUnit[];
  scheduledChanges: {
    applyAt: string;
    schedules: SpanScheduleUnit[];
  }[];
};

export default function MyAvailableTimeContainer() {
  const { data: response } = useSuspenseQuery(myInformationQueries.ptAvailableTime());

  const { currentSchedules, scheduledChanges } = response;

  const AVAILABLE_PT_TIME: PTScheduleProps = {
    currentSchedules: currentSchedules ?? [],
    scheduledChanges: scheduledChanges ? [scheduledChanges] : [],
  };

  return <ScheduleInformation className="mt-[1.563rem]" ptSchedule={AVAILABLE_PT_TIME} />;
}
