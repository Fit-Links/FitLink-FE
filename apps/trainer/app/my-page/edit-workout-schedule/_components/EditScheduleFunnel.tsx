"use client";

import { AvailablePtTime } from "@5unwan/core/api/types/common";
import { useFunnel } from "@use-funnel/browser";
import dynamic from "next/dynamic";

const TrainerScheduleStep = dynamic(
  () => import("@trainer/components/FunnelSteps/TrainerScheduleStep"),
  {
    ssr: false,
  },
);

const EditScheduleApplyAtStep = dynamic(() => import("./EditScheduleApplyAtStep"), {
  ssr: false,
});

const EditScheduleConfirmStep = dynamic(() => import("./EditScheduleConfirmStep"), {
  ssr: false,
});

export default function EditScheduleFunnel() {
  const funnel = useFunnel<{
    editSchedule: EditScheduleStep;
    editScheduleApplyAt: EditScheduleApplyAtStep;
    editScheduleConfirm: EditScheduleConfirmStep;
  }>({
    id: "edit-schedule",
    initial: {
      step: "editSchedule",
      context: {},
    },
  });

  switch (funnel.step) {
    case "editSchedule":
      return (
        <TrainerScheduleStep
          onPrev={() => funnel.history.back()}
          onNext={(availableTimes) =>
            funnel.history.replace("editScheduleApplyAt", {
              availableTimes,
            })
          }
        />
      );
    case "editScheduleApplyAt":
      return (
        <EditScheduleApplyAtStep
          onPrev={() => funnel.history.back()}
          onNext={(applyAt) => funnel.history.push("editScheduleConfirm", { applyAt })}
        />
      );
    case "editScheduleConfirm":
      return (
        <EditScheduleConfirmStep onPrev={() => funnel.history.back()} context={funnel.context} />
      );
  }
}

type AvailablePtTimeWithoutId = Omit<AvailablePtTime, "availableTimeId">;

type EditScheduleStep = {
  applyAt?: string;
  availableTimes?: AvailablePtTimeWithoutId[];
};

type EditScheduleApplyAtStep = {
  applyAt?: string;
  availableTimes: AvailablePtTimeWithoutId[];
};

type EditScheduleConfirmStep = {
  applyAt: string;
  availableTimes: AvailablePtTimeWithoutId[];
};
