import { ProfileItem, ProfileItemVariants } from "@ui/components/ProfileItem";
import { cn } from "@ui/lib/utils";
import React from "react";

type MemorizedProfileItemProps = {
  variant: keyof typeof ProfileItemVariants;
  className?: string;
  value: string;
  children?: React.ReactNode;
};

export const MemorizedProfileItem = React.memo(
  ({ variant, className, value, children }: MemorizedProfileItemProps) => {
    return (
      <ProfileItem
        className={cn("w-full", className)}
        variant={variant as keyof typeof ProfileItemVariants}
      >
        {value}
        {children}
      </ProfileItem>
    );
  },
);
