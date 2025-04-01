"use client";

import { BaseReservationListItem } from "@5unwan/core/api/types/common";
import { DayPicker } from "@ui/components/DayPicker/index";
import React, { useState } from "react";

import Header from "./Header";
import WeekRow from "./WeekRow";
import { checkReservationIsFuture } from "../../_libs/checkReservationIsFuture";
import ReservationStatusSheet from "../BottomSheet/ReservationStatusSheet";

const mockReservations: BaseReservationListItem[] = [
  {
    reservationId: 1,
    sessionInfoId: 6,
    isDayOff: false,
    dayOfWeek: "MONDAY",
    reservationDate: ["2025-03-31T12:00"],
    status: "예약 확정",
    memberInfo: {
      memberId: 4,
      name: "홍길동",
    },
  },
  {
    reservationId: 2,
    sessionInfoId: 7,
    isDayOff: false,
    dayOfWeek: "MONDAY",
    reservationDate: ["2025-04-31T12:00"],
    status: "예약 확정",
    memberInfo: {
      memberId: 5,
      name: "최익",
    },
  },
  {
    reservationId: 11,
    sessionInfoId: 8,
    isDayOff: false,
    dayOfWeek: "THURSDAY",
    reservationDate: ["2025-04-28T04:00", "2025-04-28T06:00"],
    status: "예약 대기",
    memberInfo: {
      memberId: 6,
      name: "최용재",
    },
  },
];

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [month, setMonth] = useState(new Date());
  const [isReservationStatusSheetOpen, setIsReservationStatusSheetOpen] = useState(false);
  const [selectedReservationContent, setSelectedReservationContent] =
    useState<BaseReservationListItem>();

  const canRenderSheet = checkReservationIsFuture(selectedReservationContent?.reservationDate[0]);

  return (
    <>
      <DayPicker
        mode="single"
        currentMonth={month}
        onChangeMonth={setMonth}
        className="md:max-w-mobile h-full w-full"
        components={{
          Caption: () => <Header month={month} onChangeMonth={setMonth} />,
          Row: (props) => (
            <WeekRow
              selectedDate={selectedDate}
              onChangeSelectedDate={setSelectedDate}
              reservationContent={mockReservations}
              onSelectedReservationContent={setSelectedReservationContent}
              onChangeOpen={setIsReservationStatusSheetOpen}
              {...props}
            />
          ),
        }}
      />

      {canRenderSheet && selectedReservationContent && (
        <ReservationStatusSheet
          open={isReservationStatusSheetOpen}
          onChangeOpen={setIsReservationStatusSheetOpen}
          reservationContent={selectedReservationContent}
        ></ReservationStatusSheet>
      )}
    </>
  );
}
