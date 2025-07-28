import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { notificationQueries } from "@trainer/queries/notification";

import SessionNotificationPageClient from "./_components/NotificationPageClient";

async function SessionNotificationPage() {
  const queryClient = new QueryClient();

  const listQuery = await queryClient.fetchInfiniteQuery(
    notificationQueries.list({ type: "SESSION" }),
  );

  const firstPageIds = listQuery.pages.flatMap((page) =>
    page.data.content.map((n) => n.notificationId),
  );

  await Promise.all(
    firstPageIds.map((id) => queryClient.prefetchQuery(notificationQueries.detail(id))),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SessionNotificationPageClient />
    </HydrationBoundary>
  );
}

export default SessionNotificationPage;
