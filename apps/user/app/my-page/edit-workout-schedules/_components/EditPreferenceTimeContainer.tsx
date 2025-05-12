"use client";

import WorkoutForm from "@ui/components/WorkoutForm";
import React, { useState } from "react";

import SuccessEditPreferenceTimeBottomSheet from "./BottomSheet/SuccessEditPreferenceTimeBottomSheet";
import Header from "../../_components/Header";

// type EditPreferenceTimeContainerProps = Readonly<{
//   // trainerId?: number;
// }>;

export default function EditPreferenceTimeContainer() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // const { data } = useSuspenseQuery({
  //   ...myInformationQueries.trainerAvailableTime(trainerId),
  // });

  // 해당 데이터를 사용해서 트레이너 수업 가능 시간에 맞는 TimePicker 데이터 생성 후, UI 생성
  // 현재 작업 진행에 영향을 미칠 수 있으므로 컴포넌트 작업은 API 연동 후 컴포넌트 작업 진행

  // const { mutate, isSuccess } = useMutation({
  //   mutationFn: editPreferredTime,
  // });

  const handleClickOnSubmit = () => {
    setIsSheetOpen(true);
    // TODO: 서버에 전송
    // 성공 시 Sheet 메시지 띄우기
    //
    // mutate(editedData, {
    //   onSuccess: () => {
    //     if (isSuccess) {
    //       router.push(RouteInstance["my-page"]());
    //     }
    //   },
    // });
  };

  return (
    <div>
      <Header title="PT 희망 시간" />

      <section className="mt-[0.625rem] text-center">
        <p className="text-body-1 text-text-sub2">PT 시간 : 50분</p>
        <p className="text-body-1 text-text-sub2">PT 선택 시간은 시작 시간입니다.</p>
      </section>

      <WorkoutForm onSubmit={handleClickOnSubmit} />
      <SuccessEditPreferenceTimeBottomSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </div>
  );
}
