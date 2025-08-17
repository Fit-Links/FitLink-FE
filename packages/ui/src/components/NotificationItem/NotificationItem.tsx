import { NotificationType } from "@5unwan/core/api/types/common";
import { forwardRef, HTMLAttributes, MouseEventHandler, ReactNode } from "react";

import NotificationContent from "./NotificationContent";
import NotificationThumbnail from "./NotificationThumbnail";
import DateController from "../../lib/DateController";
import { cn } from "../../lib/utils";

type Props = Omit<HTMLAttributes<HTMLLIElement>, "onClick"> & NotificationProps;

type NotificationProps = {
  isCompleted: boolean;
  message: string;
  eventDate?: string;
  createdAt: Date | string;
  variant: NotificationType;
  onClick?: MouseEventHandler<HTMLLIElement>;
  image?: ReactNode;
};

const NotificationItem = forwardRef<HTMLLIElement, Props>((props, ref) => {
  const {
    isCompleted,
    createdAt,
    message,
    eventDate,
    variant,
    onClick,
    className,
    image,
    ...commonProps
  } = props;

  const handleClick: MouseEventHandler<HTMLLIElement> = (e) => {
    if (isCompleted || !onClick) return;

    onClick(e);
  };

  const createdDateController = DateController(createdAt).validate();

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
      <NotificationThumbnail isCompleted={isCompleted} image={image} variant={variant} />
      <NotificationContent
        isCompleted={isCompleted}
        createdAt={createdDateController?.toRelative()}
        message={message}
        eventDate={eventDate}
        variant={variant}
      />
    </li>
  );
});

NotificationItem.displayName = "NotificationItem";
export default NotificationItem;
