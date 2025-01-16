import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Calendar, CalendarX2, Dumbbell, HeartHandshake, History, UserRoundX } from "lucide-react";
import { forwardRef, HTMLAttributes, MouseEvent, MouseEventHandler } from "react";

import { Avatar } from "./Avatar";
import DateController from "../lib/DateController";
import { cn } from "../lib/utils";

interface Props extends Omit<HTMLAttributes<HTMLLIElement>, "onClick">, NotificationProps {}

type Variant = "exercise" | "reserve" | "cancel" | "edit" | "connect" | "disconnect";

type NotificationProps = {
  isCompleted: boolean;
  memberName?: string;
  avatarSrc: string;
  message: string;
  eventDate?: Date | string;
  eventDetail?: Date | string;
  createdAt: Date | string;
  variant: Variant;
  onClick: MouseEventHandler<HTMLLIElement>;
};

const NotificationIconMap = {
  exercise: Dumbbell,
  reserve: Calendar,
  cancel: CalendarX2,
  edit: History,
  connect: HeartHandshake,
  disconnect: UserRoundX,
} as const;

function NotificationIcon({
  className,
  variant = "exercise",
}: {
  className?: string;
  variant: Variant;
}) {
  const LucideIcon = NotificationIconMap[variant];

  return <LucideIcon className={cn("text-text-primary", className)} />;
}
function IconThumbnail({
  className,
  variant,
  size,
  isCompleted,
}: {
  className?: string;
  variant: Variant;
  size: "sm" | "lg";
  isCompleted: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-brand-primary-500 flex h-[1.5rem] w-[1.5rem] items-center justify-center rounded-full transition-colors",
        {
          "bg-background-sub2": isCompleted,
        },
        className,
      )}
    >
      <NotificationIcon
        variant={variant}
        className={cn(
          {
            "text-text-sub3": isCompleted,
          },
          size === "sm" ? "h-[11px] w-[11px]" : "h-[30px] w-[30px]",
        )}
      />
    </div>
  );
}
function NotificationThumbnail({
  avatarSrc,
  variant,
  isCompleted,
}: {
  avatarSrc: string;
  variant: Variant;
  isCompleted: boolean;
}) {
  return avatarSrc ? (
    <div className="relative h-fit w-fit">
      <Avatar className="h-[3.125rem] w-[3.125rem]">
        <AvatarImage src={avatarSrc} />
        <AvatarFallback />
      </Avatar>
      <IconThumbnail
        size="sm"
        variant={variant}
        isCompleted={isCompleted}
        className="absolute -right-[6px] bottom-0 h-[1.5rem] w-[1.5rem]"
      />
    </div>
  ) : (
    <IconThumbnail
      size="lg"
      variant={variant}
      isCompleted={isCompleted}
      className="h-[3.125rem] w-[3.125rem]"
    />
  );
}

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
const NotificationItem = forwardRef<HTMLLIElement, Props>((props, ref) => {
  const {
    isCompleted,
    memberName,
    avatarSrc,
    createdAt,
    message,
    eventDate,
    eventDetail,
    variant,
    onClick,
    ...commonProps
  } = props;
  const handleClick = (e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
    if (isCompleted) return;
    onClick(e);
  };
  const eventDateController = eventDate ? DateController(eventDate).validate() : undefined;
  const createdDateController = DateController(createdAt).validate();
  const eventDetailController = eventDetail ? DateController(eventDetail).validate() : undefined;
  const messageCompound = memberName ? `${memberName} ${message}` : message;

  return (
    <li
      ref={ref}
      className="bg-background-sub1 flex h-[6.25rem] w-[22.375rem] cursor-pointer items-center gap-[15px] rounded-[10px] px-[15px] transition-colors"
      onClick={handleClick}
      {...commonProps}
    >
      <NotificationThumbnail isCompleted={isCompleted} avatarSrc={avatarSrc} variant={variant} />
      <NotificationContent
        isCompleted={isCompleted}
        createdAt={createdDateController?.toRelative()}
        message={messageCompound}
        eventDate={eventDateController?.toServiceFormat().untilMinutes}
        variant={variant}
        eventDetail={
          eventDetailController
            ? eventDetailController.toServiceFormat().untilMinutes
            : (eventDetail as string)
        }
      />
    </li>
  );
});
NotificationItem.displayName = "NotificationItem";
export default NotificationItem;
