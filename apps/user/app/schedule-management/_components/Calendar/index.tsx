"use client";

import { DayPicker } from "@ui/components/DayPicker/index";
import React, { useState } from "react";

import Caption from "./Caption";
import WeekRow from "./WeekRow";

export default function Calendar() {
  const [month, setMonth] = useState(new Date());

  return (
    <DayPicker
      mode="single"
      currentMonth={month}
      onChangeMonth={setMonth}
      className="max-w-mobile h-full min-h-[45.938rem] w-full"
      components={{
        Caption: () => <Caption month={month} onChangeMonth={setMonth} />,
        Row: WeekRow,
      }}
    />
  );
}
