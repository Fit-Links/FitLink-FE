import { Button } from "@ui/components/Button";
import { DayPicker } from "@ui/components/DayPicker";
import React from "react";
import { toast } from "sonner";

import Header from "../../../_components/Header";

type EditScheduleApplyAtStepProps = {
  onNext: (scheduleApplyAt: string) => void;
};

const DAYS_TO_ADD = 1;
const MONTH_OFFSET = 1;
const PAD_LENGTH = 2;

const RESET_TIME = 0;
const PAD_CHAR = "0";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + DAYS_TO_ADD);

export default function EditScheduleApplyAtStep({ onNext }: EditScheduleApplyAtStepProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(tomorrow);

  const handleClickChangeApplyAtDate = (date: Date | undefined) => {
    if (date) {
      const today = new Date();
      today.setHours(RESET_TIME, RESET_TIME, RESET_TIME, RESET_TIME); // 시간을 0으로 설정하여 날짜만 비교

      const selectedDateOnly = new Date(date);
      selectedDateOnly.setHours(RESET_TIME, RESET_TIME, RESET_TIME, RESET_TIME);

      if (selectedDateOnly > today) {
        setSelectedDate(date);
      } else {
        toast.error("오늘 이후의 날짜를 선택해주세요.");
      }
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
    <section className="flex w-full flex-1 flex-col  justify-between">
      <div>
        <Header title="변경 시점 적용" />

        <DayPicker
          mode="single"
          selectedDate={selectedDate}
          onChangeSelectedDate={handleClickChangeApplyAtDate}
        />
      </div>

      <Button className="mb-[2.125rem] w-full" size="lg" variant="brand" onClick={handleClickNext}>
        다음
      </Button>
    </section>
  );
}
