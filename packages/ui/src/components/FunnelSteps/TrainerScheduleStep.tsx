import { AvailablePtTime } from "@5unwan/core/api/types/common";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useRef, useState } from "react";

import { Button } from "@ui/components/Button";
import DayOfWeekPicker from "@ui/components/DayOfWeekPicker";
import { Days } from "@ui/components/DayOfWeekPicker/Days";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@ui/components/Dialog";
import Header from "@ui/components/Header";
import { Switch } from "@ui/components/Switch";
import TimePicker from "@ui/components/TimePicker";

import { DAYS_OF_WEEK_MAP } from "@ui/utils/timeCellUtils";

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

type TrainerScheduleStepProps = {
  onNext: (availablePtTimes: Omit<AvailablePtTime, "availableTimeId">[]) => void;
};
function TrainerScheduleStep({ onNext }: TrainerScheduleStepProps) {
  const timePeriodRef = useRef<string>(null);
  const hoursRef = useRef<string>(null);
  const minutesRef = useRef<string>(null);

  const [currentDay, setCurrentDay] = useState<Days>(Days.Monday);

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
      isHoliday: false,
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

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    onNext(trainerSchedule);
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
    <div className="flex h-full flex-col border">
      <Header>
        <Header.Title content="PT 수업 시간" />
      </Header>

      <DayOfWeekPicker
        onCurrentDayChange={setCurrentDay}
        completed={filledDays}
        currentDay={currentDay}
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

          <div className="flex items-start justify-between">
            <label>시작 시간</label>
            <Dialog onOpenChange={createTimeDialogHandler("startTime")}>
              <DialogTrigger>
                <Button size="md" className="w-[6.8125rem]">
                  {trainerSchedule[currentDay].startTime || DEFAULT_TIME}
                </Button>
              </DialogTrigger>
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
        </div>

        <Button onClick={handleSubmit} className="w-full" size="xl" disabled={!isFilled}>
          완료
        </Button>
      </div>
    </div>
  );
}

export default TrainerScheduleStep;
