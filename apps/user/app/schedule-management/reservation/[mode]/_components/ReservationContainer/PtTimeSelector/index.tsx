/* eslint-disable no-magic-numbers */
"use client";

import TimeCellToggleGroup from "@ui/components/TimeCellToggleGroup";
import { TimeCell } from "@ui/utils/timeCellUtils";
import { isSameDay } from "date-fns";
import { useEffect, useLayoutEffect, useState } from "react";

import RequestReservation from "./RequestReservation";
import { RequestReservationMode } from "../../../page";

type PtTimeSelectorProps = {
  mode: RequestReservationMode;
  reservationDateTime?: string;
  selectedDate: Date;
};

const MOCK_TIME_CELL_INFO: TimeCell[] = [
  { dayOfWeek: "MON", time: "01:00", disabled: false },
  { dayOfWeek: "MON", time: "02:00", disabled: false },
  { dayOfWeek: "MON", time: "07:00", disabled: false },
  { dayOfWeek: "MON", time: "08:00", disabled: false },
  { dayOfWeek: "MON", time: "09:00", disabled: false },
  { dayOfWeek: "MON", time: "10:00", disabled: false },
  { dayOfWeek: "MON", time: "11:00", disabled: false },
  { dayOfWeek: "MON", time: "12:00", disabled: false },
  { dayOfWeek: "MON", time: "13:00", disabled: false },
  { dayOfWeek: "MON", time: "14:00", disabled: false },
  { dayOfWeek: "MON", time: "15:00", disabled: false },
  { dayOfWeek: "MON", time: "16:00", disabled: false },
  { dayOfWeek: "MON", time: "17:00", disabled: false },
  { dayOfWeek: "MON", time: "18:00", disabled: false },
];

function PtTimeSelector({ mode, selectedDate, reservationDateTime }: PtTimeSelectorProps) {
  const [selectedTimes, setSelectedTimes] = useState<string[]>(() =>
    reservationDateTime ? [reservationDateTime] : [],
  );
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isRequestSuccessSheetOpen, setIsRequestSuccessSheetOpen] = useState(false);

  // TODO: 팝업 컴포넌트 리팩토링 작업 이후 callback에 주입할 함수
  // const popupController: {
  //   [key in Extract<RequestReservationMode, "new">]: ComponentProps<typeof Popup>["positive"];
  // } = {
  //   new: {
  //     label: "확인",
  //     callback: () => {},
  //   },
  // };

  const validateSelectedTimesForEdit = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (mode === "edit" && selectedTimes.length) {
      if (!isSameDay(selectedDate, currentDate)) return;

      const selectedTime = Number(selectedTimes[0].split(":")[0]);

      if (selectedTime - currentHour <= 1) {
        // TODO: 추후 예약 변경은 현재 시간으로부터 1시간 이후 시간으로만 선택 변경 가능하다는 팝업 컴포넌트 구현 예정
        setSelectedTimes([]);
      }
    }
  };

  useLayoutEffect(() => {
    validateSelectedTimesForEdit();
  }, [selectedTimes]);

  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true);

      return;
    }

    setSelectedTimes([]);
  }, [selectedDate]);

  return (
    //TODO: 정해진 갯수의 시간을 선택할 경우 팝업 컴포넌트를 나타내기
    <>
      <TimeCellToggleGroup
        className="md:max-w-mobile mt-10"
        selected={selectedTimes}
        onSelectedChange={setSelectedTimes}
        onExceedToggleLimit={() => console.log("꽉 찼습니다")}
        variant="notification"
        toggleLimit={mode === "new" ? 2 : 1}
        timeCellInfo={MOCK_TIME_CELL_INFO}
      />
      <RequestReservation
        mode={mode}
        open={isRequestSuccessSheetOpen}
        onChangeOpen={setIsRequestSuccessSheetOpen}
        selectedDate={selectedDate}
        selectedTime={selectedTimes}
        isActive={!!selectedTimes.length}
      />
    </>
  );
}

export default PtTimeSelector;
