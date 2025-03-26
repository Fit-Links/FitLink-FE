import { Check, CircleAlert } from "lucide-react";
import { useMemo } from "react";

import Spinner from "./Spinner";

export type Status = "pending" | "success" | "error" | "idle";
type StatusContent = {
  title: string;
  description?: string;
};
type RequestStatusProps = {
  status: Status;
  contentPerStatus: Partial<Record<"pending", StatusContent>> &
    Record<"success" | "error", StatusContent>;
};

function RequestStatus({ status, contentPerStatus }: RequestStatusProps) {
  const {
    success,
    error,
    pending = { title: "요청 중입니다", description: "잠시만 기다려 주세요" },
  } = contentPerStatus;
  const title = useMemo(
    () => ({
      success: success.title,
      error: error.title,
      pending: pending.title,
      idle: pending.title,
    }),
    [error.title, pending.title, success.title],
  );
  const description = useMemo(
    () => ({
      success: success.description,
      error: error.description,
      pending: pending.description,
      idle: pending.description,
    }),
    [error.description, pending.description, success.description],
  );

  return (
    <div className="flex flex-col items-center transition">
      <RequestStatusIcon status={status} />
      <RequestStatusTitle content={title[status]} />
      <RequestStatusDescription content={description[status]} />
    </div>
  );
}

const RequestStatusIconMap = {
  idle: Spinner,
  pending: Spinner,
  success: Check,
  error: CircleAlert,
} as const;

type RequestStatusIconProps = {
  status: Status;
};
function RequestStatusIcon({ status }: RequestStatusIconProps) {
  const Icon = RequestStatusIconMap[status];

  return (
    <div
      role={status === "pending" ? "status" : "img"}
      className="bg-brand-primary-500 mb-[1.75rem] flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-full"
    >
      <Icon className="text-text-primary" aria-hidden="true" />
    </div>
  );
}

type RequestStatusTitleProps = {
  content: string;
};
function RequestStatusTitle({ content }: RequestStatusTitleProps) {
  return <span className="text-text-primary text-title-1">{content}</span>;
}

type ReqeustStatusDescriptionProps = {
  content?: string;
};
function RequestStatusDescription({ content }: ReqeustStatusDescriptionProps) {
  return (
    content && <span className="text-text-primary text-subhead-2 mt-[0.875rem]">{content}</span>
  );
}

export default RequestStatus;
