import React from "react";

import DotWrapper from "./DotWrapper";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";
import { cn } from "../lib/utils";
import { splitTimeCellByAMPM, TimeCell } from "../utils/timeCellUtils";

const NOT_FOUND = -1;

type TimeCellToggleVariant = "default" | "notification";

type Props = {
  className?: string;
  toggleLimit?: number;
  selected: string[];
  onSelectedChange: (value: string[]) => void;
  onExceedToggleLimit?: () => void;
  timeCellInfo: TimeCell[];
  variant?: TimeCellToggleVariant;
};
function TimeCellToggleGroup({
  toggleLimit,
  selected,
  onSelectedChange,
  onExceedToggleLimit,
  timeCellInfo,
  className,
  variant = "default",
}: Props) {
  const handleChange = (value: string[]) => {
    if (toggleLimit && value.length > toggleLimit) {
      if (onExceedToggleLimit) onExceedToggleLimit();

      return;
    }
    onSelectedChange(value);
  };
  const { am, pm } = splitTimeCellByAMPM(timeCellInfo);

  return (
    <ToggleGroup
      variant="outline"
      type="multiple"
      value={selected}
      onValueChange={handleChange}
      className={cn("flex flex-col items-start gap-[2rem]", className)}
    >
      <TimeCellToggleSection type="am">
        {am.map(({ dayOfWeek, time, disabled }, index) => (
          <TimeCellToggleItem
            dayOfWeek={dayOfWeek}
            time={time}
            key={`${dayOfWeek}-${time}-${index}`}
            disabled={disabled}
            variant={variant}
            priority={selected.findIndex((selectedTime) => selectedTime === time)}
          />
        ))}
      </TimeCellToggleSection>
      <TimeCellToggleSection type="pm">
        {pm.map(({ dayOfWeek, time, disabled }, index) => (
          <TimeCellToggleItem
            dayOfWeek={dayOfWeek}
            time={time}
            key={`${dayOfWeek}-${time}-${index}`}
            disabled={disabled}
            variant={variant}
            priority={selected.findIndex((selectedTime) => selectedTime === time)}
          />
        ))}
      </TimeCellToggleSection>
    </ToggleGroup>
  );
}

const TimeCellSectionTypeMap = {
  am: "오전",
  pm: "오후",
};
type TimeCellToggleSectionProps = {
  type: keyof typeof TimeCellSectionTypeMap;
  children: React.ReactNode;
};
function TimeCellToggleSection({ type, children }: TimeCellToggleSectionProps) {
  return (
    <section className="w-full">
      <div className="text-text-primary text-body-1 mb-[1rem]">{TimeCellSectionTypeMap[type]}</div>
      <div className="xs:gap-x-4 flex flex-wrap gap-x-1 gap-y-4">{children}</div>
    </section>
  );
}

type TimeCellToggleItemProps = TimeCell & {
  variant: TimeCellToggleVariant;
  priority: number;
};
function TimeCellToggleItem({ disabled, time, variant, priority }: TimeCellToggleItemProps) {
  const isSelected = priority !== NOT_FOUND;

  return (
    <DotWrapper
      enabled={variant === "notification" && isSelected}
      // eslint-disable-next-line no-magic-numbers
      notification={`${priority + 1}`}
      variant="brand"
      size="xl"
      data-testid={time}
    >
      <ToggleGroupItem
        disabled={disabled}
        value={time}
        className={cn(
          "text-text-sub2 border-text-sub2 data-[state=on]:border-brand-primary-500 data-[state=on]:bg-brand-primary-500 data-[state=on]:text-text-primary disabled:bg-background-sub2 disabled:text-text-sub3 disabled:border-background-sub2 text-headline hover:bg-brand-primary-600 hover:text-text-primary hover:border-brand-primary-600 h-[2.375rem] min-w-[4.875rem] rounded-full disabled:opacity-100",
          {
            "data-[state=on]:dot-mask-lg": variant === "notification" && isSelected,
          },
        )}
      >
        {time}
      </ToggleGroupItem>
    </DotWrapper>
  );
}

export default TimeCellToggleGroup;
