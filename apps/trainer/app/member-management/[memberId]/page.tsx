import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { userManagementQueries } from "@trainer/queries/userManagement";

import Header from "./_components/Header";
import MemberProfile from "./_components/MemberProfile";
import PtHistoryContainer from "./_components/PtHistoryContainer";

async function MemberInformation({ params }: { params: { memberId: string } }) {
  const queryClient = new QueryClient();

  const memberId = params.memberId;

  await queryClient.prefetchQuery(userManagementQueries.detail(Number(memberId)));

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex h-full flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <HydrationBoundary state={dehydratedState}>
        <Header />
        <MemberProfile memberId={Number(memberId)} />
        <PtHistoryContainer memberId={Number(memberId)} />
      </HydrationBoundary>
    </main>
  );
}

export default MemberInformation;
