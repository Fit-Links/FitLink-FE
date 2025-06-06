"use client";

import { Gender, PreferredWorkout } from "@5unwan/core/api/types/common";
import { useMutation } from "@tanstack/react-query";
import { useFunnel } from "@use-funnel/browser";
import dynamic from "next/dynamic";

import { uploadImage } from "@user/services/attachment";
import { createPresignedUrl } from "@user/services/attachment";

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

  const createPresignedUrlMutation = useMutation({
    mutationFn: createPresignedUrl,
  });
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
  });

  const handleUploadProfileImage = async (imageFile: File) => {
    try {
      const {
        data: { presignedUrl, attachmentId },
        status: createPresignedUrlStatus,
        success: createPresignedUrlSuccess,
        msg: createPresignedUrlMsg,
      } = await createPresignedUrlMutation.mutateAsync({
        fileName: imageFile.name,
        contentLength: imageFile.size.toString(),
        contentType: imageFile.type,
      });

      if (!createPresignedUrlSuccess)
        throw new Error(
          `Error occured during createPresignedUrl\nStatus:${createPresignedUrlStatus}\nMessage:${createPresignedUrlMsg}`,
        );

      await uploadImageMutation.mutateAsync({
        presignedUrl,
        imageFile,
      });

      return attachmentId;
    } catch {
      //TODO: 에러 처리 로직 추가
    }
  };
  switch (funnel.step) {
    case "basicInfo":
      return (
        <BasicInfoStep
          onNext={async (name, birthDate, gender, profileImage) => {
            const attachmentId = await handleUploadProfileImage(profileImage);
            funnel.history.push("workoutSchedule", {
              name,
              birthDate,
              gender,
              attachmentId: attachmentId!,
            });
          }}
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
