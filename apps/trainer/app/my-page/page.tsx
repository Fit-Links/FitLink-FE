import { DaysOfWeek } from "@ui/utils/makeWeekSchedule";
import React from "react";

import { MYPAGE_ROUTES } from "@trainer/constants/mypageRoute";

import MyPageHeader from "./_components/MyPageHeader";
import ScheduleInformation from "./_components/ScheduleInformation";
import ProfileItemForRouting from "./trainer-code/_components/ProfileItemForRouting";

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
      dayOfWeek: "MON",
      isHoliday: true,
      startTime: "09:00",
      endTime: "19:00",
    },
    {
      dayOfWeek: "TUE",
      isHoliday: false,
      startTime: "09:00",
      endTime: "19:00",
    },
    {
      dayOfWeek: "WED",
      isHoliday: false,
      startTime: "09:00",
      endTime: "19:00",
    },
    {
      dayOfWeek: "THU",
      isHoliday: false,
      startTime: "09:00",
      endTime: "19:00",
    },
    {
      dayOfWeek: "FRI",
      isHoliday: false,
      startTime: "09:00",
      endTime: "19:00",
    },
    {
      dayOfWeek: "SAT",
      isHoliday: false,
      startTime: "09:00",
      endTime: "19:00",
    },
    {
      dayOfWeek: "SUN",
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
          dayOfWeek: "MON",
          isHoliday: false,
          startTime: "09:00",
          endTime: "19:00",
        },
        {
          dayOfWeek: "TUE",
          isHoliday: false,
          startTime: "09:00",
          endTime: "19:00",
        },
        {
          dayOfWeek: "WED",
          isHoliday: false,
          startTime: "09:00",
          endTime: "19:00",
        },
        {
          dayOfWeek: "THU",
          isHoliday: false,
          startTime: "09:00",
          endTime: "19:00",
        },
        {
          dayOfWeek: "FRI",
          isHoliday: false,
          startTime: "09:00",
          endTime: "19:00",
        },
        {
          dayOfWeek: "SAT",
          isHoliday: false,
          startTime: "09:00",
          endTime: "19:00",
        },
        {
          dayOfWeek: "SUN",
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
    <main className="bg-background-primary text-text-primary h-screen w-full px-4">
      <MyPageHeader name={MOCK.name} imageSrc={MOCK.profilePictureUrl} />

      <ProfileItemForRouting variant="code" url={MYPAGE_ROUTES.CODE} />
      <ProfileItemForRouting variant="calendar" url={MYPAGE_ROUTES.EDIT_WORKOUT_SCHEDULE} />

      <ScheduleInformation className="mt-[1.563rem]" ptSchedule={MOCK_AVAILABLE_PT_TIME} />
    </main>
  );
}

export default page;
