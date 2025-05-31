import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@ui/components/Sheet";
import DateController from "@ui/lib/DateController";
import { cn } from "@ui/lib/utils";
import { ReactNode } from "react";

import TimeOptionList from "./TimeOptionList";

type ScheduleBottomSheetProps = {
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  className?: string;
  selectedDate: Date;
  trigger?: ReactNode;
};

export default function ScheduleBottomSheet({
  open,
  onChangeOpen,
  selectedDate,
  className,
  trigger,
}: ScheduleBottomSheetProps) {
  const selectedFormatDate = DateController(selectedDate).toDateTimeWithDayFormat();

  return (
    <Sheet open={open} onOpenChange={onChangeOpen}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent
        side={"bottom"}
        className={cn(
          "md:w-mobile absolute h-[17rem] md:inset-x-[calc((100%-480px)/2)]",
          className,
        )}
      >
        <SheetHeader className="items-center">
          <SheetTitle>{selectedFormatDate}</SheetTitle>
        </SheetHeader>
        <TimeOptionList
          selectedDate={selectedDate}
          selectedFormatDate={selectedFormatDate}
          onChangeOpen={onChangeOpen}
        />
      </SheetContent>
    </Sheet>
  );
}
