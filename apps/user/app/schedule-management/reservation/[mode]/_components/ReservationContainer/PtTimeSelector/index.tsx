/* eslint-disable no-magic-numbers */
"use client";

import { Button } from "@ui/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ui/components/Dialog";
import TimeCellToggleGroup from "@ui/components/TimeCellToggleGroup";
import { TimeCell } from "@ui/utils/timeCellUtils";
import { isSameDay } from "date-fns";
import { useEffect, useLayoutEffect, useState } from "react";

import { RequestReservationMode } from "@user/app/schedule-management/reservation/[mode]/types/requestReservation";

import RequestReservation from "./RequestReservation";

type PtTimeSelectorProps = {
  mode: RequestReservationMode;
  reservationDateTime?: string;
  selectedDate: Date;
};

const MOCK_TIME_CELL_INFO: TimeCell[] = [
  { dayOfWeek: "MONDAY", time: "01:00", disabled: false },
  { dayOfWeek: "MONDAY", time: "02:00", disabled: false },
  { dayOfWeek: "MONDAY", time: "07:00", disabled: false },
  { dayOfWeek: "MONDAY", time: "08:00", disabled: false },
  { dayOfWeek: "MONDAY", time: "09:00", disabled: false },
  { dayOfWeek: "MONDAY", time: "10:00", disabled: false },
  { dayOfWeek: "MONDAY", time: "11:00", disabled: false },
  { dayOfWeek: "MONDAY", time: "12:00", disabled: false },
  { dayOfWeek: "MONDAY", time: "13:00", disabled: false },
  { dayOfWeek: "MONDAY", time: "14:00", disabled: false },
  { dayOfWeek: "MONDAY", time: "15:00", disabled: false },
  { dayOfWeek: "MONDAY", time: "16:00", disabled: false },
  { dayOfWeek: "MONDAY", time: "17:00", disabled: false },
  { dayOfWeek: "MONDAY", time: "18:00", disabled: false },
];

function PtTimeSelector({ mode, selectedDate, reservationDateTime }: PtTimeSelectorProps) {
  const [selectedTimes, setSelectedTimes] = useState<string[]>(() =>
    reservationDateTime ? [reservationDateTime] : [],
  );
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isRequestSuccessSheetOpen, setIsRequestSuccessSheetOpen] = useState(false);
  const [isReservationChangeRemindPopupOpen, setIsReservationChangeRemindPopupOpen] =
    useState(false);
  const [isReservationMaxSelectedPopupOpen, setIsReservationMaxSelectedPopupOpen] = useState(false);

  const handleExceedToggleLimit = () => {
    setIsReservationMaxSelectedPopupOpen(true);
  };

  const validateSelectedTimesForEdit = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (mode === "edit" && selectedTimes.length) {
      if (!isSameDay(selectedDate, currentDate)) return;

      const selectedTime = Number(selectedTimes[0].split(":")[0]);

      if (selectedTime - currentHour <= 1) {
        setIsReservationChangeRemindPopupOpen(true);
        setSelectedTimes([]);
      }
    }
  };

  useLayoutEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true);

      return;
    }

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
    <>
      <TimeCellToggleGroup
        className="md:max-w-mobile mt-10"
        selected={selectedTimes}
        onSelectedChange={setSelectedTimes}
        onExceedToggleLimit={handleExceedToggleLimit}
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

      <Dialog
        open={isReservationChangeRemindPopupOpen}
        onOpenChange={setIsReservationChangeRemindPopupOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              당일 수업 시간 변경은 변경할 시간보다
              <br />
              현재 시간이 1시간 이상 빨라야 합니다.
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button>확인</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isReservationMaxSelectedPopupOpen}
        onOpenChange={setIsReservationMaxSelectedPopupOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>최다 지망 선택이 완료되었습니다.</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button>확인</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PtTimeSelector;
