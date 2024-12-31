import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../lib/utils";

const badgeVariants = cva(
  "inline-flex rounded-full font-medium transition-colors focus:outline-none border-transparent shadow",
  {
    variants: {
      variant: {
        default: "bg-background-sub4 text-text-sub5",
        sub1: "bg-background-sub1 text-text-primary",
        sub2: "bg-background-sub2 text-text-primary",
        brand: "bg-brand-primary-500 text-text-primary",
        destructive: "bg-notification text-text-primary",
      },
      size: {
        xl: "h-[38px] text-[17px] min-w-[78px]",
        lg: "h-[32px] text-[17px] min-w-[78px]",
        md: "h-[29px] text-[15px] min-w-[63px]",
        sm: "h-[25px] text-[13px] min-w-[57px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const notificationVariants = cva(
  "absolute flex items-center justify-center rounded-full text-[10px] focus:outline-none transition-colors shadow",
  {
    variants: {
      variant: {
        default: "bg-background-sub4 text-text-sub5",
        sub1: "bg-background-sub1 text-text-primary",
        sub2: "bg-background-sub2 text-text-primary",
        brand: "bg-brand-primary-500 text-text-primary",
        destructive: "bg-notification text-text-primary",
      },
      size: {
        xl: "h-[18px] w-[18px] -right-[6px] -top-[6px]",
        lg: "h-[18px] w-[18px] -right-[6px] -top-[6px]",
        md: "h-[14px] w-[14px] -right-[5px] -top-[5px]",
        sm: "h-[14px] w-[14px] -right-[5px] -top-[5px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const STARTING_INDEX = 0;
const MAX_NOTIFICATION_LENGTH = 1;

const parseNotification = (notification: string) => {
  if (notification.length === MAX_NOTIFICATION_LENGTH) return notification;

  return notification.slice(STARTING_INDEX, MAX_NOTIFICATION_LENGTH);
};

type Props = {
  notification?: string;
};
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants>,
    Props {}

function Badge({ className, variant, size, notification, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ size }), "relative")}>
      <div
        className={cn(
          badgeVariants({ variant, size }),
          "items-center justify-center",
          {
            "dot-mask-lg": notification && (size === "lg" || size === "xl"),
            "dot-mask-sm": notification && (size === "sm" || size === "md"),
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
      {notification && (
        <span className={cn(notificationVariants({ variant, size }))}>
          {parseNotification(notification)}
        </span>
      )}
    </div>
  );
}

export { Badge, badgeVariants };
