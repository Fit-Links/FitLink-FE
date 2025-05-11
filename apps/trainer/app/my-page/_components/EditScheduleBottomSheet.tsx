import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@ui/components/Sheet";
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
      {/* <SheetTrigger></SheetTirgger> */}
      <SheetContent side="bottom" className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          {/* <SheetDescription></SheetDescription> */}
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
