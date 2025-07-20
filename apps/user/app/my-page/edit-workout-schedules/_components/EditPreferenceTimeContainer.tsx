"use client";

import { PreferredWorkout } from "@5unwan/core/api/types/common";
import { useSuspenseQuery } from "@tanstack/react-query";
import WorkoutForm from "@ui/components/WorkoutForm";
import React, { useEffect, useState } from "react";

import { myInformationQueries } from "@user/queries/myInformation";

import SuccessEditPreferenceTimeBottomSheet from "./BottomSheet/SuccessEditPreferenceTimeBottomSheet";
import MyPagePending from "../../_components/MyPagePending";
import useEditPreferenceTimeMutation from "../_hooks/useEditPreferenceTimeMutation";

export default function EditPreferenceTimeContainer() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data: myInformation } = useSuspenseQuery(myInformationQueries.summary());

  const prevScheudle = myInformation?.data.workoutSchedules;

  const { editPreferenceTime, isSuccess, isPending } = useEditPreferenceTimeMutation();

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

    editPreferenceTime(requestBody);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsSheetOpen(true);
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-1 flex-col">
      <section className="mt-[0.625rem] text-center">
        <p className="text-body-1 text-text-sub2">PT 시간 : 50분</p>
        <p className="text-body-1 text-text-sub2 mb-[1.875rem]">PT 선택 시간은 시작 시간입니다.</p>
      </section>
      <WorkoutForm
        currentWorkout={prevScheudle}
        onSubmit={(editedData) => handleClickOnSubmit(editedData)}
      />
      <SuccessEditPreferenceTimeBottomSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
      {isPending && <MyPagePending />}
    </div>
  );
}
