import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { reservationQueries } from "@trainer/queries/reservation";

import {
  AvailablePtTimeApiResponse,
  GetDayoffApiResponse,
} from "@trainer/services/types/myInformation.dto";

import DayColumn from "./DayColumn";
import TimeBlock from "./TimeBlock";
import {
  isCheckDayOff,
  mergeDateAndTime,
  parsedReservationContent,
} from "../../_libs/CalendarUtils";
import { filterLatestReservationsByDate } from "../../_utils/reservationMerger";

type WeekRowProps = {
  week: Date[];
  ptAvailableTime: AvailablePtTimeApiResponse;
  dayoff: GetDayoffApiResponse;

  reservationQueryDate: string;
};

export default function WeekRow({
  week,
  ptAvailableTime,
  dayoff,

  reservationQueryDate,
}: WeekRowProps) {
  const currentWeekStartDate = format(week[0], "yyyy-MM-dd");

  const isCurrentWeek = currentWeekStartDate === reservationQueryDate;

  const { data: reservationInformation, isLoading } = useQuery({
    ...reservationQueries.list(reservationQueryDate),
    enabled: isCurrentWeek,
  });

  if (!reservationInformation || isLoading) return null;

  return (
    <div className="flex h-full gap-[0.125rem]">
      {week.map((date) => (
        <DayColumn
          key={`${date}`}
          date={date}
          ptAvailableTime={ptAvailableTime}
          isDayOff={isCheckDayOff(date, dayoff.data)}
        >
          {mergeDateAndTime(date).map((mergeDate, index) => (
            <TimeBlock
              key={`${mergeDate}-${index}`}
              date={mergeDate}
              reservationContent={parsedReservationContent(
                filterLatestReservationsByDate(reservationInformation.data),
                mergeDate,
              )}
              originalReservationData={reservationInformation.data}
              ptAvailableTime={ptAvailableTime}
            />
          ))}
        </DayColumn>
      ))}
    </div>
  );
}
