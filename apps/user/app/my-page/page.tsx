import MyPageContainer from "./_components/MyPageContainer";

export default async function page() {
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery<MyInformationApiResponse>(myInformationQueries.summary());

  // const summaryData = queryClient.getQueryData<MyInformationApiResponse>(
  //   myInformationQueries.summary().queryKey,
  // );

  // const memberId = summaryData?.data?.memberId;

  // if (memberId) {
  //   await queryClient.prefetchInfiniteQuery(myInformationQueries.ptHistory(memberId, undefined));
  // }

  return (
    <main className="flex h-screen w-full flex-col overflow-hidden">
      <MyPageContainer />
    </main>
  );
}
