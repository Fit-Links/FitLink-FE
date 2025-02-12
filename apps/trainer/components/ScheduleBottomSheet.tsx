import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@ui/components/Sheet";
import DateController from "@ui/lib/DateController";
import { cn } from "@ui/lib/utils";
import { ReactNode } from "react";

import TimeOptionList from "./TimeOptionList";

type ScheduleBottomSheetProps = {
  className?: string;
  selectedDate: Date;
  trigger: ReactNode;
};

export default function ScheduleBottomSheet({
  selectedDate,
  className,
  trigger,
}: ScheduleBottomSheetProps) {
  const selectedFormatDate = DateController(selectedDate).validate()?.toDateTimeWithDayFormat();

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side={"bottom"}
        className={cn("absolute left-1/2 h-[17rem] w-[24.563rem] -translate-x-1/2", className)}
      >
        <SheetHeader className="items-center">
          <SheetTitle>{selectedFormatDate}</SheetTitle>
        </SheetHeader>
        <TimeOptionList />
      </SheetContent>
    </Sheet>
  );
}
