"use client";

import { DayOfWeek } from "@5unwan/core/api/types/common";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import Icon from "@ui/components/Icon";
import React from "react";

import { myInformationQueries } from "@trainer/queries/myInformation";

import { deleteTimeOff } from "@trainer/services/myInformation";
import { DeleteTimeOffRequestBody } from "@trainer/services/types/myInformation.dto";

import { DAYS } from "@trainer/constants/Day";

const NoDayOff = 0;

type DayOffInformation = {
  dayOffId: number;
  dayOffDate: string;
  dayOfWeek: string;
};

export default function MyDayOffContainer() {
  const queryClient = useQueryClient();
  const { data: response } = useSuspenseQuery(myInformationQueries.dayOff());

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: (params: {
      requestPath: { dayOffId: number };
      requestBody: DeleteTimeOffRequestBody;
    }) => deleteTimeOff(params.requestPath, params.requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myInformationQueries.dayOff().queryKey });
    },
  });

  const handleDeleteDayOff = (holiday: DayOffInformation) => {
    mutate(
      {
        requestPath: { dayOffId: holiday.dayOffId },
        requestBody: {
          dayOfWeek: holiday.dayOfWeek as DayOfWeek,
          dayOfTime: holiday.dayOffDate,
        },
      },
      {
        onSuccess: () => {
          // TODO:

          if (isSuccess) {
            console.log("성공적으로 삭제되었습니다.");
          }
        },
        onError: (error) => {
          if (isError) {
            console.error("삭제 중 오류가 발생했습니다:", error);
          }
        },
      },
    );
  };

  const dayOffList = response.data;

  if (dayOffList.length === NoDayOff) return;

  const holidayList = dayOffList.map((dayOff) => {
    const dayOfWeek = getDayOfWeek(dayOff.dayOffDate);

    return {
      ...dayOff,
      dayOfWeek,
    };
  });

  return (
    <section className="mt-[1.563rem] w-full">
      <p className="text-headline mb-[0.625rem]">휴무일</p>
      <section className="flex flex-col gap-1">
        {holidayList.map((holiday) => (
          <div
            key={`holiday-${holiday.dayOffId}`}
            className="bg-background-sub1 text-text-primary flex h-[3.375rem] w-full items-center justify-between rounded-lg px-[0.9375rem]"
          >
            <span>
              {holiday.dayOffDate} {DAYS[holiday.dayOfWeek as keyof typeof DAYS]}
            </span>
            <Icon
              name="X"
              size="lg"
              className="cursor-pointer"
              onClick={() => handleDeleteDayOff(holiday)}
            />
          </div>
        ))}
      </section>
    </section>
  );
}

const getDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString);
  const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

  return days[date.getDay()];
};
