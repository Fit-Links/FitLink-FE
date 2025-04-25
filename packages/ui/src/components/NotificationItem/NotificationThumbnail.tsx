import { NotificationType } from "@5unwan/core/api/types/common";

import IconThumbnail from "./IconThumbnail";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/Avatar";

type Props = {
  avatarSrc?: string;
  variant: NotificationType;
  isCompleted: boolean;
};

function NotificationThumbnail({ avatarSrc, variant, isCompleted }: Props) {
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
        className="absolute -right-[0.375rem] bottom-0 h-[1.5rem] w-[1.5rem]"
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

export default NotificationThumbnail;
