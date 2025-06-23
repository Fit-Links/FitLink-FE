import { NotificationType } from "@5unwan/core/api/types/common";

import { cn } from "../../lib/utils";

type NotificationContentProps = {
  isCompleted: boolean;
  message: string;
  eventDate?: string;
  createdAt?: string;
  variant: NotificationType;
};
function NotificationContent({
  isCompleted,
  message,
  eventDate,
  createdAt,
  variant,
}: NotificationContentProps) {
  const createEventDateJSX = (eventDate: string) => {
    const [before, after] = eventDate.split(" -> ");

    if (variant === "예약 변경")
      return (
        <span>
          <span>{before}</span>
          <span> → </span>
          <span
            className={cn("text-brand-primary-400", {
              "text-brand-primary-700": isCompleted,
            })}
          >
            {after}
          </span>
        </span>
      );

    return <span>{eventDate}</span>;
  };

  return (
    <div
      className={cn(
        "text-body-1 text-text-primary flex flex-col items-start justify-center transition-colors",
        {
          "text-text-sub3": isCompleted,
        },
      )}
    >
      <span>{message}</span>

      <p>{eventDate && createEventDateJSX(eventDate)}</p>

      <span className="text-body-4 text-text-sub3">{createdAt}</span>
    </div>
  );
}

export default NotificationContent;
