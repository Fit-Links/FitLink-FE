"use client";

import { PtStatus } from "@5unwan/core/api/types/common";
import { ToggleGroup, ToggleGroupItem } from "@ui/components/ToggleGroup";

export const FILTER_OPTIONS: Record<Exclude<PtStatus, "NONE">, string> = {
  // NONE: "전체",
  SESSION_COMPLETED: "PT 완료",
  SESSION_NOT_ATTEND: "불참석",
  SESSION_WAITING: "예약 대기",
  SESSION_CANCELLED: "취소",
};

interface PTHistoryFilterProps {
  historyFilter?: PtStatus;
  setHistoryFilter?: (filter: PtStatus) => void;
}

export default function PTHistoryFilter({ historyFilter, setHistoryFilter }: PTHistoryFilterProps) {
  return (
    <div className="mt-[0.625rem] flex">
      <ToggleGroup
        type="single"
        value={historyFilter}
        defaultValue={historyFilter}
        onValueChange={setHistoryFilter}
      >
        {Object.entries(FILTER_OPTIONS).map(([key, value]) => (
          <ToggleGroupItem key={key} value={key}>
            {value}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
