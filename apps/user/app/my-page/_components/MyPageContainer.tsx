"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Badge } from "@ui/components/Badge";
import Icon from "@ui/components/Icon";
import { ProfileItem } from "@ui/components/ProfileItem";
import { Text } from "@ui/components/Text";
import {
  makeWeekSchedule,
  ObjectEntries,
  DaysOfWeek,
  DAYS_OF_WEEK,
} from "@ui/utils/makeWeekSchedule";
import React from "react";

import { myInformationQueries } from "@user/queries/myInformation";

import { getFormattedPTCount } from "@user/utils/count";

import EditPreferredScheduleBottomSheet from "./BottomSheet/EditPreferredScheduleBottomSheet";
import ScheduleContainer from "./PTInformation/ScheduleContainer";
import ScheduleInformation from "./PTInformation/ScheduleInformation";
import ProfileHeader from "../_components/ProfileHeader";
import ConnectedTrainerItem from "../_components/PTInformation/ConnectedTrainerItem";
import { getISOToKoreanTime, getUniqueTimeReservations } from "../_utils/preferredTime";

const TEMP_DEFAULT_SESSION_COUNT = 0;

const NO_FIXED_RESERVATION_COUNT = 0;

export default function MyPageContainer() {
  const { data: response } = useSuspenseQuery(myInformationQueries.summary());

  const myInformation = response?.data;

  const preferredSchedule = myInformation?.workoutSchedules;

  const fixedSchedule = myInformation?.fixedReservations;

  const uniqueFixedSchedule = getUniqueTimeReservations(fixedSchedule);

  const formattedPreferredSchedule = Object.entries(
    makeWeekSchedule({ type: "block", schedule: preferredSchedule }),
  ) as ObjectEntries<Record<DaysOfWeek, string>>;

  const formattedFixedSchedule = getISOToKoreanTime(uniqueFixedSchedule);

  return (
    <div>
      <ProfileHeader
        userName={myInformation?.name ?? ""}
        profilePictureUrl={myInformation?.profilePictureUrl ?? ""}
      />

      <ProfileItem className="mt-[1.563rem]" variant="dumbbell">
        <Badge>
          {getFormattedPTCount(
            myInformation?.sessionInfo?.remainingCount ?? TEMP_DEFAULT_SESSION_COUNT,
            myInformation?.sessionInfo?.totalCount ?? TEMP_DEFAULT_SESSION_COUNT,
          )}
        </Badge>
      </ProfileItem>

      <ConnectedTrainerItem
        connectingStatus={myInformation?.connectingStatus}
        trainerName={myInformation?.trainerName}
      />

      <ScheduleInformation title="PT희망 시간" className="mt-[0.625rem]">
        <ScheduleContainer>
          <EditPreferredScheduleBottomSheet>
            <div className="absolute right-0 top-0 flex h-[2.5rem] w-[2.5rem] cursor-pointer items-center">
              <Icon name="Ellipsis" className="text-background-sub4 h-[1.5625rem] w-[1.5625rem]" />
            </div>
          </EditPreferredScheduleBottomSheet>

          {formattedPreferredSchedule.map(([dayOfWeek, schedule]: [DaysOfWeek, string | null]) => (
            <Text.Body1
              key={dayOfWeek}
              className="block"
            >{`${DAYS_OF_WEEK[dayOfWeek]} ${schedule}`}</Text.Body1>
          ))}
        </ScheduleContainer>
      </ScheduleInformation>

      {fixedSchedule.length > NO_FIXED_RESERVATION_COUNT && (
        <ScheduleInformation title="PT고정 시간">
          <ScheduleContainer>
            {formattedFixedSchedule?.map((schedule) => (
              <div key={schedule.reservationId} className="text-text-primary text-body-1">
                {schedule.formattedDateTime}
              </div>
            ))}
          </ScheduleContainer>
        </ScheduleInformation>
      )}
    </div>
  );
}
