import { forwardRef, HTMLAttributes, ReactNode } from "react";

type TimeOptionProps = HTMLAttributes<HTMLDivElement> & {
  optionIcon: ReactNode;
};

const TimeOption = forwardRef<HTMLDivElement, TimeOptionProps>(
  ({ optionIcon, children, ...props }, ref) => {
    return (
      <div
        className="bg-background-sub1 hover:bg-brand-primary-500 flex h-[6.875rem] w-[6.24rem] cursor-pointer flex-col justify-between rounded-[0.625rem] p-[0.75rem] leading-[1.125rem]"
        {...props}
        ref={ref}
      >
        {optionIcon}
        <span className="text-body-2 text-text-primary">{children}</span>
      </div>
    );
  },
);

TimeOption.displayName = "TimeOption";

export default TimeOption;
