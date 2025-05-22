"use client";

import { createContext } from "react";

import { PTHistoryFilterTypes } from "./PTHistoryProvider";

interface PTHistoryContextType {
  historyFilter: PTHistoryFilterTypes;
  setHistoryFilter: (filter: PTHistoryFilterTypes) => void;
}

export const PTHistoryContext = createContext<PTHistoryContextType>({
  historyFilter: "SESSION_ALL",
  setHistoryFilter: () => {},
});
PTHistoryContext.displayName = "PTHistoryContext";
