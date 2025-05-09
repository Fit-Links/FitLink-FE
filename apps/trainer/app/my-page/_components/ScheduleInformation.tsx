"use client";
import { cn } from "@ui/lib/utils";
import React from "react";

import PTSchedule from "@trainer/components/PTSchedule";

import { PTScheduleProps } from "./MyAvailableTimeContainer";

type ScheduleInformationProps = {
  className?: string;
  ptSchedule: PTScheduleProps;
};

export default function ScheduleInformation({ className, ptSchedule }: ScheduleInformationProps) {
  return (
    <section className={cn("mt-[1.563rem] w-full ", className)}>
      <p className="text-headline mb-[0.625rem]">PT 수업 시간</p>
      <PTSchedule
        currentSchedules={ptSchedule.currentSchedules}
        scheduledChanges={ptSchedule.scheduledChanges}
      />
    </section>
  );
}
