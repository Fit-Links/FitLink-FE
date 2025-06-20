import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { cn } from "@ui/lib/utils";

const DEFAULT_ICON_SIZE = 24;

type ChevronTriggerProps = React.ComponentProps<"div"> & {
  position?: "left" | "right";
  size?: number;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

const ChevronTrigger = React.forwardRef<HTMLDivElement, ChevronTriggerProps>(
  (
    { onClick, children, className, position = "right", size = DEFAULT_ICON_SIZE, ...props },
    ref,
  ) => (
    <div
      onClick={onClick}
      className={cn(
        "md:hover:bg-background-sub3 text-text-primary flex w-fit cursor-pointer items-center rounded-md bg-transparent transition-colors",
        className,
      )}
      ref={ref}
      {...props}
    >
      {position === "left" && <ChevronLeft size={size} />}
      {children}
      {position === "right" && <ChevronRight size={size} />}
    </div>
  ),
);
ChevronTrigger.displayName = "ChevronTrigger";

export default ChevronTrigger;
