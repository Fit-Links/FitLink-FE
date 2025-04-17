import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@ui/lib/utils";

import { currentYearWithMonth } from "@ui/utils/DayPickerUtils";

const MONTH_OFFSET = 1;

type CaptionProps = {
  className?: string;
  month: Date;
  onChangeMonth: (month: Date) => void;
  captionLeft?: ReactNode;
  captionRight?: ReactNode;
};

function Caption({ className, month, onChangeMonth, captionLeft, captionRight }: CaptionProps) {
  const handlePrevMonth = () => {
    onChangeMonth(new Date(month.getFullYear(), month.getMonth() - MONTH_OFFSET));
  };

  const handleNextMonth = () => {
    onChangeMonth(new Date(month.getFullYear(), month.getMonth() + MONTH_OFFSET));
  };

  return (
    <div
      className={cn(
        "relative flex h-[2.188rem] items-center justify-center gap-3 text-center",
        className,
      )}
    >
      {captionLeft && <div className="absolute left-3 flex h-full items-center">{captionLeft}</div>}
      <button onClick={handlePrevMonth}>
        <ChevronLeft className={"cursor-pointer"} />
      </button>
      <span className="font-mono">{currentYearWithMonth(month)}</span>
      <button onClick={handleNextMonth}>
        <ChevronRight className={"cursor-pointer"} />
      </button>
      {captionRight && (
        <div className="absolute right-3 flex h-full items-center">{captionRight}</div>
      )}
    </div>
  );
}

export { Caption };
