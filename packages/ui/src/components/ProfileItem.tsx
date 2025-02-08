import { icons } from "lucide-react";
import { ComponentProps } from "react";

import { cn } from "@ui/lib/utils";

type ProfileItemProps = {
  children: React.ReactNode;
} & ComponentProps<"div">;

function ProfileItem({ className, children, ...props }: ProfileItemProps) {
  return (
    <div
      className={cn(
        `bg-background-primary relative flex min-h-[2.813rem] min-w-[22.375rem] items-center justify-between`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
type Icon = keyof typeof icons;

type ProfileItemIconProps = {
  iconName: Icon;
} & ComponentProps<"div">;

function ProfileItemIcon({ iconName, className, ...props }: ProfileItemIconProps) {
  const Icon = icons[iconName];

  return (
    <div
      className={cn(
        `text-text-primary mr-[0.938rem] aspect-square h-[1.563rem] w-[1.563rem]`,
        className,
      )}
      {...props}
    >
      <Icon />
    </div>
  );
}

type ProfileItemHeaderProps = {
  children: React.ReactNode;
} & ComponentProps<"div">;

function ProfileItemHeader({ children, className, ...props }: ProfileItemHeaderProps) {
  return (
    <div
      className={cn(
        `text-headline text-text-primary flex items-center text-[1.063rem] leading-[1.375rem]`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function ProfileItemContent({ children, className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `text-text-sub2 flex items-center gap-[0.625rem] text-[0.938rem] leading-[1.375rem]`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { ProfileItem, ProfileItemIcon, ProfileItemHeader, ProfileItemContent };
