"use client";

import { Gender, PreferredWorkout } from "@5unwan/core/api/types/common";
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

import BrandSpinner from "@user/components/BrandSpinner";

import RouteInstance from "@user/constants/routes";

import { useRegisterForm } from "../_hooks/useRegisterForm";
import { useUploadProfileImage } from "../_hooks/useUploadProfileImage";

const BasicInfoStep = dynamic(() => import("@ui/components/FunnelSteps/BasicInfoStep"), {
  ssr: false,
});
const WorkoutScheduleStep = dynamic(
  () => import("@user/components/FunnelSteps/WorkoutScheduleStep"),
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

  const { onSubmit, status } = useRegisterForm();
  const { uploadProfileImage } = useUploadProfileImage();
  const funnel = useFunnel<{
    basicInfo: BasicInfoStep;
    workoutSchedule: WorkoutScheduleStep;
    result: ResultStep;
    pushPermission: PushPermissionStep;
  }>({
    id: "register-user",
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
              history.push("workoutSchedule", {
                name,
                birthDate,
                gender,
                attachmentId: attachmentId!,
              });
            }}
          />
        )}
        workoutSchedule={({ history, context }) => (
          <WorkoutScheduleStep
            onPrev={() => history.back()}
            onSubmit={async (workoutSchedule) => {
              await onSubmit({
                ...context,
                workoutSchedule,
              });
              history.replace("result", {
                workoutSchedule,
              });
            }}
          />
        )}
        result={({ history }) => <ResultStep onNext={() => history.replace("pushPermission")} />}
        pushPermission={() => (
          <PushPermissionStep
            onNext={() => router.replace(RouteInstance["schedule-management"]())}
          />
        )}
      />
      <Sheet open={status === "pending"}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
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

type BasicInfoStep = {
  name?: string;
  birthDate?: string;
  gender?: Gender;
  attachmentId?: number;
  workoutSchedule?: Omit<PreferredWorkout, "workoutScheduleId">[];
};
export type WorkoutScheduleStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  attachmentId: number;
  workoutSchedule?: Omit<PreferredWorkout, "workoutScheduleId">[];
};
type ResultStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  attachmentId: number;
  workoutSchedule: Omit<PreferredWorkout, "workoutScheduleId">[];
};
type PushPermissionStep = {
  name: string;
  birthDate: string;
  gender: Gender;
  attachmentId: number;
  workoutSchedule: Omit<PreferredWorkout, "workoutScheduleId">[];
};
