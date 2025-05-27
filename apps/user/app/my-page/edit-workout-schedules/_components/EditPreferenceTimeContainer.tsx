"use client";

import { PreferredWorkout } from "@5unwan/core/api/types/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import WorkoutForm from "@ui/components/WorkoutForm";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { myInformationQueries } from "@user/queries/myInformation";

import { editPreferredTime } from "@user/services/myInformation";

import RouteInstance from "@user/constants/routes";

import SuccessEditPreferenceTimeBottomSheet from "./BottomSheet/SuccessEditPreferenceTimeBottomSheet";
import Header from "../../_components/Header";

export default function EditPreferenceTimeContainer() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data: myInformation } = useQuery(myInformationQueries.summary());

  const prevScheudle = myInformation?.data.workoutSchedules;

  const { mutate } = useMutation({
    mutationFn: editPreferredTime,
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

    setIsSheetOpen(true);

    mutate(requestBody, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: myInformationQueries.summary().queryKey });
        router.push(RouteInstance["my-page"]());
      },
    });
  };

  return (
    <div>
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
