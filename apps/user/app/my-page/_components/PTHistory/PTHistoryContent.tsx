import { PtInfo, PtStatus } from "@5unwan/core/api/types/common";
import PTHistoryItem from "@ui/components/PTHistoryItem";
import { useContext } from "react";

import { MyPtHistoryApiResponse } from "@user/services/types/myInformation.dto";

import { PTHistoryContext } from "./PTHistoryContext";

interface PTHistoryListProps {
  ptHistory: MyPtHistoryApiResponse["data"]["content"];
}
export default function PTHistoryContent({ ptHistory }: PTHistoryListProps) {
  const { historyFilter } = useContext(PTHistoryContext);

  return (
    <section className="mt-[1.25rem] flex flex-col gap-[0.625rem] overflow-y-auto pb-2">
      {ptHistory.map((item: PtInfo) => {
        if (item.status !== historyFilter && historyFilter !== "ALL") return;

        return (
          <PTHistoryItem
            key={`PT-history-item-${item.sessionId}`}
            reservationDate={item.reservationDate}
            status={item.status as Exclude<PtStatus, "PENDING">}
          />
        );
      })}
    </section>
  );
}
