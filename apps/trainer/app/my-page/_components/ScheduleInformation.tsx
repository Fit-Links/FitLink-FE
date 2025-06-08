"use client";

import { cn } from "@ui/lib/utils";
import React, { useState } from "react";

import PTSchedule from "@trainer/components/PTSchedule";

import DeleteScheduleBottomSheet from "./DeleteScheduleBottomSheet";
import EditScheduleBottomSheet from "./EditScheduleBottomSheet";
import { PTScheduleProps } from "./MyAvailableTimeContainer";

type ScheduleInformationProps = {
  className?: string;
  ptSchedule: PTScheduleProps;
};

export default function ScheduleInformation({ className, ptSchedule }: ScheduleInformationProps) {
  const [isEditScheduleOpen, setIsEditScheduleOpen] = useState(false);
  const [isDeleteScheduleOpen, setIsDeleteScheduleOpen] = useState(false);

  const handleClickCurrentScheduleSheetOpen = () => {
    setIsEditScheduleOpen(true);
  };

  const handleClickChangeScheduleSheetOpen = () => {
    setIsDeleteScheduleOpen(true);
  };

  return (
    <section className={cn("mt-[1.563rem] w-full ", className)}>
      <p className="text-headline mb-[0.625rem]">PT 수업 시간</p>
      <EditScheduleBottomSheet open={isEditScheduleOpen} onOpenChange={setIsEditScheduleOpen} />
      <DeleteScheduleBottomSheet
        open={isDeleteScheduleOpen}
        onOpenChange={setIsDeleteScheduleOpen}
      />
      <PTSchedule
        currentSchedules={ptSchedule.currentSchedules}
        scheduledChanges={ptSchedule.scheduledChanges}
        onClickCurrentEllipsis={handleClickCurrentScheduleSheetOpen}
        onClickChangeEllipsis={handleClickChangeScheduleSheetOpen}
      />
    </section>
  );
}
