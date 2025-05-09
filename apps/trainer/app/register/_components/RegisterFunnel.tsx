"use client";

import { AvailablePtTime, Gender } from "@5unwan/core/api/types/common";
import { useMutation } from "@tanstack/react-query";
import { useFunnel } from "@use-funnel/browser";
import dynamic from "next/dynamic";

import { registerUserProfileImage, uploadImage } from "@trainer/services/attachment";
import { createPresignedUrl } from "@trainer/services/attachment";

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

  const createPresignedUrlMutation = useMutation({
    mutationFn: createPresignedUrl,
  });
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
  });
  const registerUserProfileImageMutation = useMutation({
    mutationFn: registerUserProfileImage,
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

      const {
        status: registerUserProfileImageStatus,
        success: registerUserProfileImageSuccess,
        msg: registerUserProfileImageMsg,
      } = await registerUserProfileImageMutation.mutateAsync({
        attachmentId,
      });

      if (!registerUserProfileImageSuccess)
        throw new Error(
          `Error occured during createPresignedUrl\nStatus:${registerUserProfileImageStatus}\nMessage:${registerUserProfileImageMsg}`,
        );

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
            funnel.history.push("trainerSchedule", {
              name,
              birthDate,
              gender,
              attachmentId: attachmentId!,
            });
          }}
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
