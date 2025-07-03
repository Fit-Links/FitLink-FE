/* eslint-disable no-magic-numbers */
import { AvailablePtTime } from "@5unwan/core/api/types/common";
import { Button } from "@ui/components/Button";
import DayOfWeekPicker from "@ui/components/DayOfWeekPicker";
import { Days } from "@ui/components/DayOfWeekPicker/Days";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@ui/components/Dialog";
import Header from "@ui/components/Header";
import { Switch } from "@ui/components/Switch";
import TimePicker from "@ui/components/TimePicker";
import { DAYS_OF_WEEK_MAP } from "@ui/utils/timeCellUtils";
import { useRef, useState } from "react";

import Logo from "../Logo";

const DEFAULT_TIME = "-- : --";

const setHalfHours = (relative: number) => {
  return relative ? "30" : "00";
};
const setTimePeriods = (relative: number) => {
  return relative ? "오후" : "오전";
};

const generateTrainerScheduleTime = (
  timePeriod: string | null,
  hours: string | null,
  minutes: string | null,
) => {
  if (timePeriod === null || hours === null || minutes === null) return null;

  return `${timePeriod} ${hours}:${minutes}`;
};

const convertKoreanTimeTo24Hour = (timeStr: string): string => {
  const PAD_LENGTH = 2;
  const match = timeStr.match(/(오전|오후)\s(\d{2}):(\d{2})/);

  if (!match) {
    throw new Error("Invalid time format");
  }

  const [, period, hourStr, minute] = match;
  let hour = parseInt(hourStr, 10);

  if (period === "오전") {
    if (hour === 12) hour = 0;
  } else if (period === "오후") {
    if (hour !== 12) hour += 12;
  }

  return `${hour.toString().padStart(PAD_LENGTH, "0")}:${minute}`;
};

const isOrderedChronologically = (startTime: string | null, endTime: string | null) =>
  startTime === null || endTime === null ? false : startTime < endTime;

