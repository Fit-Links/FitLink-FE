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
  avatarSrc: string;
  message: string;
  eventDate?: Date;
  createdAt: Date;
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
}: {
  className?: string;
  variant: Variant;
  size: "sm" | "lg";
}) {
  return (
    <div
      className={cn(
        "bg-brand-primary-500 flex h-[1.5rem] w-[1.5rem] items-center justify-center rounded-full",
        className,
      )}
    >
      <NotificationIcon
        variant={variant}
        className={cn(size === "sm" ? "h-[11px] w-[11px]" : "h-[30px] w-[30px]")}
      />
    </div>
  );
}
function NotificationThumbnail({ avatarSrc, variant }: { avatarSrc: string; variant: Variant }) {
  return avatarSrc ? (
    <div className="relative h-fit w-fit">
      <Avatar className="h-[3.125rem] w-[3.125rem]">
        <AvatarImage src={avatarSrc} />
        <AvatarFallback />
      </Avatar>
      <IconThumbnail
        size="sm"
        variant={variant}
        className="absolute -right-[6px] bottom-0 h-[1.5rem] w-[1.5rem]"
      />
    </div>
  ) : (
    <IconThumbnail size="lg" variant={variant} className="h-[3.125rem] w-[3.125rem]" />
  );
}

type NotificationContentProps = {
  message: string;
  eventDate?: string;
  createdAt?: string;
};
function NotificationContent({ message, eventDate, createdAt }: NotificationContentProps) {
  return (
    <div className="text-body-1 text-text-primary flex flex-col items-start gap-[0.5rem]">
      <span>{message}</span>
      {eventDate && <span>{eventDate}</span>}
      <span className="text-body-4 text-text-sub3">{createdAt}</span>
    </div>
  );
}
const NotificationItem = forwardRef<HTMLLIElement, Props>((props, ref) => {
  const {
    isCompleted,
    avatarSrc,
    createdAt,
    message,
    eventDate,
    variant,
    onClick,
    ...commonProps
  } = props;
  const handleClick = (e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
    if (isCompleted) return;
    onClick(e);
  };
  const eventDateController = eventDate && DateController(eventDate).validate();
  const createdDateController = DateController(createdAt).validate();

  return (
    <li
      ref={ref}
      className="bg-background-sub1 flex h-[6.25rem] w-[22.375rem] cursor-pointer items-center gap-[15px] rounded-[10px] px-[15px]"
      onClick={handleClick}
      {...commonProps}
    >
      <NotificationThumbnail avatarSrc={avatarSrc} variant={variant} />
      <NotificationContent
        createdAt={createdDateController?.toRelative()}
        message={message}
        eventDate={eventDateController?.toServiceFormat().untilMinutes}
      />
    </li>
  );
});
NotificationItem.displayName = "NotificationItem";
export default NotificationItem;
