"use client";

import { AvailablePtTime } from "@5unwan/core/api/types/common";
import { useFunnel } from "@use-funnel/browser";
import dynamic from "next/dynamic";

const BACK_FUNNEL_STEP_COUNT = -3;

const EditScheduleStep = dynamic(() => import("./EditScheduleStep"), {
  ssr: false,
});

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
        <EditScheduleStep
          onPrev={() => funnel.history.back()}
          onNext={(availableTimes) =>
            funnel.history.push("editScheduleApplyAt", {
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
        <EditScheduleConfirmStep
          onPrev={() => funnel.history.back()}
          context={funnel.context}
          onNext={() => {
            funnel.history.go(BACK_FUNNEL_STEP_COUNT);
          }}
        />
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
