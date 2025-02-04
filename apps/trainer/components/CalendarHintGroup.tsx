import { Badge } from "@ui/components/Badge";
import React from "react";

const CalendarHintInfo = [
  {
    color: "brand-primary-500",
    content: "예약 완료",
  },
  {
    color: "brand-secondary-500",
    content: "예약 대기중",
  },
  {
    color: "text-sub3",
    content: "예약 불가",
  },
] as const;

type CalendarHintProps = {
  content: string;
  color: string;
};
function CalendarHint({ content, color }: CalendarHintProps) {
  return (
    <Badge variant="sub1" size="sm" className="px-3">
      <div className="flex items-center gap-[0.25rem]">
        <div className={`h-[0.5rem] w-[0.5rem] bg-${color}`} />
        <span className={`text-${color}`}>{content}</span>
      </div>
    </Badge>
  );
}
function CalendarHintGroup() {
  return (
    <div className="flex items-center gap-[0.5rem]">
      {CalendarHintInfo.map(({ color, content }, idx) => (
        <CalendarHint key={`${color}-${content}-${idx}`} color={color} content={content} />
      ))}
    </div>
  );
}

export default CalendarHintGroup;
