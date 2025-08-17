import { NotificationType } from "@5unwan/core/api/types/common";
import { ReactNode } from "react";

import IconThumbnail from "./IconThumbnail";
import { Avatar, AvatarFallback } from "../../components/Avatar";

type Props = {
  image?: ReactNode;
  variant: NotificationType;
  isCompleted: boolean;
};

function NotificationThumbnail({ image, variant, isCompleted }: Props) {
  return image ? (
    <div className="relative h-fit w-fit">
      <Avatar className="h-[3.125rem] w-[3.125rem]">{image ? image : <AvatarFallback />}</Avatar>
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
