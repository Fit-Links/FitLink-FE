"use client";

import { PreferredWorkout } from "@5unwan/core/api/types/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import WorkoutForm from "@ui/components/WorkoutForm";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { myInformationQueries } from "@user/queries/myInformation";

import { editPreferredTime } from "@user/services/myInformation";

import SuccessEditPreferenceTimeBottomSheet from "./BottomSheet/SuccessEditPreferenceTimeBottomSheet";
import Header from "../../_components/Header";

export default function EditPreferenceTimeContainer() {
  const queryClient = useQueryClient();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data: myInformation, isSuccess } = useQuery(myInformationQueries.summary());

  const prevScheudle = myInformation?.data.workoutSchedules;

  const { mutate } = useMutation({
    mutationFn: editPreferredTime,
    onSuccess: () => {
      if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: myInformationQueries.summary().queryKey });
        setIsSheetOpen(true);
      }
    },
    onError: (error) => {
      toast.error("요청에 실패했습니다. 다시 시도해주세요!");
      throw error;
    },
  });

  const handleClickOnSubmit = (editedData: Omit<PreferredWorkout, "workoutScheduleId">[]) => {
    const requestBody = editedData
      .map((data) => ({
        ...data,
        workoutScheduleId: prevScheudle?.find((schedule) => schedule.dayOfWeek === data.dayOfWeek)
          ?.workoutScheduleId,
      }))
      .filter((data): data is PreferredWorkout => data.workoutScheduleId !== undefined)
      .map((data) => ({
        ...data,
        workoutScheduleId: String(data.workoutScheduleId),
      })) as (PreferredWorkout & { workoutScheduleId: string })[];

    mutate(requestBody);
  };

  return (
    <div className="flex h-full flex-col pb-[1.5625rem]">
      <Header title="PT 희망 시간" />

      <section className="mt-[0.625rem] text-center">
        <p className="text-body-1 text-text-sub2">PT 시간 : 50분</p>
        <p className="text-body-1 text-text-sub2">PT 선택 시간은 시작 시간입니다.</p>
      </section>

      <WorkoutForm onSubmit={(editedData) => handleClickOnSubmit(editedData)} />
      <SuccessEditPreferenceTimeBottomSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </div>
  );
}
