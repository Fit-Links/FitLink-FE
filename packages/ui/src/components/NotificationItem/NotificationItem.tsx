import { NotificationType } from "@5unwan/core/api/types/common";
import { forwardRef, HTMLAttributes, MouseEventHandler } from "react";

import NotificationContent from "./NotificationContent";
import NotificationThumbnail from "./NotificationThumbnail";
import DateController from "../../lib/DateController";
import { cn } from "../../lib/utils";

type Props = Omit<HTMLAttributes<HTMLLIElement>, "onClick"> & NotificationProps;

type NotificationProps = {
  isCompleted: boolean;
  // memberName?: string;
  avatarSrc?: string;
  message: string;
  eventDate?: Date | string;
  eventDetail?: Date | string;
  createdAt: Date | string;
  variant: NotificationType;
  onClick?: MouseEventHandler<HTMLLIElement>;
};

const NotificationItem = forwardRef<HTMLLIElement, Props>((props, ref) => {
  const {
    isCompleted,
    // memberName,
    avatarSrc,
    createdAt,
    message,
    eventDate,
    eventDetail,
    variant,
    onClick,
    className,
    ...commonProps
  } = props;

  const handleClick: MouseEventHandler<HTMLLIElement> = (e) => {
    if (isCompleted || !onClick) return;

    onClick(e);
  };

  const eventDateController = eventDate ? DateController(eventDate).validate() : undefined;
  const createdDateController = DateController(createdAt).validate();
  const eventDetailController = eventDetail ? DateController(eventDetail).validate() : undefined;
  // const messageCompound = memberName ? `${memberName} ${message}` : message;

  return (
    <li
      ref={ref}
      className={cn(
        "bg-background-sub1 flex h-[6.25rem] w-[22.375rem] cursor-pointer items-center gap-[15px] rounded-[10px] px-[15px] transition-colors",
        {
          "cursor-default": isCompleted,
        },
        className,
      )}
      onClick={handleClick}
      {...commonProps}
    >
      <NotificationThumbnail isCompleted={isCompleted} avatarSrc={avatarSrc} variant={variant} />
      <NotificationContent
        isCompleted={isCompleted}
        createdAt={createdDateController?.toRelative()}
        message={message}
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
