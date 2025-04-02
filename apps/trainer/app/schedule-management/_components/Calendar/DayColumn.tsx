// date-fns 활용
import { ReactNode } from "react";

type DayColumnProps = {
  children?: ReactNode;
};

export default function DayColumn({ children }: DayColumnProps) {
  // TODO: 예약/일정 관련 API가 나오면 상위에서 reservationStatus 내려주는 로직 작성

  return <div className="flex h-max w-full snap-start flex-col gap-[0.0625rem]">{children}</div>;
}
