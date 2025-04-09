import { createContext } from "react";

import { PTHistoryFilterTypes } from "./PTHistoryProvider";

interface PTHistoryContextType {
  historyFilter: PTHistoryFilterTypes;
  setHistoryFilter: (filter: PTHistoryFilterTypes) => void;
}

export const PTHistoryContext = createContext<PTHistoryContextType>({
  historyFilter: "ALL",
  setHistoryFilter: () => {},
});
PTHistoryContext.displayName = "PTHistoryContext";
