import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { notificationQueries } from "@trainer/queries/notification";

import ReservationCancelNotificationPageClient from "./_components/NotificationPageClient";

async function ReservationCancelNotificationPage() {
  const queryClient = new QueryClient();

  const listQuery = await queryClient.fetchInfiniteQuery(
    notificationQueries.list({ type: "RESERVATION_CANCEL" }),
  );

  const firstPageIds = listQuery.pages.flatMap((page) =>
    page.data.content.map((n) => n.notificationId),
  );

  await Promise.all(
    firstPageIds.map((id) => queryClient.prefetchQuery(notificationQueries.detail(id))),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReservationCancelNotificationPageClient />
    </HydrationBoundary>
  );
}

export default ReservationCancelNotificationPage;
