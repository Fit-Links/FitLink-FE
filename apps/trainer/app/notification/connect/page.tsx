import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { notificationQueries } from "@trainer/queries/notification";

import ConnectNotificationPageClient from "./_components/NotificationPageClient";

export default async function ConnectNotificationPage() {
  const queryClient = new QueryClient();

  const listQuery = await queryClient.fetchInfiniteQuery(
    notificationQueries.list({ type: "CONNECT" }),
  );

  const firstPageIds = listQuery.pages.flatMap((page) =>
    page.data.content.map((n) => n.notificationId),
  );

  await Promise.all(
    firstPageIds.map((id) => queryClient.prefetchQuery(notificationQueries.detail(id))),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ConnectNotificationPageClient />
    </HydrationBoundary>
  );
}
