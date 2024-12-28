import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-transparent px-3 py-[7px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow",
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
        large: "h-[32px] text-[17px]",
        medium: "h-[29px] text-[15px]",
        small: "h-[25px] text-[13px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "medium",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
