"use client";

import { AvailablePtTime, DayOfWeek } from "@5unwan/core/api/types/common";
import { Button } from "@ui/components/Button";
import DayOfWeekPicker from "@ui/components/DayOfWeekPicker";
import { Switch } from "@ui/components/Switch";
import { cn } from "@ui/lib/utils";
import React, { useState } from "react";

import Header from "@trainer/app/my-page/_components/Header";

import { formatAvailableScheduleToMeridiem } from "@trainer/utils/avaliableScheduleUtils";

import { Days } from "@trainer/types/Day";

import EditScheduleItem from "./EditScheduleItem";
import MerdiemTimePicker from "./MerdiemTimePicker";

type EditScheduleStepProps = {
  onNext: (workoutSchedule: AvailablePtTime[]) => void;
};

const WORKOUT_SCHEDULE_STRUCTURE = (day: number) => {
  return {
    availableTimeId: day,
    dayOfWeek: Days[day].toUpperCase() as DayOfWeek,
    isHoliday: false,
    startTime: "00:00",
    endTime: "23:00",
  };
};

export default function EditScheduleStep({ onNext }: EditScheduleStepProps) {
  const [openPicker, setOpenPicker] = useState<"startTime" | "endTime" | null>(null);
  const [workoutSchedule, setWorkoutSchedule] = useState<AvailablePtTime[]>(
    Array.from({ length: 7 }, (_, day) => WORKOUT_SCHEDULE_STRUCTURE(day)),
  );

  const [currentDay, setCurrentDay] = useState<Days>(Days.Sunday);

  const [completedDays, setCompletedDays] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleClickChangeDay = (day: number) => {
    setCurrentDay(day);
    setOpenPicker(null);
  };

  const handleClickOpenPicker = (picker: "startTime" | "endTime") => {
    if (openPicker === picker) {
      setOpenPicker(null);
    } else {
      setOpenPicker(picker);
    }
  };

  const handleClickHolidayToggle = (isHoliday: boolean) => {
    setWorkoutSchedule((prev) => {
      const newWorkoutSchedule = [...prev];
      newWorkoutSchedule[currentDay].isHoliday = isHoliday;

      return newWorkoutSchedule;
    });

    setCompletedDays((prev) => {
      const newCompletedDays = [...prev];
      newCompletedDays[currentDay] = isHoliday;

      return newCompletedDays;
    });
  };

  const handleChangeTime = (key: "startTime" | "endTime", time: string) => {
    setWorkoutSchedule((prev) => {
      const newWorkoutSchedule = [...prev];
      newWorkoutSchedule[currentDay][key] = time;

      return newWorkoutSchedule;
    });

    setOpenPicker(null);
  };

  return (
    <section className="bg-background-primary text-text-primary flex h-screen w-full flex-col justify-between px-4">
      <div>
        <Header title="PT 수업 시간" />

        <DayOfWeekPicker
          className="mt-[1.25rem] w-full"
          onCurrentDayChange={handleClickChangeDay}
          completed={completedDays}
        />

        <EditScheduleItem label="휴무일로 설정하기">
          <Switch
            checked={workoutSchedule[currentDay]?.isHoliday}
            onCheckedChange={handleClickHolidayToggle}
          />
        </EditScheduleItem>

        {!workoutSchedule[currentDay]?.isHoliday && (
          <>
            <EditScheduleItem label="시작 시간">
              <Button
                className={cn(
                  `h-[2.5rem] w-[6.813rem] text-center`,
                  openPicker !== "startTime" && "bg-background-sub3",
                )}
                onClick={() => handleClickOpenPicker("startTime")}
              >
                {formatAvailableScheduleToMeridiem(workoutSchedule[currentDay]?.startTime ?? "")}
              </Button>
              {openPicker === "startTime" && (
                <MerdiemTimePicker
                  time={workoutSchedule[currentDay]?.startTime ?? ""}
                  type="startTime"
                  onChangeTime={handleChangeTime}
                />
              )}
            </EditScheduleItem>

            <EditScheduleItem label="종료 시간">
              <Button
                className={cn(
                  `h-[2.5rem] w-[6.813rem] text-center`,
                  openPicker !== "endTime" && "bg-background-sub3",
                )}
                onClick={() => handleClickOpenPicker("endTime")}
              >
                {formatAvailableScheduleToMeridiem(workoutSchedule[currentDay]?.endTime ?? "")}
              </Button>
              {openPicker === "endTime" && (
                <MerdiemTimePicker
                  time={workoutSchedule[currentDay]?.endTime ?? ""}
                  type="endTime"
                  onChangeTime={handleChangeTime}
                />
              )}
            </EditScheduleItem>
          </>
        )}
      </div>

      <Button
        className="mb-[2.125rem] w-full"
        size="lg"
        variant="brand"
        onClick={() => onNext(workoutSchedule)}
      >
        다음
      </Button>
    </section>
  );
}
