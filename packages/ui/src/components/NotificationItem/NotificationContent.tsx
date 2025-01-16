import { Variant } from "./variants";
import { cn } from "../../lib/utils";

type NotificationContentProps = {
  isCompleted: boolean;
  message: string;
  eventDate?: string;
  createdAt?: string;
  eventDetail?: string;
  variant: Variant;
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
      {eventDate && (
        <p>
          <span>{`${eventDate} ${variant === "edit" ? "→ " : ""}`}</span>
          <span
            className={cn("text-brand-primary-500", {
              "text-brand-primary=700": isCompleted,
            })}
          >
            {eventDetail}
          </span>
        </p>
      )}
      <span className="text-body-4 text-text-sub3">{createdAt}</span>
    </div>
  );
}

export default NotificationContent;
