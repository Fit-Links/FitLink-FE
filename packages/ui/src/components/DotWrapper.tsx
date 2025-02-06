import { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "../lib/utils";
import { parseNotification } from "../utils/dotWrapperUtils";
import { colorVariants } from "./variants/withNotification";

const notificationVariants = cva(
  "absolute flex items-center justify-center rounded-full text-[10px] focus:outline-none transition-colors shadow",
  {
    variants: {
      variant: colorVariants,
      size: {
        xl: "h-[18px] w-[18px] -right-[6px] -top-[6px]",
        lg: "h-[18px] w-[18px] -right-[6px] -top-[6px]",
        md: "h-[14px] w-[14px] -right-[5px] -top-[5px]",
        sm: "h-[14px] w-[14px] -right-[5px] -top-[4.5px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type DotWrapperProps = React.ComponentProps<"div"> & {
  enabled: boolean;
  notification?: string;
} & VariantProps<typeof notificationVariants>;
function DotWrapper({
  children,
  enabled,
  notification = "",
  variant,
  size,
  ...props
}: DotWrapperProps) {
  return (
    <div className="relative w-fit" {...props}>
      {children}
      {enabled && (
        <span className={cn(notificationVariants({ variant, size }))}>
          {parseNotification(notification)}
        </span>
      )}
    </div>
  );
}

export default DotWrapper;
