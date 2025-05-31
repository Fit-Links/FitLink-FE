import { Button } from "@ui/components/Button";
import { DayPicker } from "@ui/components/DayPicker";
import React from "react";

import Header from "../../../_components/Header";

type EditScheduleApplyAtStepProps = {
  onNext: (scheduleApplyAt: string) => void;
};

const MONTH_OFFSET = 1;
const PAD_LENGTH = 2;
const PAD_CHAR = "0";

export default function EditScheduleApplyAtStep({ onNext }: EditScheduleApplyAtStepProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const handleClickChangeStartDate = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleClickNext = () => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + MONTH_OFFSET).padStart(PAD_LENGTH, PAD_CHAR);
    const day = String(selectedDate.getDate()).padStart(PAD_LENGTH, PAD_CHAR);

    const dateString = `${year}-${month}-${day}`;

    onNext(dateString);
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
