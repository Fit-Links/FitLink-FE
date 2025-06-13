"use client";

import { Gender, PreferredWorkout } from "@5unwan/core/api/types/common";
import { useFunnel } from "@use-funnel/browser";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

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

  const { onSubmit } = useRegisterForm();
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
      workoutSchedule={({ history }) => (
        <WorkoutScheduleStep
          onPrev={() => history.back()}
          onSubmit={onSubmit}
          onNext={(workoutSchedule) =>
            history.replace("result", {
              workoutSchedule,
            })
          }
        />
      )}
      result={({ history, context }) => (
        <ResultStep form={context} onNext={() => history.replace("pushPermission")} />
      )}
      pushPermission={() => (
        <PushPermissionStep onNext={() => router.replace(RouteInstance["schedule-management"]())} />
      )}
    />
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
type WorkoutScheduleStep = {
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
