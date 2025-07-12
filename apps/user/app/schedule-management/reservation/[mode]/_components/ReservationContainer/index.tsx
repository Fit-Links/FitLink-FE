/* eslint-disable no-magic-numbers */
"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { reservationQueries } from "@user/queries/reservation";

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
  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}-0${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

  const [selectedDate, setSelectedDate] = useState<Date>(
    reservationDate ? new Date(reservationDate) : new Date(dateParam || Date.now()),
  );

  const { data: trainerReservationStatus } = useSuspenseQuery({
    ...reservationQueries.trainerReservationStatus(today),
  });

  return (
    <section className="flex h-full w-full flex-col overflow-hidden">
      <TwoWeekCalendar selectedDate={selectedDate} onChangeSelectedDate={setSelectedDate} />
      <PtTimeSelector
        mode={mode}
        selectedDate={selectedDate}
        reservationDateTime={reservationDateTime}
        firstDayOfMonthKorea={firstDayOfMonthKorea}
        trainerReservationStatus={trainerReservationStatus?.data}
      />
    </section>
  );
}

export default ReservationContainer;
