"use client";

import { AvailablePtTime } from "@5unwan/core/api/types/common";
import { useFunnel } from "@use-funnel/browser";
import dynamic from "next/dynamic";

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
          onNext={(availablePtTime: AvailablePtTime[]) =>
            funnel.history.push("editScheduleApplyAt", { availablePtTime })
          }
        />
      );
    case "editScheduleApplyAt":
      return (
        <EditScheduleApplyAtStep
          onNext={(scheduleApplyAt: string) =>
            funnel.history.push("editScheduleConfirm", { scheduleApplyAt })
          }
        />
      );
    case "editScheduleConfirm":
      return <EditScheduleConfirmStep context={funnel.context} />;
  }
}

type EditScheduleStep = {
  scheduleApplyAt?: string;
  workoutSchedule?: AvailablePtTime[];
};

type EditScheduleApplyAtStep = {
  scheduleApplyAt?: string;
  availablePtTime?: AvailablePtTime[];
};

type EditScheduleConfirmStep = {
  scheduleApplyAt?: string;
  availablePtTime?: AvailablePtTime[];
};
