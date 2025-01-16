import IconThumbnail from "./IconThumbnail";
import { Variant } from "./variants";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/Avatar";

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

export default NotificationThumbnail;
