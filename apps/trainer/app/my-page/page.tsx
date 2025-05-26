import { DaysOfWeek } from "@ui/utils/makeWeekSchedule";
import React from "react";

import RouteInstance from "@trainer/constants/route";

import MyPageHeader from "./_components/MyPageHeader";
import ProfileItemForRouting from "./_components/ProfileItemForRouting";
import ScheduleInformation from "./_components/ScheduleInformation";

export type SpanScheduleUnit = {
  dayOfWeek: DaysOfWeek;
  isHoliday: boolean;
  startTime: string;
  endTime: string;
};

export type PTScheduleProps = {
  currentSchedules: SpanScheduleUnit[];
  scheduleChanges: {
    applyAt: string;
    schedules: SpanScheduleUnit[];
  }[];
};

const MOCK = {
  memberId: 1,
  name: "홍길동",
  birthDate: "2002-01-12",
  phoneNumber: "01028321232",
  connectingStatus: "CONNECTED",
  profilePictureUrl: "https://github.com/shadcn.png",
  sessionInfo: {
    sessionInfoId: 1,
    totalCount: 1,
    remainingCount: 2,
  },
  workoutSchedules: [
    {
      workoutScheduleId: 1,
      dayOfWeek: "MONDAY",
      preferenceTimes: ["10:00", "12:00"],
    },
    {
      workoutScheduleId: 2,
      dayOfWeek: "TUESDAY",
      preferenceTimes: ["10:00", "12:00"],
    },
    {
      workoutScheduleId: 3,
      dayOfWeek: "WEDNESDAY",
      preferenceTimes: ["10:00", "12:00"],
    },
    {
      workoutScheduleId: 4,
      dayOfWeek: "THURSDAY",
      preferenceTimes: ["10:00", "12:00"],
    },
    {
      workoutScheduleId: 5,
      dayOfWeek: "FRIDAY",
      preferenceTimes: ["10:00", "12:00"],
    },
    {
      workoutScheduleId: 6,
      dayOfWeek: "SATURDAY",
      preferenceTimes: ["10:00", "12:00"],
    },
    {
      workoutScheduleId: 7,
      dayOfWeek: "SUNDAY",
      preferenceTimes: ["10:00", "12:00"],
    },
  ],
};

const MOCK_AVAILABLE_PT_TIME: PTScheduleProps = {
  currentSchedules: [
    {
      dayOfWeek: "MONDAY",
      isHoliday: true,
      startTime: "09:00",
      endTime: "19:00",
    },
    {
      dayOfWeek: "TUESDAY",
      isHoliday: false,
      startTime: "09:00",
      endTime: "19:00",
    },
    {
      dayOfWeek: "WEDNESDAY",
      isHoliday: false,
      startTime: "09:00",
      endTime: "19:00",
    },
    {
      dayOfWeek: "THURSDAY",
      isHoliday: false,
      startTime: "09:00",
      endTime: "19:00",
    },
    {
      dayOfWeek: "FRIDAY",
      isHoliday: false,
      startTime: "09:00",
      endTime: "19:00",
    },
    {
      dayOfWeek: "SATURDAY",
      isHoliday: false,
      startTime: "09:00",
      endTime: "19:00",
    },
    {
      dayOfWeek: "SUNDAY",
      isHoliday: false,
      startTime: "09:00",
      endTime: "19:00",
    },
  ],
  scheduleChanges: [
    {
      applyAt: "2025-12-12",
      schedules: [
        {
          dayOfWeek: "MONDAY",
          isHoliday: false,
          startTime: "09:00",
          endTime: "19:00",
        },
        {
          dayOfWeek: "TUESDAY",
          isHoliday: false,
          startTime: "09:00",
          endTime: "19:00",
        },
        {
          dayOfWeek: "WEDNESDAY",
          isHoliday: false,
          startTime: "09:00",
          endTime: "19:00",
        },
        {
          dayOfWeek: "THURSDAY",
          isHoliday: false,
          startTime: "09:00",
          endTime: "19:00",
        },
        {
          dayOfWeek: "FRIDAY",
          isHoliday: false,
          startTime: "09:00",
          endTime: "19:00",
        },
        {
          dayOfWeek: "SATURDAY",
          isHoliday: false,
          startTime: "09:00",
          endTime: "19:00",
        },
        {
          dayOfWeek: "SUNDAY",
          isHoliday: false,
          startTime: "09:00",
          endTime: "19:00",
        },
      ],
    },
  ],
};

function page() {
  return (
    <main className="bg-background-primary text-text-primary h-screen w-full">
      <MyPageHeader name={MOCK.name} imageSrc={MOCK.profilePictureUrl} />

      <ProfileItemForRouting variant="code" url={RouteInstance["trainer-code"]()} />
      <ProfileItemForRouting variant="calendar" url={RouteInstance["edit-workout-schedule"]()} />

      <ScheduleInformation className="mt-[1.563rem]" ptSchedule={MOCK_AVAILABLE_PT_TIME} />
    </main>
  );
}

export default page;
