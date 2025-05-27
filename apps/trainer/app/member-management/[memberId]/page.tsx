import { TargetMemberPtHistoryApiResponse } from "@trainer/services/types/userManagement.dto";

import Header from "./_components/Header";
import MemberProfile from "./_components/MemberProfile";
import PtHistoryContainer from "./_components/PtHistoryContainer";

function MemberInformation() {
  return (
    <main className="flex h-full flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <Header />
      <MemberProfile />
      <PtHistoryContainer ptHistories={MOCK_PT_HISTORIES} />
    </main>
  );
}

const MOCK_PT_HISTORIES: TargetMemberPtHistoryApiResponse["data"]["content"] = [
  {
    sessionId: 1,
    date: "2021-08-01T12:00:00",
    status: "COMPLETED",
  },
  {
    sessionId: 2,
    date: "2021-08-02T12:00:00",
    status: "NO_SHOW",
  },
  {
    sessionId: 3,
    date: "2021-08-03T12:00:00",
    status: "NONE",
  },
  {
    sessionId: 4,
    date: "2021-08-04T12:00:00",
    status: "COMPLETED",
  },
  {
    sessionId: 5,
    date: "2021-08-05T12:00:00",
    status: "NO_SHOW",
  },
  {
    sessionId: 6,
    date: "2021-08-06T12:00:00",
    status: "NONE",
  },
  {
    sessionId: 7,
    date: "2021-08-01T12:00:00",
    status: "COMPLETED",
  },
  {
    sessionId: 8,
    date: "2021-08-01T12:00:00",
    status: "NO_SHOW",
  },
  {
    sessionId: 9,
    date: "2021-08-01T12:00:00",
    status: "NONE",
  },
  {
    sessionId: 10,
    date: "2021-08-01T12:00:00",
    status: "COMPLETED",
  },
  {
    sessionId: 21,
    date: "2021-08-01T12:00:00",
    status: "NO_SHOW",
  },
  {
    sessionId: 31,
    date: "2021-08-01T12:00:00",
    status: "NONE",
  },
  {
    sessionId: 14,
    date: "2021-08-01T12:00:00",
    status: "COMPLETED",
  },
  {
    sessionId: 25,
    date: "2021-08-01T12:00:00",
    status: "NO_SHOW",
  },
  {
    sessionId: 37,
    date: "2021-08-01T12:00:00",
    status: "NONE",
  },
  {
    sessionId: 19,
    date: "2021-08-01T12:00:00",
    status: "COMPLETED",
  },
  {
    sessionId: 29,
    date: "2021-08-01T12:00:00",
    status: "NO_SHOW",
  },
  {
    sessionId: 39,
    date: "2021-08-01T12:00:00",
    status: "NONE",
  },
  {
    sessionId: 18,
    date: "2021-08-01T12:00:00",
    status: "COMPLETED",
  },
  {
    sessionId: 28,
    date: "2021-08-01T12:00:00",
    status: "NO_SHOW",
  },
  {
    sessionId: 38,
    date: "2021-08-01T12:00:00",
    status: "NONE",
  },
  {
    sessionId: 100,
    date: "2021-08-01T12:00:00",
    status: "COMPLETED",
  },
  {
    sessionId: 290,
    date: "2021-08-01T12:00:00",
    status: "NO_SHOW",
  },
  {
    sessionId: 389,
    date: "2021-08-01T12:00:00",
    status: "NONE",
  },
];

export default MemberInformation;
