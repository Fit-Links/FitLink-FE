"use client";

import { AvailablePtTime } from "@5unwan/core/api/types/common";
import { useQuery } from "@tanstack/react-query";
import BrandSpinner from "@ui/components/BrandSpinner";

import { myInformationQueries } from "@trainer/queries/myInformation";

import TrainerScheduleStep from "@trainer/components/FunnelSteps/TrainerScheduleStep";

type AvailablePtTimeWithoutId = Omit<AvailablePtTime, "availableTimeId">[];
type EditScheduleStepProps = {
  onPrev: () => void;
  onNext?: (availablePtTimes: AvailablePtTimeWithoutId) => void;
  onSubmit?: (availablePtTimes: AvailablePtTimeWithoutId) => Promise<void>;
};
function EditScheduleStep({ ...props }: EditScheduleStepProps) {
  const { data, isError, isPending } = useQuery(myInformationQueries.ptAvailableTime());

  if (isPending) return <BrandSpinner />;
  if (isError) {
    return <TrainerScheduleStep {...props} />;
  }

  const {
    currentSchedules: { schedules },
  } = data.data;

  return <TrainerScheduleStep {...props} currentSchedule={schedules} />;
}

export default EditScheduleStep;
