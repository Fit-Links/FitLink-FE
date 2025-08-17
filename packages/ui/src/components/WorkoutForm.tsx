import { PreferredWorkout } from "@5unwan/core/api/types/common";
import React from "react";

import { DAYS_OF_WEEK_MAP, TimeCell } from "@ui/utils/timeCellUtils";

import { Button } from "./Button";
import DayOfWeekPicker from "./DayOfWeekPicker";
import { Days } from "./DayOfWeekPicker/Days";
import TimeCellToggleGroup from "./TimeCellToggleGroup";

const START_HOUR = 0;
const PADDED_LENGTH = 2;
const EMPTY_DAY_FORM = 0;

const HOURS = Array.from(
  { length: 24 },
  (_, i) => `${(i + START_HOUR).toString().padStart(PADDED_LENGTH, "0")}:00`,
);

const generateTimeCells: (dayOfWeek: Days) => TimeCell[] = (dayOfWeek) => {
  return HOURS.map((hour) => ({
    dayOfWeek: DAYS_OF_WEEK_MAP[dayOfWeek],
    time: hour,
    disabled: false,
  }));
};

type WorkoutFormProps = {
  onSubmit: (workoutSchedule: Omit<PreferredWorkout, "workoutScheduleId">[]) => void;
  currentWorkout?: PreferredWorkout[];
};
function WorkoutForm({ onSubmit, currentWorkout }: WorkoutFormProps) {
  const [currentDay, setCurrentDay] = React.useState<Days>(Days.Monday);
  const [workoutForm, setWorkoutForm] = React.useState(() =>
    currentWorkout
      ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
        currentWorkout.map(({ workoutScheduleId: _, ...dailyWorkout }) => {
          return dailyWorkout;
        })
      : [
          ...Array.from({ length: 7 }, (_v, index) => ({
            dayOfWeek: DAYS_OF_WEEK_MAP[index],
            preferenceTimes: [] as string[],
          })),
        ],
  );

  const filledDays = workoutForm
    ? workoutForm.map((dayForm) => dayForm.preferenceTimes.length > EMPTY_DAY_FORM)
    : Array.from({ length: 7 }, () => false);
  const isFilled = workoutForm
    ? workoutForm.some((dayForm) => dayForm.preferenceTimes.length > EMPTY_DAY_FORM)
    : false;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    onSubmit(workoutForm);
  };

  const handleSelectedChange = (value: string[]) => {
    const newWorkoutForm = [...workoutForm];
    newWorkoutForm[currentDay].preferenceTimes = value;

    setWorkoutForm(newWorkoutForm);
  };

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="flex h-full flex-col gap-8">
        <DayOfWeekPicker
          completed={filledDays}
          currentDay={currentDay}
          onCurrentDayChange={setCurrentDay}
          className="w-full"
        />
        <TimeCellToggleGroup
          selected={workoutForm[currentDay].preferenceTimes}
          onSelectedChange={handleSelectedChange}
          timeCellInfo={generateTimeCells(currentDay)}
        />
      </div>
      <Button onClick={handleClick} className="w-full" size="xl" disabled={!isFilled}>
        완료
      </Button>
    </div>
  );
}

export default WorkoutForm;
