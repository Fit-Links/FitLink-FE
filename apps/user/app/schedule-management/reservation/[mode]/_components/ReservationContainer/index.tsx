"use client";

import { useState } from "react";

import PtTimeSelector from "./PtTimeSelector";
import TwoWeekCalendar from "./TwoWeekCalendar";
import { RequestReservationMode } from "../../page";

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
