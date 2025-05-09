"use client";

import { AvailablePtTime, Gender } from "@5unwan/core/api/types/common";
import { useFunnel } from "@use-funnel/browser";
import dynamic from "next/dynamic";

const BasicInfoStep = dynamic(() => import("@ui/components/FunnelSteps/BasicInfoStep"), {
  ssr: false,
});
const TrainerScheduleStep = dynamic(
  () => import("@ui/components/FunnelSteps/TrainerScheduleStep"),
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
    trainerSchedule: TrainerScheduleStep;
    result: ResultStep;
  }>({
    id: "register-trainer",
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
            funnel.history.push("trainerSchedule", { name, birthDate, gender, profileUrl })
          }
        />
      );
    case "trainerSchedule":
      return (
        <TrainerScheduleStep
          onNext={(availableTimes) =>
            funnel.history.replace("result", {
              availableTimes,
            })
          }
        />
      );
    case "result":
      return <ResultStep form={funnel.context} />;
  }
}

export default RegisterFunnel;

type AvailablePtTimeWithoutId = Omit<AvailablePtTime, "availableTimeId">;

type BasicInfoStep = {
  name?: string;
  birthDate?: string;
  gender?: Gender;
  profileUrl?: string;
  availableTimes?: AvailablePtTimeWithoutId[];
};
type TrainerScheduleStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  profileUrl: string;
  availableTimes?: AvailablePtTimeWithoutId[];
};
type ResultStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  profileUrl: string;
  availableTimes: AvailablePtTimeWithoutId[];
};
