import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { reservationQueries } from "@trainer/queries/reservation";

import {
  AvailablePtTimeApiResponse,
  GetDayoffApiResponse,
} from "@trainer/services/types/myInformation.dto";

import { getKoreanDate } from "@trainer/utils/date";

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

  console.log(
    "예약 데이터 체크:",
    reservationInformation.data.sort((a, b) => {
      const aDate = getKoreanDate(a.reservationDates[0]);
      const bDate = getKoreanDate(b.reservationDates[0]);

      return aDate.getTime() - bDate.getTime();
    }),
  );

  console.log(
    "컨버팅 된 예약 데이터 체크->",
    filterLatestReservationsByDate(reservationInformation.data).sort((a, b) => {
      const aDate = getKoreanDate(a.reservationDates[0]);
      const bDate = getKoreanDate(b.reservationDates[0]);

      return aDate.getTime() - bDate.getTime();
    }),
  );

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
              ptAvailableTime={ptAvailableTime}
            />
          ))}
        </DayColumn>
      ))}
    </div>
  );
}