type TrainerScheduleStepProps = {
  onPrev: () => void;
  onNext?: (availablePtTimes: Omit<AvailablePtTime, "availableTimeId">[]) => void;
  onSubmit?: (availablePtTimes: Omit<AvailablePtTime, "availableTimeId">[]) => Promise<void>;
};
function TrainerScheduleStep({ onPrev, onNext, onSubmit }: TrainerScheduleStepProps) {
  const timePeriodRef = useRef<string>(null);
  const hoursRef = useRef<string>(null);
  const minutesRef = useRef<string>(null);

  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

  const [currentDay, setCurrentDay] = useState<Days>(Days.Monday);

  const [errorDays, setErrorDays] = useState<boolean[]>();
  const [trainerSchedule, setTrainerSchedule] = useState<
    {
      dayOfWeek: (typeof DAYS_OF_WEEK_MAP)[number];
      isHoliday: boolean;
      startTime: string | null;
      endTime: string | null;
    }[]
  >(
    Array.from({ length: 7 }, (_v, index) => ({
      dayOfWeek: DAYS_OF_WEEK_MAP[index],
      isHoliday: true,
      startTime: null,
      endTime: null,
    })),
  );

  const filledDays = trainerSchedule
    ? trainerSchedule.map(
        ({ isHoliday, startTime, endTime }) => !!(isHoliday || (startTime && endTime)),
      )
    : Array.from({ length: 7 }, () => false);
  const isFilled = trainerSchedule
    ? trainerSchedule.every(
        ({ isHoliday, startTime, endTime }) => !!(isHoliday || (startTime && endTime)),
      )
    : false;

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const formattedTrainerSchedule = trainerSchedule.map((schedule) => {
      const copy = { ...schedule };
      if (copy.startTime) copy.startTime = convertKoreanTimeTo24Hour(copy.startTime);
      if (copy.endTime) copy.endTime = convertKoreanTimeTo24Hour(copy.endTime);

      return copy;
    });
    const isValid = formattedTrainerSchedule
      ? trainerSchedule.every(
          ({ isHoliday, startTime, endTime }) =>
            isHoliday || isOrderedChronologically(startTime, endTime),
        )
      : false;
    if (!isValid) {
      setIsErrorDialogOpen(true);
      setErrorDays(
        formattedTrainerSchedule.map(
          ({ isHoliday, startTime, endTime }) =>
            !isHoliday && !isOrderedChronologically(startTime, endTime),
        ),
      );

      return;
    }
    try {
      if (onSubmit) await onSubmit(formattedTrainerSchedule);
      if (onNext) onNext(formattedTrainerSchedule);
    } catch {
      return;
    }
  };
  const handleHolidaySwitchChange = (checked: boolean) => {
    const newTrainerSchedule = [...trainerSchedule];
    newTrainerSchedule[currentDay].isHoliday = checked;
    if (checked) {
      newTrainerSchedule[currentDay].startTime = null;
      newTrainerSchedule[currentDay].endTime = null;
    }
    setTrainerSchedule(newTrainerSchedule);
  };
  const createTimeDialogHandler = (time: "startTime" | "endTime") => (open: boolean) => {
    if (open === false) {
      const newTrainerSchedule = [...trainerSchedule];
      newTrainerSchedule[currentDay][time] = generateTrainerScheduleTime(
        timePeriodRef.current,
        hoursRef.current,
        minutesRef.current,
      );
      setTrainerSchedule(newTrainerSchedule);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <Header logo={<Logo />}>
        <Header.Back onClick={onPrev} />
        <Header.Title content="PT 수업 시간" />
      </Header>

      <DayOfWeekPicker
        onCurrentDayChange={setCurrentDay}
        completed={filledDays}
        currentDay={currentDay}
        errorDays={errorDays}
        className="w-full"
      />
      <div className="mt-[1.5rem] flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <label>휴무일로 설정하기</label>
            <Switch
              checked={trainerSchedule[currentDay].isHoliday}
              onCheckedChange={handleHolidaySwitchChange}
            />
          </div>

          {!trainerSchedule[currentDay].isHoliday && (
            <div className="flex items-start justify-between">
              <label>시작 시간</label>
              <Dialog onOpenChange={createTimeDialogHandler("startTime")}>
                {!trainerSchedule[currentDay].isHoliday && (
                  <DialogTrigger>
                    <Button size="md" className="w-[6.8125rem]">
                      {trainerSchedule[currentDay].startTime || DEFAULT_TIME}
                    </Button>
                  </DialogTrigger>
                )}
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>시작 시간</DialogTitle>
                    <DialogDescription>시작 시간을 설정해주세요</DialogDescription>
                  </DialogHeader>

                  <div className="flex justify-between">
                    <div className="h-[180px] w-[70px]">
                      <TimePicker
                        initIdx={0}
                        length={2}
                        width={40}
                        loop={false}
                        viewPerspective="right"
                        setValue={setTimePeriods}
                        ref={timePeriodRef}
                      />
                    </div>
                    <div className="h-[180px] w-[70px]">
                      <TimePicker
                        startNumber={1}
                        initIdx={0}
                        length={12}
                        width={23}
                        loop={false}
                        ref={hoursRef}
                      />
                    </div>
                    <div className="h-[180px] w-[70px]">
                      <TimePicker
                        initIdx={0}
                        length={2}
                        width={23}
                        loop={false}
                        viewPerspective="left"
                        setValue={setHalfHours}
                        ref={minutesRef}
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {!trainerSchedule[currentDay].isHoliday && (
            <div className="flex items-start justify-between">
              <label>종료 시간</label>
              <Dialog onOpenChange={createTimeDialogHandler("endTime")}>
                <DialogTrigger>
                  <Button size="md" className="w-[6.8125rem]">
                    {trainerSchedule[currentDay].endTime || DEFAULT_TIME}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>종료 시간</DialogTitle>
                    <DialogDescription>종료 시간을 설정해주세요</DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-between">
                    <div className="h-[180px] w-[70px]">
                      <TimePicker
                        initIdx={0}
                        length={2}
                        width={40}
                        loop={false}
                        viewPerspective="right"
                        setValue={setTimePeriods}
                        ref={timePeriodRef}
                      />
                    </div>
                    <div className="h-[180px] w-[70px]">
                      <TimePicker
                        startNumber={1}
                        initIdx={0}
                        length={12}
                        width={23}
                        loop={false}
                        ref={hoursRef}
                      />
                    </div>
                    <div className="h-[180px] w-[70px]">
                      <TimePicker
                        initIdx={0}
                        length={2}
                        width={23}
                        loop={false}
                        viewPerspective="left"
                        setValue={setHalfHours}
                        ref={minutesRef}
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        <Button onClick={handleSubmit} className="w-full" size="xl" disabled={!isFilled}>
          완료
        </Button>
      </div>
      <Dialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>설정하신 PT 수업 시간이 유효하지 않습니다</DialogTitle>
            <DialogDescription>
              시작 시간을 종료 시간보다 <br />
              앞선 시간으로 설정하셨는지 확인해주세요
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button size="lg" className="w-full">
                확인
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TrainerScheduleStep;
