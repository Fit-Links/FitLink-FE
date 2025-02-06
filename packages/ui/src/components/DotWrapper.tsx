import React from "react";

import { cn } from "../lib/utils";
import { parseNotification } from "../utils/dotWrapperUtils";
import { notificationVariants } from "./variants/notificationVariants";

type Props = {
  children: React.ReactNode;
  enabled: boolean;
  notification?: string;
  notificationClassName?: string;
};
function DotWrapper({ children, enabled, notification = "", notificationClassName }: Props) {
  return (
    <div className="relative w-fit">
      {children}
      {enabled && (
        <span
          className={cn(
            notificationVariants({ variant: "brand", size: "xl" }),
            notificationClassName,
          )}
        >
          {parseNotification(notification)}
        </span>
      )}
    </div>
  );
}

export default DotWrapper;
