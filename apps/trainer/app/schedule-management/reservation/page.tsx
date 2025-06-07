import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";

import { userManagementQueries } from "@trainer/queries/userManagement";

import MemberListContainer from "../_components/MemberListContainer";
import Header from "./_components/Header";
import ReservationAdderButton from "./_components/ReservationAdderButton";
import MemberContainerFallback from "../_components/Fallback/MemberContainerFallback";

async function Reservation() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(userManagementQueries.list());
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex h-full flex-col">
      <HydrationBoundary state={dehydratedState}>
        {/** TODO: prerender 오류 방지를 위한 임시 fallback으로 추후 수정 */}
        <Suspense fallback={<></>}>
          <Header />
        </Suspense>
        <Suspense fallback={<MemberContainerFallback />}>
          <MemberListContainer renderFooterReservationButton={ReservationAdderButton} />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}

export default Reservation;
