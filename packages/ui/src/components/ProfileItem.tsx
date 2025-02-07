import { HTMLAttributes } from "react";

import { cn } from "@ui/lib/utils";

function ProfileItem({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `bg-background-primary relative flex min-h-[2.813rem] min-w-[22.375rem] items-center`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function ProfileItemIcon({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `text-text-primary mr-[0.938rem] aspect-square min-h-[1.563rem] min-w-[1.563rem]`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function ProfileItemTitle({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `text-headline text-text-primary text-[1.063rem] leading-[1.375rem]`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function ProfileItemContent({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `text-text-sub2 absolute right-0 flex items-center gap-[0.625rem] text-[0.938rem] leading-[1.375rem]`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { ProfileItem, ProfileItemIcon, ProfileItemTitle, ProfileItemContent };
