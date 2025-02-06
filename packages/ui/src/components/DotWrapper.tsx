import React from "react";

import { cn } from "../lib/utils";
import { parseNotification } from "../utils/dotWrapperUtils";

type Props = {
  children: React.ReactNode;
  enabled: boolean;
  notification: string;
};
function DotWrapper({ children, enabled, notification }: Props) {
  return (
    <div className="relative">
      {children}
      {enabled && (
        <span
          className={cn(
            "bg-brand-primary-500 text-text-primary absolute -right-[5px] -top-[5px] flex h-[14px] w-[14px] items-center justify-center rounded-full text-[10px] shadow transition-colors focus:outline-none",
          )}
        >
          {parseNotification(notification)}
        </span>
      )}
    </div>
  );
}

export default DotWrapper;
