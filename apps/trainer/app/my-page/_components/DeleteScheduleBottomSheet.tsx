import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import { VisuallyHidden } from "@ui/components/VisuallyHidden";
import React, { useEffect } from "react";

import useDeleteScheduleMutation from "../edit-workout-schedule/_hooks/useDeleteScheduleMutation";
import SheetItem from "../my-information/_components/BottomSheet/SheetItem";

type DeleteScheduleBottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function DeleteScheduleBottomSheet({ open, onOpenChange }: DeleteScheduleBottomSheetProps) {
  const { deleteSchedule, isSuccess } = useDeleteScheduleMutation();

  const handleClickDeleteSchedule = () => {
    deleteSchedule();
  };

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false);
    }
  }, [isSuccess]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>PT 수업 예정시간 삭제</SheetTitle>

            <SheetDescription>
              이 모달은 PT 수업 시간 설정과 관련된 기능을 제공합니다.
            </SheetDescription>
          </VisuallyHidden>
          <SheetItem
            icon={"Trash"}
            label="PT 수업 예정 시간 삭제"
            variant="danger"
            onClick={handleClickDeleteSchedule}
          />
          {/* <SheetFooter></SheetFooter> */}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default DeleteScheduleBottomSheet;
