"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { getKoreanDate } from "@user/utils/date";

import { RequestReservationMode } from "@user/app/schedule-management/reservation/[mode]/types/requestReservation";

import PtTimeSelector from "./PtTimeSelector";
import TwoWeekCalendar from "./TwoWeekCalendar";

type ReservationContainerProps = {
  mode: RequestReservationMode;
  reservationDate?: string;
  reservationDateTime?: string;
  firstDayOfMonthKorea: string;
};

function ReservationContainer({
  mode,
  reservationDate,
  reservationDateTime,
  firstDayOfMonthKorea,
}: ReservationContainerProps) {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("selectedDate");

  const [selectedDate, setSelectedDate] = useState<Date>(
    reservationDate ? getKoreanDate(reservationDate) : getKoreanDate(dateParam || Date.now()),
  );

  return (
    <section className="flex h-full w-full flex-col overflow-hidden">
      <TwoWeekCalendar selectedDate={selectedDate} onChangeSelectedDate={setSelectedDate} />
      <PtTimeSelector
        mode={mode}
        selectedDate={selectedDate}
        reservationDateTime={reservationDateTime}
        firstDayOfMonthKorea={firstDayOfMonthKorea}
      />
    </section>
  );
}

export default ReservationContainer;
