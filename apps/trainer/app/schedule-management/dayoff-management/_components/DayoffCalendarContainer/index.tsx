"use client";

import { DayPicker } from "@ui/components/DayPicker";
import { useState } from "react";

import DayoffAdderButton from "./DayoffAdderButton";

function DayoffCalendarContainer() {
  const [selectedDate, setSelectedDate] = useState<Date>();

  return (
    <>
      <section className="h-full">
        <DayPicker
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="mt-[0.625rem]"
          mode="single"
        />
      </section>
      <footer>
        <DayoffAdderButton selectedDate={selectedDate} />
      </footer>
    </>
  );
}

export default DayoffCalendarContainer;
