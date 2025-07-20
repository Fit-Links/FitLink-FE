"use client";

import { AvailablePtTime } from "@5unwan/core/api/types/common";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import Header from "@ui/components/Header";
import React from "react";

import MyPagePending from "@trainer/app/my-page/_components/MyPagePending";
import { myInformationQueries } from "@trainer/queries/myInformation";

import { formatAvailableScheduleConfirm } from "@trainer/utils/avaliableScheduleUtils";

import ScheduleChangeResultSheet from "./ScheduleChangeResultSheet";
import useAddScheduleMutation from "../../_hooks/useAddScheduleMutation";
import useDeleteScheduleMutation from "../../_hooks/useDeleteScheduleMutation";

type EditScheduleConfirmStepProps = {
  onPrev: () => void;
  context: {
    applyAt: string;
    availableTimes: Omit<AvailablePtTime, "availableTimeId">[];
  };
};
export default function EditScheduleConfirmStep({ onPrev, context }: EditScheduleConfirmStepProps) {
  const queryClient = useQueryClient();
  const { data: currentData } = useQuery(myInformationQueries.ptAvailableTime());

  const { applyAt, availableTimes } = context;

  availableTimes.forEach((time) => {
    if (!time.startTime) {
      time.startTime = "00:00";
    }
    if (!time.endTime) {
      time.endTime = "23:00";
    }
  });

  const changeApplyAt = applyAt;

  const previousChangeApplyAt = currentData?.data.scheduledChanges?.applyAt;

  const { deleteSchedule: deleteAvailablePtTimeMutate } = useDeleteScheduleMutation();

  const { addSchedule: addAvailablePtTimeMutate, isPending } = useAddScheduleMutation();

  const handleClickChangeSchedule = async () => {
    if (previousChangeApplyAt) {
      await deleteAvailablePtTimeMutate({ applyAt: previousChangeApplyAt });
    }
    await addAvailablePtTimeMutate({
      applyAt: changeApplyAt as string,
      availableTimes: availableTimes,
    });

    await queryClient.invalidateQueries(myInformationQueries.ptAvailableTime());
  };

  return (
    <>
      <Header>
        <Header.Back onClick={onPrev} />
        <Header.Title content="PT 수업 시간" />
      </Header>
      <div className="flex w-full flex-1 flex-col">
        <p className="text-body-1 text-text-sub2 mt-[0.625rem] text-center">
          변경하고 싶은 시간이 맞는지 확인해주세요
        </p>

        <div className="bg-background-sub2 mt-[3.25rem] min-h-[3rem] w-full rounded-lg py-[1.25rem] text-center">
          <p className="text-subhead-1 text-text-primary">
            {availableTimes?.map((time) => (
              <p key={time.dayOfWeek}>{formatAvailableScheduleConfirm(time)}</p>
            ))}
          </p>
        </div>
      </div>
      <ScheduleChangeResultSheet scheduleApplyAt={applyAt}>
        <Button className="w-full" size="lg" variant="brand" onClick={handleClickChangeSchedule}>
          변경
        </Button>
      </ScheduleChangeResultSheet>
      {isPending && <MyPagePending />}
    </>
  );
}
