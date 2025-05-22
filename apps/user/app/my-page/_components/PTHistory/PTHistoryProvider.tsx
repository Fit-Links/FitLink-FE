"use client";

import { useState } from "react";

import { PTHistoryContext } from "./PTHistoryContext";
import { PTHistoryLabel } from "./PTHistoryLabel";

export type PTHistoryFilterTypes =
  | "SESSION_ALL"
  | "SESSION_COMPLETED"
  | "SESSION_NO_SHOW"
  | "SESSION_NONE";

interface PTHistoryProviderProps {
  children: React.ReactNode;
}

export default function PTHistoryProvider({ children }: PTHistoryProviderProps) {
  const [historyFilter, setHistoryFilter] = useState<PTHistoryFilterTypes>("SESSION_ALL");

  return (
    <>
      <PTHistoryLabel />
      <PTHistoryContext.Provider value={{ historyFilter, setHistoryFilter }}>
        {children}
      </PTHistoryContext.Provider>
    </>
  );
}
