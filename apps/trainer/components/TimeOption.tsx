import { cn } from "@ui/lib/utils";
import { icons } from "lucide-react";
import { ComponentProps, forwardRef } from "react";

type TimeOptionProps = ComponentProps<"div"> & {
  className?: string;
};
type TimeOptionIconProps = ComponentProps<"div"> & {
  iconName: keyof typeof icons;
  className?: string;
};
type TimeOptionContentProps = ComponentProps<"div"> & {
  className?: string;
};

const TimeOptionRoot = forwardRef<HTMLDivElement, TimeOptionProps>(
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

TimeOptionRoot.displayName = "TimeOptionRoot";

const TimeOptionIcon = forwardRef<HTMLDivElement, TimeOptionIconProps>(
  ({ className, iconName, ...props }, ref) => {
    const Icon = icons[iconName];

    return (
      <div className={cn("text-text-primary", className)} ref={ref} {...props}>
        <Icon />
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

const TimeOption = Object.assign(TimeOptionRoot, {
  Icon: TimeOptionIcon,
  Content: TimeOptionContent,
});

export default TimeOption;
