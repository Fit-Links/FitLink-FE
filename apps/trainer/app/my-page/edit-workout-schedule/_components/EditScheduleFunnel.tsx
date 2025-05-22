"use client";

import { useFunnel } from "@use-funnel/browser";
import dynamic from "next/dynamic";

import { AvailablePtTimeEntry } from "@trainer/services/types/myInformation.dto";

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
          onNext={(availablePtTime: Omit<AvailablePtTimeEntry, "availableTimeId">[]) =>
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
  workoutSchedule?: Omit<AvailablePtTimeEntry, "availableTimeId">[];
};

type EditScheduleApplyAtStep = {
  scheduleApplyAt?: string;
  availablePtTime?: Omit<AvailablePtTimeEntry, "availableTimeId">[];
};

type EditScheduleConfirmStep = {
  scheduleApplyAt?: string;
  availablePtTime?: Omit<AvailablePtTimeEntry, "availableTimeId">[];
};
