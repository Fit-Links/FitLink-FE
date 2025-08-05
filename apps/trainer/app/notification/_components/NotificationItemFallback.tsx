import { NotificationType } from "@5unwan/core/api/types/common";
import { Skeleton } from "@5unwan/ui/components/Skeleton";
import NotificationContent from "@ui/components/NotificationItem/NotificationContent";
import DateController from "@ui/lib/DateController";
import { cn } from "@ui/lib/utils";

type NotificationItemFallbackProps = {
  isCompleted: boolean;
  message: string;
  eventDate?: string;
  createdAt: Date | string;
  variant: NotificationType;
};
function NotificationItemFallback({
  isCompleted,
  createdAt,
  message,
  eventDate,
  variant,
}: NotificationItemFallbackProps) {
  const createdDateController = DateController(createdAt).validate();

  return (
    <li
      className={cn(
        "bg-background-sub1 flex h-[6.25rem] w-full shrink-0 cursor-pointer items-center gap-[15px] rounded-[10px] px-[15px] transition-colors",
        {
          "cursor-default": isCompleted,
        },
      )}
    >
      <Skeleton className="h-[3.125rem] w-[3.125rem] rounded-full" />
      <NotificationContent
        isCompleted={isCompleted}
        createdAt={createdDateController?.toRelative()}
        message={message}
        eventDate={eventDate}
        variant={variant}
      />
    </li>
  );
}

export default NotificationItemFallback;
