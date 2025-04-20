"use client";

import { AvailablePtTime, Gender } from "@5unwan/core/api/types/common";
import { useFunnel } from "@use-funnel/browser";
import dynamic from "next/dynamic";

import { useSaveTokenFromSearchParams } from "../_hooks/useSaveTokenFromSearchParams";

const BasicInfoStep = dynamic(() => import("@ui/components/FunnelSteps/BasicInfoStep"), {
  ssr: false,
});
const PhoneNumberStep = dynamic(() => import("@ui/components/FunnelSteps/PhoneNumberStep"), {
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
  useSaveTokenFromSearchParams();

  const funnel = useFunnel<{
    basicInfo: BasicInfoStep;
    phoneNumber: PhoneNumberStep;
    availableTimes: TrainerScheduleStep;
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
          onNext={(phoneNumber) => funnel.history.push("availableTimes", { phoneNumber })}
        />
      );
    case "availableTimes":
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
  phoneNumber?: string;
  availableTimes?: AvailablePtTimeWithoutId[];
};
type PhoneNumberStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  profileUrl: string;
  phoneNumber?: string;
  availableTimes?: AvailablePtTimeWithoutId[];
};
type TrainerScheduleStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  profileUrl: string;
  phoneNumber: string;
  availableTimes?: AvailablePtTimeWithoutId[];
};
type ResultStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  profileUrl: string;
  phoneNumber: string;
  availableTimes: AvailablePtTimeWithoutId[];
};
