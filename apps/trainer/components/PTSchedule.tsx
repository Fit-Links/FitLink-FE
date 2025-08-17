import { AvailablePtTime, DayOfWeek } from "@5unwan/core/api/types/common";
import { Badge } from "@ui/components/Badge";
import { Days } from "@ui/components/DayOfWeekPicker/Days";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@ui/components/Dropdown";
import { Text } from "@ui/components/Text";
import DateController from "@ui/lib/DateController";
import { DAYS_OF_WEEK, makeWeekSchedule, ObjectEntries } from "@ui/utils/makeWeekSchedule";
import { Ellipsis } from "lucide-react";
import React from "react";

type PTSchedulesProps = {
  currentSchedules: AvailablePtTime[];
  scheduledChanges: {
    applyAt: string;
    schedules: AvailablePtTime[];
  }[];
  onClickCurrentEllipsis: () => void;
  onClickChangeEllipsis?: () => void;
};

function PTSchedule({
  currentSchedules,
  scheduledChanges,
  onClickCurrentEllipsis,
  onClickChangeEllipsis,
}: PTSchedulesProps) {
  return (
    <div className="flex flex-col items-center gap-[0.5rem]">
      <PTScheduleItem
        current={true}
        schedules={currentSchedules}
        onClickEllipsis={onClickCurrentEllipsis}
      />
      {scheduledChanges.map(({ applyAt, schedules }, index) => (
        <PTScheduleItem
          key={`scheduled-${index}`}
          applyAt={applyAt}
          schedules={schedules}
          onClickEllipsis={onClickChangeEllipsis}
        />
      ))}
    </div>
  );
}

export default PTSchedule;

type PTScheduleItemProps = {
  current?: boolean;
  applyAt?: string;
  schedules: AvailablePtTime[];
  onClickEllipsis?: () => void;
};
function PTScheduleItem({ current, applyAt, schedules, onClickEllipsis }: PTScheduleItemProps) {
  const isCurrent = current && !applyAt;

  const weekSchedule = Object.entries(
    makeWeekSchedule({ type: "span", schedule: schedules }),
  ) as ObjectEntries<Record<DayOfWeek, string>>;
  const mondaySchedule = weekSchedule[Days.Monday];

  const handleClickEllipsis = () => {
    onClickEllipsis?.();
  };

  return (
    <div className="bg-background-sub1 text-text-primary w-full rounded-[10px] p-4 ">
      <div className="relative flex items-center gap-[1rem]">
        {isCurrent ? (
          <Badge size="sm" variant="default" className="px-3">
            현재 적용중
          </Badge>
        ) : (
          <Badge size="sm" variant="sub2">
            예정
          </Badge>
        )}
        {applyAt && (
          <Text.Body3>
            {`${DateController(new Date(applyAt)).validate()?.toServiceFormat().untilDate}부터 적용`}
          </Text.Body3>
        )}
        <Ellipsis
          onClick={handleClickEllipsis}
          className="text-background-sub4 absolute right-0 top-0 cursor-pointer"
        />
      </div>
      <Dropdown>
        <DropdownTrigger className="flex">
          <Text.Body1>{`${DAYS_OF_WEEK[mondaySchedule[0]]} ${mondaySchedule[1] === "-" || mondaySchedule[1] === null ? "휴무일" : mondaySchedule[1]}`}</Text.Body1>
        </DropdownTrigger>
        <DropdownContent>
          {/* eslint-disable-next-line no-magic-numbers */}
          {weekSchedule.slice(1).map(([dayOfWeek, schedule]: [DayOfWeek, string | null]) => (
            <DropdownItem
              key={dayOfWeek}
            >{`${DAYS_OF_WEEK[dayOfWeek]} ${schedule === "-" || schedule === null ? "휴무일" : schedule}`}</DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    </div>
  );
}
