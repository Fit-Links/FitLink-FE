import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { notificationQueries } from "@trainer/queries/notification";

import DisconnectNotificationPageClient from "./_components/NotificationPageClient";

// 빌드 시점에 API 호출하지 않도록 dynamic rendering 설정
export const dynamic = "force-dynamic";

export default async function DisconnectNotificationPage() {
  const queryClient = new QueryClient();

  try {
    const listQuery = await queryClient.fetchInfiniteQuery(
      notificationQueries.list({ type: "DISCONNECT" }),
    );

    const firstPageIds = listQuery.pages.flatMap((page) =>
      page.data.content.map((n) => n.notificationId),
    );

    await Promise.all(
      firstPageIds.map((id) => queryClient.prefetchQuery(notificationQueries.detail(id))),
    );
  } catch (error) {
    // 빌드 시점 에러 무시
    console.log("Disconnect notification data fetch failed during build:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DisconnectNotificationPageClient />
    </HydrationBoundary>
  );
}
