import { Cake, CalendarMinus2, Clock, Code, Dumbbell, Phone, User, UserRoundX } from "lucide-react";
import { ComponentProps } from "react";

import { cn } from "@ui/lib/utils";

type ProfileItemProps = ComponentProps<"div">;

function ProfileItem({ className, ...props }: ProfileItemProps) {
  return (
    <div
      className={cn(
        `bg-background-primary relative flex min-h-[2.813rem] min-w-[22.375rem] items-center justify-between`,
        className,
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}

type iconTypes = "calendar" | "cake" | "user" | "dumbbell" | "phone" | "code" | "clock" | "userX";
type ProfileItemIconProps = {
  icon: iconTypes;
} & ComponentProps<"div">;

function ProfileItemIcon({ icon, className, ...props }: ProfileItemIconProps) {
  const ICON_MAP = {
    calendar: <CalendarMinus2 />,
    cake: <Cake />,
    user: <User />,
    dumbbell: <Dumbbell />,
    phone: <Phone />,
    code: <Code />,
    clock: <Clock />,
    userX: <UserRoundX />,
  };

  return (
    <div
      className={cn(
        `text-text-primary mr-[0.938rem] aspect-square h-[1.563rem] w-[1.563rem]`,
        className,
      )}
      {...props}
    >
      {ICON_MAP[icon]}
    </div>
  );
}

type ProfileItemHeaderProps = {
  icon: iconTypes;
  title: string;
} & ComponentProps<"div">;

function ProfileItemHeader({ icon, className, title, ...props }: ProfileItemHeaderProps) {
  return (
    <div
      className={cn(
        `text-headline text-text-primary flex items-center text-[1.063rem] leading-[1.375rem]`,
        className,
      )}
      {...props}
    >
      <ProfileItemIcon icon={icon} />
      {title}
    </div>
  );
}

type ProfileItemContentProps = ComponentProps<"div">;

function ProfileItemContent({ className, ...props }: ProfileItemContentProps) {
  return (
    <div
      className={cn(
        `text-text-sub2 flex items-center gap-[0.625rem] text-[0.938rem] leading-[1.375rem]`,
        className,
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}

export { ProfileItem, ProfileItemIcon, ProfileItemHeader, ProfileItemContent };
