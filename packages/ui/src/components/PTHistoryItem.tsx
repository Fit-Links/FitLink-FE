import { PtStatus } from "@5unwan/core/api/types/common";
import React from "react";

import { cn } from "@ui/lib/utils";

import { Badge } from "./Badge";
import { Text } from "./Text";
import DateController from "../lib/DateController";

const PTHistoryStatusMap = {
  SESSION_COMPLETED: () => "PT 완료",
  SESSION_NOT_ATTEND: () => "불참석",
  SESSION_WAITING: () => "예약 대기",
  NONE: (isClickable?: boolean) => (isClickable ? "PT가 완료되었나요?" : "미처리"),
} as const;

type PTHistoryItemProps = {
  reservationDate: string | Date;
  status: Exclude<PtStatus, "SESSION_CANCELLED">;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
};
function PTHistoryItem({ reservationDate, status, onClick, className }: PTHistoryItemProps) {
  try {
    const validatedController = DateController(reservationDate).validate();

    const isClickable = onClick && status === "NONE";
    if (validatedController === undefined) throw new Error("유효하지 않은 날짜 형식입니다");

    return (
      <div
        className={cn(
          "text-text-primary bg-background-sub1 flex min-h-[3.375rem] items-center justify-between rounded-[10px] px-[0.9375rem]",
          {
            "bg-background-sub2": isClickable,
          },
          className,
        )}
      >
        {validatedController.toServiceFormat().untilMinutes}
        {
          <Badge
            variant={isClickable ? "brand" : "sub2"}
            size="sm"
            onClick={isClickable ? onClick : undefined}
            className={cn("px-[10px]", {
              "hover:bg-brand-primary-500/90 cursor-pointer transition-colors": isClickable,
            })}
          >
            <Text.Headline1>{PTHistoryStatusMap[status](isClickable)}</Text.Headline1>
          </Badge>
        }
      </div>
    );
  } catch (e) {
    console.error(e);

    return;
  }
}

export default PTHistoryItem;
