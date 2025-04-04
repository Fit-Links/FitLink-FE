import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@ui/components/Dropdown";
import { cn } from "@ui/lib/utils";
import React from "react";

import { MyInformationApiResponse } from "@user/services/types/myInformation.dto";

interface ScheduleInformationProps {
  className?: string;
  title: string;
  schedules?: MyInformationApiResponse["data"]["workoutSchedules"];
}

export default function ScheduleInformationItem({
  className,
  title,
  schedules,
}: ScheduleInformationProps) {
  return (
    <section className={cn("flex h-auto flex-col", className)}>
      <Dropdown className="w-full">
        <DropdownTrigger>
          <div className="text-headline">{title}</div>
        </DropdownTrigger>
        <DropdownContent>
          {/* 
          TODO:
          Schedule이 들어오면 일정 출력
          */}
          {schedules?.map((schedule) => (
            <DropdownItem key={schedule.workoutScheduleId}>
              {schedule.workoutScheduleId}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    </section>
  );
}
