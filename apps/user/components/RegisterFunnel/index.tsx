"use client";

import { Gender, PreferredWorkout } from "@5unwan/core/api/types/common";
import BasicInfoStep from "@ui/components/FunnelSteps/BasicInfoStep";
import PhoneNumberStep from "@ui/components/FunnelSteps/PhoneNumberStep";
import WorkoutScheduleStep from "@ui/components/FunnelSteps/WorkoutScheduleStep";
import { useFunnel } from "@use-funnel/browser";

function RegisterFunnel() {
  const funnel = useFunnel<{
    basicInfoStep: BasicInfoStep;
    phoneNumberStep: PhoneNumberStep;
    workoutScheduleStep: WorkoutScheduleStep;
  }>({
    id: "register-user",
    initial: {
      step: "basicInfoStep",
      context: {},
    },
  });

  switch (funnel.step) {
    case "basicInfoStep":
      return (
        <BasicInfoStep
          onNext={(name, birthDate, gender, profileUrl) =>
            funnel.history.push("phoneNumberStep", { name, birthDate, gender, profileUrl })
          }
        />
      );
    case "phoneNumberStep":
      return (
        <PhoneNumberStep
          onNext={(phoneNumber) => funnel.history.push("workoutScheduleStep", { phoneNumber })}
        />
      );
    case "workoutScheduleStep":
      return <WorkoutScheduleStep />;
  }
}

export default RegisterFunnel;

type BasicInfoStep = {
  name?: string;
  birthDate?: string;
  gender?: Gender;
  profileUrl?: string;
  phoneNumber?: string;
  workoutSchedule?: PreferredWorkout;
};
type PhoneNumberStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  profileUrl: string;
  phoneNumber?: string;
  workoutSchedule?: PreferredWorkout;
};
type WorkoutScheduleStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  profileUrl: string;
  phoneNumber: string;
  workoutSchedule?: PreferredWorkout;
};
