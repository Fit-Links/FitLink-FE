import { AvailablePtTime } from "@5unwan/core/api/types/common";
import { Button } from "@ui/components/Button";
import React from "react";

import { formatAvailableScheduleConfirm } from "@trainer/utils/avaliableScheduleUtils";

import ScheduleChangeResultSheet from "./ScheduleChangeResultSheet";
import Header from "../../../_components/Header";

type EditScheduleConfirmStepProps = {
  context: {
    scheduleApplyAt: string;
    availablePtTime: AvailablePtTime[];
  };
};
export default function EditScheduleConfirmStep({ context }: EditScheduleConfirmStepProps) {
  return (
    <section className="bg-background-primary text-text-primary flex h-screen w-full flex-col justify-between px-4">
      <div className="w-full text-center">
        <Header title="PT 수업 시간" />
        <p className="text-body-1 text-text-sub2 mt-[0.625rem]">
          변경하고 싶은 시간이 맞는지 확인해주세요
        </p>

        <div className="bg-background-sub2 mt-[3.25rem] min-h-[3rem] w-full rounded-lg py-[1.25rem]">
          <p className="text-subhead-1 text-text-primary">
            {context.availablePtTime.map((time) => (
              <p key={time.availableTimeId}>{formatAvailableScheduleConfirm(time)}</p>
            ))}
          </p>
        </div>
      </div>
      <ScheduleChangeResultSheet scheduleApplyAt={context.scheduleApplyAt}>
        <Button className="mb-[2.125rem] w-full" size="lg" variant="brand">
          변경
        </Button>
      </ScheduleChangeResultSheet>
    </section>
  );
}
