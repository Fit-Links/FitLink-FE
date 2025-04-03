import React, { useEffect, useState } from "react";

import SuccessEditPreferenceTimeBottomSheet from "./BottomSheet/SuccessEditPreferenceTimeBottomSheet";

function PreferenceTimePicker() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleClickOnSubmit = () => {
    setIsSheetOpen(true);
    // TODO: 서버에 전송
    // 성공 시 Sheet 메시지 띄우기
    //
  };

  useEffect(() => {
    // TODO
    // 워크아웃 폼 버튼에 적용
    handleClickOnSubmit();
  }, [isSheetOpen]);

  return (
    <section className="flex flex-1 flex-col justify-between">
      {/* 용재님이 만드신 WorkoutForm */}
      <SuccessEditPreferenceTimeBottomSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </section>
  );
}

export default PreferenceTimePicker;
