import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import DotWrapper from "./DotWrapper";
import { cn } from "../lib/utils";
import { colorVariants, notificationVariants } from "./variants/notificationVariants";

const badgeVariants = cva(
  "inline-flex rounded-full font-medium transition-colors focus:outline-none border-transparent shadow",
  {
    variants: {
      variant: colorVariants,
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

type Props = {
  notification?: string;
};
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants>,
    Props {}

function Badge({ className, variant, size, notification, children, ...props }: BadgeProps) {
  return (
    <DotWrapper
      enabled={!!notification}
      notification={notification}
      notificationClassName={notificationVariants({ variant, size })}
    >
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
    </DotWrapper>
  );
}

export { Badge, badgeVariants };
