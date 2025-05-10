import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { myInformationQueries } from "@user/queries/myInformation";

import { MyInformationApiResponse } from "@user/services/types/myInformation.dto";

import MyPageContainer from "./_components/MyPageContainer";
import PTHistoryContent from "./_components/PTHistory/PTHistoryContent";
import PTHistoryFilter from "./_components/PTHistory/PTHistoryFilter";
import PTHistoryProvider from "./_components/PTHistory/PTHistoryProvider";

export default async function MyPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<MyInformationApiResponse>(myInformationQueries.summary());

  const summaryData = queryClient.getQueryData<MyInformationApiResponse>(
    myInformationQueries.summary().queryKey,
  );

  const memberId = summaryData?.data?.memberId;

  if (memberId) {
    await queryClient.prefetchInfiniteQuery(myInformationQueries.ptHistory(memberId, undefined));
  }

  return (
    <main className="flex h-screen w-full flex-col overflow-hidden">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyPageContainer />

        <PTHistoryProvider>
          <PTHistoryFilter />
          <PTHistoryContent />
        </PTHistoryProvider>
      </HydrationBoundary>
    </main>
  );
}
