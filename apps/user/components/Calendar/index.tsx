"use client";
import { DayPicker } from "@ui/components/DayPicker";
import React from "react";

import WeekRow from "./WeekRow";

export default function Calendar() {
  return <DayPicker mode="single" className="w-[23.625rem]" components={{ Row: WeekRow }} />;
}
