// date-fns 활용
import { cn } from "@ui/lib/utils";
import { ReactNode } from "react";

type DayColumnProps = {
  children?: ReactNode;
  isDayOff: boolean;
};

export default function DayColumn({ children, isDayOff }: DayColumnProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full snap-start flex-col gap-[0.0625rem]",
        isDayOff &&
          "bg-background-sub2 z-10 h-auto cursor-not-allowed items-center justify-center gap-0",
      )}
    >
      {isDayOff ? "휴무일" : children}
    </div>
  );
}
