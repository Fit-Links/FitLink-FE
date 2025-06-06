import { useSuspenseQuery } from "@tanstack/react-query";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@ui/components/Dropdown";
import {
  DAYS_OF_WEEK,
  DaysOfWeek,
  makeWeekSchedule,
  ObjectEntries,
} from "@ui/utils/makeWeekSchedule";
import React from "react";

import { userManagementQueries } from "@trainer/queries/userManagement";

type WorkoutScheduleProps = {
  memberId: number;
  triggerText?: string;
};

/** MemberID를 바탕으로 회원의 상세 정보를 가져와 회원의 운동 가능한 시간 드랍다운으로 나타내기 */
function WorkoutSchedule({ triggerText, memberId }: WorkoutScheduleProps) {
  const { data: userInformationDetail } = useSuspenseQuery(userManagementQueries.detail(memberId));

  const workoutSchedules = Object.entries(
    makeWeekSchedule({ type: "block", schedule: userInformationDetail.data.workoutSchedules }),
  ) as ObjectEntries<Record<DaysOfWeek, string>>;

  return (
    <Dropdown>
      <DropdownTrigger>{triggerText ? triggerText : `회원의 PT 희망 시간`}</DropdownTrigger>
      <DropdownContent>
        {workoutSchedules.map(([day, hours]) => (
          <DropdownItem key={day} className="flex gap-2">
            <span>{DAYS_OF_WEEK[day]}</span>
            <span>{hours}</span>
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}

export default WorkoutSchedule;
