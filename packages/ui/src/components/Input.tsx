import * as React from "react";

import { cn } from "../lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "placeholder:text-text-sub3 bg-background-sub3 text-body-1 text-text-primary flex h-[45px] w-[358px] rounded-[10px] px-[13px] py-2.5 shadow-sm transition-colors focus-visible:outline-none disabled:cursor-not-allowed",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
