"use client";
import { AvailablePtTime, Gender } from "@5unwan/core/api/types/common";
import BrandSpinner from "@ui/components/BrandSpinner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import { useFunnel } from "@use-funnel/browser";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import RouteInstance from "@trainer/constants/route";

import { useRegisterForm } from "../_hooks/useRegisterForm";
import { useUploadProfileImage } from "../_hooks/useUploadProfileImage";

const BasicInfoStep = dynamic(() => import("@ui/components/FunnelSteps/BasicInfoStep"), {
  ssr: false,
});
const TrainerScheduleStep = dynamic(
  () => import("@trainer/components/FunnelSteps/TrainerScheduleStep"),
  {
    ssr: false,
  },
);
const ResultStep = dynamic(() => import("./ResultStep"), {
  ssr: false,
});
const PushPermissionStep = dynamic(() => import("./PushPermissionStep"), {
  ssr: false,
});

function RegisterFunnel() {
  const router = useRouter();

  const { onSubmit, isPending: isRegisterPending } = useRegisterForm();
  const { uploadProfileImage } = useUploadProfileImage();
  const funnel = useFunnel<{
    basicInfo: BasicInfoStep;
    trainerSchedule: TrainerScheduleStep;
    result: ResultStep;
    pushPermission: PushPermissionStep;
  }>({
    id: "register-trainer",
    initial: {
      step: "basicInfo",
      context: {},
    },
  });

  return (
    <>
      <funnel.Render
        basicInfo={({ history }) => (
          <BasicInfoStep
            onPrev={() => {
              router.replace(RouteInstance.login());
            }}
            onNext={async (name, birthDate, gender, profileImage) => {
              const attachmentId = await uploadProfileImage(profileImage);
              history.push("trainerSchedule", {
                name,
                birthDate,
                gender,
                attachmentId: attachmentId!,
              });
            }}
          />
        )}
        trainerSchedule={({ history, context }) => (
          <TrainerScheduleStep
            onPrev={() => history.back()}
            onSubmit={async (availableTimes) => {
              await onSubmit({
                ...context,
                availableTimes,
              });
            }}
            onNext={(availableTimes) =>
              history.replace("result", {
                availableTimes,
              })
            }
          />
        )}
        result={({ history }) => <ResultStep onNext={() => history.replace("pushPermission")} />}
        pushPermission={() => (
          <PushPermissionStep
            onNext={() => router.replace(RouteInstance["schedule-management"]())}
          />
        )}
      />
      <Sheet open={isRegisterPending}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader>
            <SheetTitle>회원가입을 진행중입니다</SheetTitle>
            <SheetDescription>잠시만 기다려주세요</SheetDescription>
          </SheetHeader>
          <div className="flex items-center justify-center">
            <BrandSpinner />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default RegisterFunnel;

type AvailablePtTimeWithoutId = Omit<AvailablePtTime, "availableTimeId">;

type BasicInfoStep = {
  name?: string;
  birthDate?: string;
  gender?: Gender;
  attachmentId?: number;
  availableTimes?: AvailablePtTimeWithoutId[];
};
type TrainerScheduleStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  attachmentId: number;
  availableTimes?: AvailablePtTimeWithoutId[];
};
type ResultStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  attachmentId: number;
  availableTimes: AvailablePtTimeWithoutId[];
};
type PushPermissionStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  attachmentId: number;
  availableTimes: AvailablePtTimeWithoutId[];
};
