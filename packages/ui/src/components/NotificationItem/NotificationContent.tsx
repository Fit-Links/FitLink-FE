import { NotificationType } from "@5unwan/core/api/types/common";

import { cn } from "../../lib/utils";

type NotificationContentProps = {
  isCompleted: boolean;
  message: string;
  eventDate?: string;
  createdAt?: string;
  eventDetail?: string;
  variant: NotificationType;
};
function NotificationContent({
  isCompleted,
  message,
  eventDate,
  createdAt,
  eventDetail,
  variant,
}: NotificationContentProps) {
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

      <p>
        {eventDate && <span>{`${eventDate} ${variant === "예약 변경" ? "→ " : ""}`}</span>}
        {eventDetail && (
          <span
            className={cn(
              "text-brand-primary-500 transition-colors",
              {
                "text-brand-primary-700": variant !== "세션" && isCompleted,
              },
              {
                "text-text-primary": variant === "세션" && !isCompleted,
              },
              {
                "text-text-sub3": variant === "세션" && isCompleted,
              },
            )}
          >
            {eventDetail}
          </span>
        )}
      </p>

      <span className="text-body-4 text-text-sub3">{createdAt}</span>
    </div>
  );
}

export default NotificationContent;
