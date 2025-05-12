"use client";

import WorkoutForm from "@ui/components/WorkoutForm";
import { useState } from "react";

import SuccessEditPreferenceTimeBottomSheet from "./BottomSheet/SuccessEditPreferenceTimeBottomSheet";

function PreferenceTimePicker() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleClickOnSubmit = () => {
    setIsSheetOpen(true);
    // TODO: 서버에 전송
    // 성공 시 Sheet 메시지 띄우기
    //
  };

  return (
    <section className="flex flex-1 flex-col justify-between">
      <WorkoutForm onSubmit={handleClickOnSubmit} />
      <SuccessEditPreferenceTimeBottomSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </section>
  );
}

export default PreferenceTimePicker;
