"use client";

import { Gender, PreferredWorkout } from "@5unwan/core/api/types/common";
import { useFunnel } from "@use-funnel/browser";
import dynamic from "next/dynamic";

const BasicInfoStep = dynamic(() => import("@ui/components/FunnelSteps/BasicInfoStep"), {
  ssr: false,
});
const WorkoutScheduleStep = dynamic(
  () => import("@ui/components/FunnelSteps/WorkoutScheduleStep"),
  {
    ssr: false,
  },
);
const ResultStep = dynamic(() => import("./ResultStep"), {
  ssr: false,
});

function RegisterFunnel() {
  const funnel = useFunnel<{
    basicInfo: BasicInfoStep;
    workoutSchedule: WorkoutScheduleStep;
    result: ResultStep;
  }>({
    id: "register-user",
    initial: {
      step: "basicInfo",
      context: {},
    },
  });

  switch (funnel.step) {
    case "basicInfo":
      return (
        <BasicInfoStep
          onNext={(name, birthDate, gender, profileUrl) =>
            funnel.history.push("workoutSchedule", { name, birthDate, gender, profileUrl })
          }
        />
      );
    case "workoutSchedule":
      return (
        <WorkoutScheduleStep
          onNext={(workoutSchedule) =>
            funnel.history.replace("result", {
              workoutSchedule,
            })
          }
        />
      );
    case "result":
      return <ResultStep form={funnel.context} />;
  }
}

export default RegisterFunnel;

type BasicInfoStep = {
  name?: string;
  birthDate?: string;
  gender?: Gender;
  profileUrl?: string;
  workoutSchedule?: Omit<PreferredWorkout, "workoutScheduleId">[];
};
type WorkoutScheduleStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  profileUrl: string;
  workoutSchedule?: Omit<PreferredWorkout, "workoutScheduleId">[];
};
type ResultStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  profileUrl: string;
  workoutSchedule: Omit<PreferredWorkout, "workoutScheduleId">[];
};
