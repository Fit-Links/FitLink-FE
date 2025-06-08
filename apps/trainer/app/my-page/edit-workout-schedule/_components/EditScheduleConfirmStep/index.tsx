"use client";

import { AvailablePtTime } from "@5unwan/core/api/types/common";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import React from "react";

import MyPagePending from "@trainer/app/my-page/_components/MyPagePending";
import { myInformationQueries } from "@trainer/queries/myInformation";

import { formatAvailableScheduleConfirm } from "@trainer/utils/avaliableScheduleUtils";

import ScheduleChangeResultSheet from "./ScheduleChangeResultSheet";
import Header from "../../../_components/Header";
import useAddScheduleMutation from "../../_hooks/useAddScheduleMutation";
import useDeleteScheduleMutation from "../../_hooks/useDeleteScheduleMutation";

type EditScheduleConfirmStepProps = {
  context: {
    applyAt: string;
    availableTimes: Omit<AvailablePtTime, "availableTimeId">[];
  };
};
export default function EditScheduleConfirmStep({ context }: EditScheduleConfirmStepProps) {
  const queryClient = useQueryClient();
  const { data: currentData } = useQuery(myInformationQueries.ptAvailableTime());

  const { applyAt, availableTimes } = context;

  const currentApplyAt = currentData?.data.currentSchedules?.applyAt;

  const changeApplyAt = applyAt;

  const previousChangeApplyAt = currentData?.data.scheduledChanges?.applyAt;

  const deleteTargetApplyAt =
    currentApplyAt === changeApplyAt ? currentApplyAt : previousChangeApplyAt;

  const { deleteSchedule: deleteAvailablePtTimeMutate } = useDeleteScheduleMutation();

  const { addSchedule: addAvailablePtTimeMutate, isPending } = useAddScheduleMutation();

  const handleClickChangeSchedule = async () => {
    if (deleteTargetApplyAt) {
      await deleteAvailablePtTimeMutate();
    }
    await addAvailablePtTimeMutate({
      applyAt: changeApplyAt as string,
      availableTimes: availableTimes,
    });

    await queryClient.invalidateQueries(myInformationQueries.ptAvailableTime());
  };

  return (
    <section className="bg-background-primary text-text-primary flex h-full w-full flex-col justify-between">
      <div className="w-full text-center">
        <Header title="PT 수업 시간" />
        <p className="text-body-1 text-text-sub2 mt-[0.625rem]">
          변경하고 싶은 시간이 맞는지 확인해주세요
        </p>

        <div className="bg-background-sub2 mt-[3.25rem] min-h-[3rem] w-full rounded-lg py-[1.25rem]">
          <p className="text-subhead-1 text-text-primary">
            {availableTimes?.map((time) => (
              <p key={time.dayOfWeek}>{formatAvailableScheduleConfirm(time)}</p>
            ))}
          </p>
        </div>
      </div>
      <ScheduleChangeResultSheet scheduleApplyAt={applyAt}>
        <Button
          className="mb-[2.125rem] w-full"
          size="lg"
          variant="brand"
          onClick={handleClickChangeSchedule}
        >
          변경
        </Button>
      </ScheduleChangeResultSheet>
      {isPending && <MyPagePending />}
    </section>
  );
}
