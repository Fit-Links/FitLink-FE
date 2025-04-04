import { ProfileItem } from "@ui/components/ProfileItem";
import React from "react";

interface MemorizedProfileItemProps {
  type: "name" | "birthday" | "phone";
  value: string;
}

export const MemorizedProfileItem = React.memo(({ type, value }: MemorizedProfileItemProps) => {
  return (
    <ProfileItem className="w-full" variant={type}>
      <label>{value}</label>
    </ProfileItem>
  );
});
MemorizedProfileItem.displayName = "MemorizedProfileItem";
