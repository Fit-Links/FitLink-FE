import NotificationItemFallback from "./NotificationItemFallback";

type NotificationPerPageFallbackProps = {
  pageIndex: number;
};

function NotificationsPerPageFallback({ pageIndex }: NotificationPerPageFallbackProps) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <NotificationItemFallback
          key={`notificationFallback-${pageIndex}-${i}`}
          variant="세션"
          createdAt={new Date().toISOString()}
          isCompleted={false}
          message="로딩 중"
          eventDate=""
        />
      ))}
    </>
  );
}

export default NotificationsPerPageFallback;
