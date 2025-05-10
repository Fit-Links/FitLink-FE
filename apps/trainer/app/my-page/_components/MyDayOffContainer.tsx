"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Icon from "@ui/components/Icon";
import React from "react";

import { myInformationQueries } from "@trainer/queries/myInformation";

import { DAYS } from "@trainer/constants/Day";

const NoDayOff = 0;

export default function MyDayOffContainer() {
  const { data: response } = useSuspenseQuery(myInformationQueries.dayOff());

  const dayOffList = response.data;

  if (dayOffList.length === NoDayOff) return;

  const holidayList = dayOffList.map((dayOff) => {
    const dayOfWeek = getDayOfWeek(dayOff.dayOffDate);

    return {
      ...dayOff,
      dayOfWeek,
    };
  });

  //   const { mutate } = useMutation({
  //     mutationFn: deleteTimeOff,
  //   });

  //   const handleDeleteDayOff = (dayOff: string) => {
  //     mutate({ dayOffId });
  //   };

  return (
    <section className="mt-[1.563rem] w-full">
      <p className="text-headline mb-[0.625rem]">휴무일</p>
      <section className="flex flex-col gap-1">
        {holidayList.map(({ dayOfWeek, dayOffDate }) => (
          <div className="bg-background-sub1 text-text-primary flex h-[3.375rem] w-full items-center justify-between rounded-lg px-[0.9375rem]">
            <span>
              {dayOffDate} {DAYS[dayOfWeek as keyof typeof DAYS]}
            </span>
            <Icon name="X" size="lg" className="cursor-pointer" />
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
