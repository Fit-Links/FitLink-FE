/* eslint-disable no-magic-numbers */
"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import DayOfWeekPicker from "@ui/components/DayOfWeekPicker";
import { Days } from "@ui/components/DayOfWeekPicker/Days";
import TimeCellToggleGroup from "@ui/components/TimeCellToggleGroup";
import { DaysOfWeek } from "@ui/utils/makeWeekSchedule";
import { TimeCell } from "@ui/utils/timeCellUtils";
import { useRef, useState } from "react";

import { myInformationQueries } from "@trainer/queries/myInformation";

import FixedReservationAdderButton from "./FixedReservationAdderButton";

type SelectPtTimesContainerProps = {
  userInformation: { memberId: number; name: string };
};

const dayOfWeekToDaysMap: Record<string, Days> = {
  MONDAY: Days.Monday,
  TUESDAY: Days.Tuesday,
  WEDNESDAY: Days.Wednesday,
  THURSDAY: Days.Thursday,
  FRIDAY: Days.Friday,
  SATURDAY: Days.Saturday,
  SUNDAY: Days.Sunday,
};

const DAYS_OF_WEEK = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

function SelectPtTimesContainer({ userInformation }: SelectPtTimesContainerProps) {
  const dayRef = useRef<Days>(0);
  const selectedFixedSchedulesRef = useRef<Record<string, string[]>>({});

  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const { data: ptAvailableTime } = useSuspenseQuery(myInformationQueries.ptAvailableTime());

  const holidayDays = ptAvailableTime.data.currentSchedules.schedules
    .filter((schedule) => schedule.isHoliday)
    .map((schedule) => schedule.dayOfWeek);

  selectedFixedSchedulesRef.current[dayRef.current] = selectedTimes;

  const handleChangeSelectDate = (day: Days) => {
    dayRef.current = day;

    if (!selectedFixedSchedulesRef.current[day]) {
      selectedFixedSchedulesRef.current[day] = [];
    }

    setSelectedTimes(selectedFixedSchedulesRef.current[day]);
  };

  const availableTimeMap = Object.fromEntries(
    ptAvailableTime.data.currentSchedules.schedules.map((s) => [
      s.dayOfWeek,
      { start: s.startTime, end: s.endTime },
    ]),
  );

  const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0") + ":00");

  const timeCellInfo: TimeCell[] = Object.keys(dayOfWeekToDaysMap).flatMap((dayOfWeek) => {
    const available = availableTimeMap[dayOfWeek];

    return HOURS.map((time) => ({
      dayOfWeek: dayOfWeek as DaysOfWeek,
      time,
      disabled: !available || time < available.start || time > available.end,
    }));
  });

  const filteredTimeCellInfo = timeCellInfo.filter((timeCell) => {
    return timeCell.dayOfWeek === DAYS_OF_WEEK[dayRef.current];
  });

  return (
    <>
      <section className="flex h-full w-full flex-col pt-[1.688rem]">
        <DayOfWeekPicker
          onCurrentDayChange={handleChangeSelectDate}
          disabledDays={holidayDays.map((day) => dayOfWeekToDaysMap[day])}
        />
        <section className="h-full">
          <TimeCellToggleGroup
            className="md:max-w-mobile mt-10"
            selected={selectedTimes}
            onSelectedChange={setSelectedTimes}
            timeCellInfo={filteredTimeCellInfo}
            toggleLimit={1}
          />
        </section>
        <footer>
          <FixedReservationAdderButton
            userInformation={userInformation}
            selectedFixedSchedules={selectedFixedSchedulesRef.current}
          />
        </footer>
      </section>
    </>
  );
}

export default SelectPtTimesContainer;
