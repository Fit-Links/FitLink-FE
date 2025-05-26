"use client";

import { create } from "zustand";

interface PTHistoryFilterState {
  historyFilter: string;
  setHistoryFilter: (filter: string) => void;
}

const usePTHistoryFilterStore = create<PTHistoryFilterState>((set) => ({
  historyFilter: "SESSION_ALL",
  setHistoryFilter: (filter) => set({ historyFilter: filter }),
}));

export default usePTHistoryFilterStore;
