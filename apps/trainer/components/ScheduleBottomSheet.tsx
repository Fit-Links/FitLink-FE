import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@ui/components/Sheet";
import { cn } from "@ui/lib/utils";
import { ReactNode } from "react";

import { formatDateTimeWithDay } from "@trainer/utils/ScheduleBottomSheetUtils";

type ScheduleBottomSheetProps = {
  className?: string;
  selectedDate: Date;
  children: ReactNode;
};

export default function ScheduleBottomSheet({
  selectedDate,
  className,
  children,
}: ScheduleBottomSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={"bottom"}
        className={cn("+ absolute left-1/2 h-[17rem] w-[24.563rem] -translate-x-1/2", className)}
      >
        <SheetHeader className="text-text-primary text-title-1 items-center">
          {formatDateTimeWithDay(selectedDate)}
        </SheetHeader>
        <div className="] mb-[1.625rem] ml-[1.063rem] mt-[1.25rem] flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {/*TODO: TImeOption List가 들어올 예정 */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
