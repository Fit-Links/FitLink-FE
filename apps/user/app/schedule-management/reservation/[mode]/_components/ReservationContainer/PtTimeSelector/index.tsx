/* eslint-disable no-magic-numbers */
"use client";

import { DayOfWeek } from "@5unwan/core/api/types/common";
import { useQuery } from "@tanstack/react-query";
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
import { format, isSameDay } from "date-fns";
import { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "sonner";

import { filterLatestReservationsByDate } from "@user/app/schedule-management/_utils/reservationMerger";
import { myInformationQueries } from "@user/queries/myInformation";
import { reservationQueries } from "@user/queries/reservation";

import { RequestReservationMode } from "@user/app/schedule-management/reservation/[mode]/types/requestReservation";

import ReservationRequestor from "./ReservationRequestor";
import PtTimeSelectorFallback from "../../Fallback/PtTimeSelectorFallback";

type PtTimeSelectorProps = {
  mode: RequestReservationMode;
  reservationDateTime?: string;
  selectedDate: Date;
  firstDayOfMonthKorea: string;
};

function PtTimeSelector({
  mode,
  selectedDate,
  reservationDateTime,
  firstDayOfMonthKorea,
}: PtTimeSelectorProps) {
  const [selectedTimes, setSelectedTimes] = useState<string[]>(() =>
    reservationDateTime ? [reservationDateTime.replace(/:00$/, "")] : [],
  );

  const [hasInitialized, setHasInitialized] = useState(false);
  const [isRequestSuccessSheetOpen, setIsRequestSuccessSheetOpen] = useState(false);
  const [isReservationChangeRemindPopupOpen, setIsReservationChangeRemindPopupOpen] =
    useState(false);
  const [isReservationMaxSelectedPopupOpen, setIsReservationMaxSelectedPopupOpen] = useState(false);

  const { data: reservations } = useQuery(reservationQueries.list(firstDayOfMonthKorea));
  const filteredReservations = filterLatestReservationsByDate(reservations?.data ?? []);

  const isReservationAvailable = filteredReservations.some(
    (reservation) =>
      reservation.reservationDates[0].split("T")[0] ===
      format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss").split("T")[0],
  );

  const { data: myInformation } = useQuery(myInformationQueries.summary());
  const { data: trainerAvailableTimes, isLoading } = useQuery({
    ...myInformationQueries.trainerAvailableTimes({
      trainerId: myInformation?.data?.trainerId as number,
    }),
    enabled: !!myInformation?.data?.trainerId,
  });

  const formattedDate = format(selectedDate, "EEEE").toUpperCase();

  /** TODO: 트레이너 시간 정보 호출 후, 시간 정보 정제. 따로 utils로 분리하기 */
  const generateTimeCells = (
    dayOfWeek: DayOfWeek,
    startHour?: number,
    endHour?: number,
  ): TimeCell[] => {
    return Array.from({ length: 24 }, (_, hour) => ({
      dayOfWeek,
      time: `${hour.toString().padStart(2, "0")}:00`,
      disabled:
        startHour === undefined || endHour === undefined || hour < startHour || hour > endHour,
    }));
  };

  const formattedTrainerAvailableTimes =
    trainerAvailableTimes?.data?.currentSchedules?.schedules.flatMap(
      ({ isHoliday, dayOfWeek, startTime, endTime }) => {
        if (dayOfWeek !== formattedDate) return [];
        if (isHoliday || !startTime || !endTime) {
          return generateTimeCells(dayOfWeek);
        }

        const startHour = parseInt(startTime.split(":")[0], 10);
        const endHour = parseInt(endTime.split(":")[0], 10);

        return generateTimeCells(dayOfWeek, startHour, endHour);
      },
    );

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

  useLayoutEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true);

      return;
    }

    setSelectedTimes([]);
  }, [selectedDate]);

  useEffect(() => {
    if (isReservationAvailable && mode === "new")
      toast.info(
        "이미 [예약 확정] 또는 [예약 대기], [예약 취소 요청]이 걸려있는 날짜는 추가로 예약할 수 없습니다.",
      );
  }, [selectedDate]);

  return (
    <>
      {isLoading ? (
        <PtTimeSelectorFallback />
      ) : (
        <section className="mt-1 flex h-full flex-col overflow-hidden">
          <section className="mb-1 h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden">
            {formattedTrainerAvailableTimes && (
              <TimeCellToggleGroup
                className="md:max-w-mobile my-10"
                selected={selectedTimes}
                onSelectedChange={setSelectedTimes}
                onExceedToggleLimit={handleExceedToggleLimit}
                variant="notification"
                toggleLimit={mode === "new" ? 2 : 1}
                timeCellInfo={
                  isReservationAvailable && mode === "new"
                    ? generateTimeCells("MONDAY", 23, 0)
                    : formattedTrainerAvailableTimes
                }
              />
            )}
          </section>

          <ReservationRequestor
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
                  현재 시간이 1시간 이상 빨라야 합니다
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
        </section>
      )}
    </>
  );
}

export default PtTimeSelector;
