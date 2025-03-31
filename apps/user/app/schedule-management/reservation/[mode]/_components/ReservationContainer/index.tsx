"use client";

import { useState } from "react";

import { RequestReservationMode } from "@user/app/schedule-management/reservation/[mode]/types/requestReservation";

import PtTimeSelector from "./PtTimeSelector";
import TwoWeekCalendar from "./TwoWeekCalendar";

type ReservationContainerProps = {
  mode: RequestReservationMode;
  reservationDate?: string;
  reservationDateTime?: string;
};

function ReservationContainer({
  mode,
  reservationDate,
  reservationDateTime,
}: ReservationContainerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(reservationDate || new Date()));

  return (
    <div>
      <TwoWeekCalendar selectedDate={selectedDate} onChangeSelectedDate={setSelectedDate} />
      <PtTimeSelector
        mode={mode}
        selectedDate={selectedDate}
        reservationDateTime={reservationDateTime}
      />
    </div>
  );
}

export default ReservationContainer;
