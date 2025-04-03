"use client";

import { Badge } from "@ui/components/Badge";
import { ProfileItem } from "@ui/components/ProfileItem";
import { useState } from "react";

import {
  MyInformationApiResponse,
  MyPtHistoryApiResponse,
} from "@user/services/types/myInformation.dto";

import { getFormattedPTCount } from "@user/utils/count";

import ProfileHeader from "./_components/ProfileHeader";
import PTHistoryContent from "./_components/PTHistory/PTHistoryContent";
import PTHistoryFilter from "./_components/PTHistory/PTHistoryFilter";
import PTHistoryProvider from "./_components/PTHistory/PTHistoryProvider";
import ConnectedTrainerItem from "./_components/PTInformation/ConnectedTrainerItem";
import ScheduleInformationItem from "./_components/PTInformation/ScheduleInformationItem";

export default function MyPage() {
  const mockData = useState<MyInformationApiResponse["data"]>({
    memberId: 1,
    name: "홍길동",
    trainerId: 1,
    trainerName: "",
    profilePictureUrl:
      "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/cnoC/image/L5UV5eFyTS1Ar4MTDDOd_Ynrzt4",
    sessionInfo: {
      sessionInfoId: 1,
      totalCount: 20,
      remainingCount: 2,
    },
    workoutSchedules: [
      {
        workoutScheduleId: "1",
        dayOfWeek: "MONDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: "2",
        dayOfWeek: "TUESDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: "3",
        dayOfWeek: "WEDNESDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: "4",
        dayOfWeek: "THURSDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: "5",
        dayOfWeek: "FRIDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: "6",
        dayOfWeek: "SATURDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: "7",
        dayOfWeek: "SUNDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
    ],
  });

  const [ptHistory] = useState<MyPtHistoryApiResponse["data"]>({
    content: [
      {
        sessionId: 1,
        reservationDate: "2021-08-01T12:00:00",
        status: "COMPLETED",
      },
      {
        sessionId: 2,
        reservationDate: "2021-08-01T12:00:00",
        status: "NO_SHOW",
      },
      {
        sessionId: 3,
        reservationDate: "2021-08-01T12:00:00",
        status: "NONE",
      },
    ],
    totalPages: "1",
    totalElements: "1",
  });

  return (
    <main className="flex h-screen w-full flex-col overflow-hidden">
      <ProfileHeader userInformation={mockData} />

      <ProfileItem className="mt-[1.563rem]" variant="dumbbell">
        <Badge>
          {getFormattedPTCount(
            mockData.sessionInfo.remainingCount,
            mockData.sessionInfo.totalCount,
          )}
        </Badge>
      </ProfileItem>

      <ConnectedTrainerItem trainerName={mockData.trainerName} />

      <ScheduleInformationItem
        title="PT희망 시간"
        className="mt-[0.625rem]"
        schedules={mockData.workoutSchedules}
      />
      <ScheduleInformationItem title="PT고정 시간" schedules={mockData.workoutSchedules} />

      <PTHistoryProvider>
        <PTHistoryFilter />
        <PTHistoryContent ptHistory={ptHistory.content} />
      </PTHistoryProvider>
    </main>
  );
}
