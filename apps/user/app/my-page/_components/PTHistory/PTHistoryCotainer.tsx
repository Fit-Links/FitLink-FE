"use client";

import { PtStatus } from "@5unwan/core/api/types/common";
import { useState } from "react";

import PTHistoryContent from "./PTHistoryContent";
import PTHistoryFilter from "./PTHistoryFilter";
import { PTHistoryLabel } from "./PTHistoryLabel";

export default function PTHistoryContainer() {
  const [historyFilter, setHistoryFilter] = useState<PtStatus>("NONE");

  return (
    <section className="mt-[1.625rem] flex flex-col">
      <PTHistoryLabel />
      <PTHistoryFilter historyFilter={historyFilter} setHistoryFilter={setHistoryFilter} />
      <PTHistoryContent historyFilter={historyFilter} />
    </section>
  );
}
