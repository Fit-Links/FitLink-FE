"use client";

import { Gender, PreferredWorkout } from "@5unwan/core/api/types/common";
import BasicInfoStep from "@ui/components/FunnelSteps/BasicInfoStep";
import PhoneNumberStep from "@ui/components/FunnelSteps/PhoneNumberStep";
import WorkoutScheduleStep from "@ui/components/FunnelSteps/WorkoutScheduleStep";
import { useFunnel } from "@use-funnel/browser";

import ResultStep from "./ResultStep";

function RegisterFunnel() {
  const funnel = useFunnel<{
    basicInfo: BasicInfoStep;
    phoneNumber: PhoneNumberStep;
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
            funnel.history.push("phoneNumber", { name, birthDate, gender, profileUrl })
          }
        />
      );
    case "phoneNumber":
      return (
        <PhoneNumberStep
          onNext={(phoneNumber) => funnel.history.push("workoutSchedule", { phoneNumber })}
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
  phoneNumber?: string;
  workoutSchedule?: PreferredWorkout[];
};
type PhoneNumberStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  profileUrl: string;
  phoneNumber?: string;
  workoutSchedule?: PreferredWorkout[];
};
type WorkoutScheduleStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  profileUrl: string;
  phoneNumber: string;
  workoutSchedule?: PreferredWorkout[];
};
type ResultStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  profileUrl: string;
  phoneNumber: string;
  workoutSchedule: PreferredWorkout[];
};
