import { Button } from "@ui/components/Button";
import { DayPicker } from "@ui/components/DayPicker";
import React from "react";

import Header from "../../../_components/Header";

type EditScheduleApplyAtStepProps = {
  onNext: (scheduleApplyAt: string) => void;
};

const DAY_GAP = 1;

export default function EditScheduleApplyAtStep({ onNext }: EditScheduleApplyAtStepProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const handleClickChangeStartDate = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleClickNext = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + DAY_GAP);
    onNext(nextDay.toISOString());
  };

  return (
    <section className="bg-background-primary text-text-primary flex h-screen w-full flex-col  justify-between">
      <div>
        <Header title="변경 시점 적용" />

        <DayPicker
          mode="single"
          selectedDate={selectedDate}
          onChangeSelectedDate={handleClickChangeStartDate}
        />
      </div>

      <Button className="mb-[2.125rem] w-full" size="lg" variant="brand" onClick={handleClickNext}>
        다음
      </Button>
    </section>
  );
}
