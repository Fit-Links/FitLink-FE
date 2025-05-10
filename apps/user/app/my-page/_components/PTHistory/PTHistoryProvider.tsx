"use client";

import { useState } from "react";

import { PTHistoryContext } from "./PTHistoryContext";
import { PTHistoryLabel } from "./PTHistoryLabel";

export type PTHistoryFilterTypes = "ALL" | "COMPLETED" | "NO_SHOW" | "NONE";

interface PTHistoryProviderProps {
  children: React.ReactNode;
}

export default function PTHistoryProvider({ children }: PTHistoryProviderProps) {
  const [historyFilter, setHistoryFilter] = useState<PTHistoryFilterTypes>("ALL");

  return (
    <>
      <PTHistoryLabel />
      <PTHistoryContext.Provider value={{ historyFilter, setHistoryFilter }}>
        {children}
      </PTHistoryContext.Provider>
    </>
  );
}
