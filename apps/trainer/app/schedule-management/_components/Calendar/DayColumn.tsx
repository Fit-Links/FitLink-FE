import { cn } from "@ui/lib/utils";
import { format } from "date-fns";
import { ReactNode } from "react";

import { AvailablePtTimeApiResponse } from "@trainer/services/types/myInformation.dto";

type DayColumnProps = {
  children?: ReactNode;
  isDayOff: boolean;
  date: Date;
  ptAvailableTime: AvailablePtTimeApiResponse;
};

export default function DayColumn({ children, isDayOff, ptAvailableTime, date }: DayColumnProps) {
  const ptTimeInformation = (
    ptAvailableTime.data.currentSchedules || ptAvailableTime.data.scheduledChanges
  ).schedules?.find(({ dayOfWeek }) => dayOfWeek === format(date, "EEEE").toUpperCase());

  return (
    <div
      className={cn(
        "relative flex h-full w-full min-w-0 max-w-full snap-start flex-col gap-[0.0625rem]",
        (ptTimeInformation?.isHoliday || isDayOff) &&
          "bg-background-sub2 z-10 h-auto cursor-not-allowed items-center justify-center gap-0",
      )}
    >
      {isDayOff || ptTimeInformation?.isHoliday ? "휴무일" : children}
    </div>
  );
}
