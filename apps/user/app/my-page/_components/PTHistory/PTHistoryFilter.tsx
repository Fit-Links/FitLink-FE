"use client";

import { Button } from "@ui/components/Button";
import { useContext } from "react";

import { PTHistoryContext } from "./PTHistoryContext";
import { PTHistoryFilterTypes } from "./PTHistoryProvider";

export const FILTER_OPTIONS: Record<PTHistoryFilterTypes, string> = {
  SESSION_ALL: "전체",
  SESSION_COMPLETED: "PT 완료",
  SESSION_NO_SHOW: "불참석",
  SESSION_NONE: "미처리",
};

export default function PTHistoryFilter() {
  const { historyFilter, setHistoryFilter } = useContext(PTHistoryContext);

  const handleClickChangeHistoryFilter = (filter: PTHistoryFilterTypes) => {
    setHistoryFilter(filter);
  };

  return (
    <div className="mt-[0.625rem] flex items-center gap-2">
      {Object.entries(FILTER_OPTIONS).map(([key, value]) => (
        <Button
          key={`PT-history-filter-${key}`}
          size="sm"
          variant={historyFilter === key ? "negative" : "secondary"}
          onClick={() => handleClickChangeHistoryFilter(key as PTHistoryFilterTypes)}
        >
          {value}
        </Button>
      ))}
    </div>
  );
}
