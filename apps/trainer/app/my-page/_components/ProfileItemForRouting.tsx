"use client";

import Icon from "@ui/components/Icon";
import { ProfileItem } from "@ui/components/ProfileItem";
import { cn } from "@ui/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

type ProfileItemForRoutingProps = {
  className?: string;
  variant: "code" | "calendar";
  url: string;
};

export default function ProfileItemForRouting({
  className,
  variant,
  url,
}: ProfileItemForRoutingProps) {
  const router = useRouter();

  const handleClickRouting = () => {
    router.push(url);
  };

  return (
    <ProfileItem variant={variant} className={cn(className)}>
      <Icon name="ChevronRight" size="lg" onClick={handleClickRouting} />
    </ProfileItem>
  );
}
