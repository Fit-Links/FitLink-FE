"use client";

import { ToggleGroup, ToggleGroupItem } from "@ui/components/ToggleGroup";

import usePTHistoryFilter from "./_store/PTHistoryFilterStore";
import { PTHistoryFilterTypes } from "./PTHistoryCotainer";

export const FILTER_OPTIONS: Record<PTHistoryFilterTypes, string> = {
  SESSION_ALL: "전체",
  SESSION_COMPLETED: "PT 완료",
  SESSION_NO_SHOW: "불참석",
  SESSION_NONE: "미처리",
};

export default function PTHistoryFilter() {
  const { historyFilter, setHistoryFilter } = usePTHistoryFilter();

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
