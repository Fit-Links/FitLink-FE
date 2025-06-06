"use client";

import { BaseReservationListItem } from "@5unwan/core/api/types/common";
import { useQuery } from "@tanstack/react-query";
import { DayPicker } from "@ui/components/DayPicker/index";
import { format, startOfMonth } from "date-fns";
import React, { useState } from "react";

import { myInformationQueries } from "@user/queries/myInformation";
import { reservationQueries } from "@user/queries/reservation";

import Header from "./Header";
import WeekRow from "./WeekRow";
import { checkReservationIsFuture } from "../../_libs/checkReservationIsFuture";
import { filterLatestReservationsByDate } from "../../_utils/reservationMerger";
import ReservationStatusSheet from "../BottomSheet/ReservationStatusSheet";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [month, setMonth] = useState(new Date());
  const [isReservationStatusSheetOpen, setIsReservationStatusSheetOpen] = useState(false);
  const [selectedReservationContent, setSelectedReservationContent] =
    useState<BaseReservationListItem>();

  const canRenderSheet = checkReservationIsFuture(
    selectedReservationContent?.reservationDates.sort()[0],
  );

  const firstDayOfMonth = startOfMonth(month);

  const { data: myInformation } = useQuery(myInformationQueries.summary());

  const { data: reservations } = useQuery({
    ...reservationQueries.list(format(firstDayOfMonth, "yyyy-MM-dd")),
    enabled: myInformation?.data?.connectingStatus === "CONNECTED",
  });

  return (
    <>
      {reservations && (
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
                reservationContent={filterLatestReservationsByDate(reservations.data)}
                onSelectedReservationContent={setSelectedReservationContent}
                onChangeOpen={setIsReservationStatusSheetOpen}
                {...props}
              />
            ),
          }}
        />
      )}

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
