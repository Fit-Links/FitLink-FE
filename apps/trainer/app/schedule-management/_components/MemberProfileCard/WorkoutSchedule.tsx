import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@ui/components/Dropdown";
import React from "react";

type WorkoutScheduleProps = {
  memberId: number;
  triggerText?: string;
};

/** MemberID를 바탕으로 회원의 상세 정보를 가져와 회원의 운동 가능한 시간 드랍다운으로 나타내기 */
function WorkoutSchedule({ triggerText, memberId }: WorkoutScheduleProps) {
  const workoutSchedules = MOCK_MEMBER_SCHEDULE[memberId];

  return (
    <Dropdown>
      <DropdownTrigger>
        {triggerText ? triggerText : `${workoutSchedules[0].day} ${workoutSchedules[0].hours}`}
      </DropdownTrigger>
      <DropdownContent>
        {workoutSchedules.map(({ day, hours }) => (
          <DropdownItem key={day} className="flex gap-2">
            <span>{day}</span>
            <span>{hours}</span>
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}

export default WorkoutSchedule;

const MOCK_MEMBER_SCHEDULE: { [key: number]: { day: string; hours: string }[] } = {
  1: [
    { day: "월", hours: "09:00 - 23:00" },
    { day: "화", hours: "12:00 - 12:00" },
    { day: "수", hours: "12:00 - 12:00" },
    { day: "목", hours: "12:00 - 12:00" },
    { day: "금", hours: "12:00 - 12:00" },
    { day: "토", hours: "12:00 - 12:00" },
    { day: "일", hours: "12:00 - 12:00" },
  ],
  2: [
    { day: "월", hours: "09:00 - 23:00" },
    { day: "화", hours: "12:00 - 12:00" },
    { day: "수", hours: "12:00 - 12:00" },
    { day: "목", hours: "12:00 - 12:00" },
    { day: "금", hours: "12:00 - 12:00" },
    { day: "토", hours: "12:00 - 12:00" },
    { day: "일", hours: "12:00 - 12:00" },
  ],
};
