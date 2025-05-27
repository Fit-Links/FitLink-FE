/* eslint-disable no-magic-numbers */
"use client";

import DayOfWeekPicker from "@ui/components/DayOfWeekPicker";
import { Days } from "@ui/components/DayOfWeekPicker/Days";
import TimeCellToggleGroup from "@ui/components/TimeCellToggleGroup";
import { TimeCell } from "@ui/utils/timeCellUtils";
import { useRef, useState } from "react";

import FixedReservationAdderButton from "./FixedReservationAdderButton";

type SelectPtTimesContainerProps = {
  userInformation: { memberId: number; name: string };
};

function SelectPtTimesContainer({ userInformation }: SelectPtTimesContainerProps) {
  const dayRef = useRef<Days>(0);
  const selectedFixedSchedulesRef = useRef<Record<string, string[]>>({});

  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  selectedFixedSchedulesRef.current[dayRef.current] = selectedTimes;

  const handleChangeSelectDate = (day: Days) => {
    dayRef.current = day;

    if (!selectedFixedSchedulesRef.current[day]) {
      selectedFixedSchedulesRef.current[day] = [];
    }

    setSelectedTimes(selectedFixedSchedulesRef.current[day]);
  };

  return (
    <>
      <section className="flex h-full w-full flex-col pt-[1.688rem]">
        <DayOfWeekPicker onCurrentDayChange={handleChangeSelectDate} />{" "}
        <section className="h-full">
          <TimeCellToggleGroup
            className="md:max-w-mobile mt-10"
            selected={selectedTimes}
            onSelectedChange={setSelectedTimes}
            timeCellInfo={MOCK_TIME_CELL_INFO}
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

const MOCK_TIME_CELL_INFO: TimeCell[] = Array.from({ length: 24 }, (_, i) => {
  const time = i.toString().padStart(2, "0") + ":00";

  return { dayOfWeek: "MONDAY", time, disabled: false };
});
