import { cn } from "@ui/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

type TimeOptionProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};
type TimeOptionIconProps = HTMLAttributes<HTMLElement> & {
  className?: string;
};
type TimeOptionContentProps = HTMLAttributes<HTMLElement> & {
  className?: string;
};

const TimeOption = forwardRef<HTMLDivElement, TimeOptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "bg-background-sub1 hover:bg-brand-primary-500 flex h-[6.875rem] w-[6.24rem] flex-shrink-0 cursor-pointer flex-col justify-between rounded-[0.625rem] p-[0.75rem] leading-[1.125rem] transition-colors",
          className,
        )}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);

TimeOption.displayName = "TimeOption";

const TimeOptionIcon = forwardRef<HTMLDivElement, TimeOptionIconProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn(className)} ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

TimeOptionIcon.displayName = "TimeOptionIcon";

const TimeOptionContent = forwardRef<HTMLDivElement, TimeOptionContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn("text-body-2 text-text-primary", className)} ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

TimeOptionContent.displayName = "TimeOptionContent";

export { TimeOption, TimeOptionContent, TimeOptionIcon };
