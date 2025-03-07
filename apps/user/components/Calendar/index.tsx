"use client";
import { DayPicker } from "@ui/components/DayPicker";
import React from "react";

import WeekRow from "./WeekRow";

export default function Calendar() {
  return (
    <DayPicker
      mode="single"
      className="max-w-mobile h-full min-h-[45.938rem] w-full"
      components={{ Row: WeekRow }}
    />
  );
}
