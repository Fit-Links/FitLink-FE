import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import { VisuallyHidden } from "@ui/components/VisuallyHidden";
import { useRouter } from "next/navigation";
import React from "react";

import RouteInstance from "@trainer/constants/route";

import SheetItem from "../my-information/_components/BottomSheet/SheetItem";

type EditScheduleBottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function EditScheduleBottomSheet({ open, onOpenChange }: EditScheduleBottomSheetProps) {
  const router = useRouter();

  const handleClickEditSchedule = () => {
    router.push(RouteInstance["edit-workout-schedule"]());
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>PT 수업 시간 설정</SheetTitle>

            <SheetDescription>
              이 모달은 PT 수업 시간 설정과 관련된 기능을 제공합니다.
            </SheetDescription>
          </VisuallyHidden>
          <SheetItem
            icon={"Pencil"}
            label="PT 수업시간 변경"
            variant="default"
            onClick={handleClickEditSchedule}
          />
          {/* <SheetFooter></SheetFooter> */}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default EditScheduleBottomSheet;
