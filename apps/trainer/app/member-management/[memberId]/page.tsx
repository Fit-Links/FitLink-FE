import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { userManagementQueries } from "@trainer/queries/userManagement";

import HeaderProvider from "@trainer/components/Providers/BasicHeaderProvider";

import { commonLayoutContents } from "@trainer/constants/styles";

import MemberProfile from "./_components/MemberProfile";
import PtHistoryContainer from "./_components/PtHistoryContainer";

async function MemberInformation({ params }: { params: { memberId: string } }) {
  const queryClient = new QueryClient();

  const memberId = params.memberId;

  await queryClient.prefetchQuery(userManagementQueries.detail(Number(memberId)));

  const dehydratedState = dehydrate(queryClient);

  // "flex h-full flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden"
  return (
    <HeaderProvider back title="회원 정보">
      <main className={commonLayoutContents}>
        <HydrationBoundary state={dehydratedState}>
          <MemberProfile memberId={Number(memberId)} />
          <PtHistoryContainer memberId={Number(memberId)} />
        </HydrationBoundary>
      </main>
    </HeaderProvider>
  );
}

export default MemberInformation;
