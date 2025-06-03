"use client";

import { DayOfWeek } from "@5unwan/core/api/types/common";
import { useQuery } from "@tanstack/react-query";
import Icon from "@ui/components/Icon";
import React, { useState } from "react";

import { myInformationQueries } from "@trainer/queries/myInformation";

import { DayoffResponseInformation } from "@trainer/services/types/myInformation.dto";

import { DAYS } from "@trainer/constants/Day";

import DeleteMyDayOffDialog from "./DeleteMyDayOffDialog";

const NoDayOff = 0;

export type RequestDayOffInformation = {
  dayOffId: number;
  dayOffDate: string;
  dayOfWeek: DayOfWeek;
};

export default function MyDayOffContainer() {
  const { data: response } = useQuery(myInformationQueries.dayOff());

  const [open, setOpen] = useState(false);
  const [deleteDayOffData, setDeleteDayOffData] = useState<RequestDayOffInformation | null>(null);

  const handleDeleteDayOff = (holiday: RequestDayOffInformation) => {
    setDeleteDayOffData(holiday);
    setOpen(true);
  };

  if (!response) return;

  const dayOffList = response?.data;

  if (dayOffList.length === NoDayOff) return;

  const holidayList: RequestDayOffInformation[] = dayOffList.map(
    (dayOff: DayoffResponseInformation) => {
      const dayOfWeek = getDayOfWeek(dayOff.dayOffDate);

      return {
        ...dayOff,
        dayOfWeek,
      };
    },
  );

  return (
    <section className="mt-[1.563rem] w-full">
      <p className="text-headline mb-[0.625rem]">휴무일</p>
      <section className="flex flex-col gap-1">
        {holidayList.map((holiday: RequestDayOffInformation) => (
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
      <DeleteMyDayOffDialog
        deleteDayOffData={deleteDayOffData}
        open={open}
        onOpenChange={setOpen}
      />
    </section>
  );
}

const getDayOfWeek = (dateString: string): DayOfWeek => {
  const date = new Date(dateString);
  const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

  return days[date.getDay()] as DayOfWeek;
};
