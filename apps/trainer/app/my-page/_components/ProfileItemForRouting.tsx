"use client";

import Icon from "@ui/components/Icon";
import { ProfileItem } from "@ui/components/ProfileItem";
import { cn } from "@ui/lib/utils";
import Link from "next/link";
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
  return (
    <Link href={url}>
      <ProfileItem variant={variant} className={cn(className)}>
        <Icon name="ChevronRight" size="lg" className="cursor-pointer" />
      </ProfileItem>
    </Link>
  );
}
