import {
  Calendar,
  CalendarX2,
  Dumbbell,
  HeartHandshake,
  History,
  UserRoundX,
  X,
} from "lucide-react";

import { Variant } from "./variants";
import { cn } from "../../lib/utils";

const NumberIconMap = {
  exerciseConfirm: -1,
  session: 5,
};

const NumberIcon = (value: number) => {
  function NumberIconComponent({ className }: { className?: string }) {
    return (
      <div className={cn("flex items-center justify-center text-center", className)}>{value}</div>
    );
  }

  return NumberIconComponent;
};

const NotificationIconMap = {
  preExercise: Dumbbell,
  postExercise: Dumbbell,
  exerciseConfirm: NumberIcon(NumberIconMap["exerciseConfirm"]),
  reserve: Calendar,
  cancel: CalendarX2,
  edit: History,
  connect: HeartHandshake,
  disconnect: UserRoundX,
  deny: X,
  session: NumberIcon(NumberIconMap["session"]),
} as const;

function NotificationIcon({
  className,
  variant = "preExercise",
}: {
  className?: string;
  variant: Variant;
}) {
  const Icon = NotificationIconMap[variant];

  return <Icon className={cn("text-text-primary", className)} />;
}

function IconThumbnail({
  className,
  variant,
  size,
  isCompleted,
}: {
  className?: string;
  variant: Variant;
  size: "sm" | "lg";
  isCompleted: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-brand-primary-500 flex h-[1.5rem] w-[1.5rem] items-center justify-center rounded-full transition-colors",
        {
          "bg-background-sub2": isCompleted,
        },
        className,
      )}
    >
      <NotificationIcon
        variant={variant}
        className={cn(
          {
            "text-text-sub3": isCompleted,
          },
          size === "sm"
            ? "h-[0.6875rem] w-[0.6875rem] text-[0.6875rem]"
            : "h-[1.875rem] w-[1.875rem] text-[1.875rem]",
        )}
      />
    </div>
  );
}

export default IconThumbnail;
