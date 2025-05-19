/* eslint-disable no-magic-numbers */
import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

// 예약 상태별 설정 객체
type ReservationConfig = {
  style: string;
  content: (reservationContent: ModifiedReservationListItem) => string | null;
  ptStatus: ({
    reservationContents,
    totalSession,
    remainingSession,
  }: {
    reservationContents?: ModifiedReservationListItem[];
    totalSession?: string;
    remainingSession?: string;
  }) => string;
};

export const RESERVATION_CONFIG: Record<
  Exclude<
    ModifiedReservationListItem["status"],
    "휴무일" | "예약 취소 요청" | "예약 변경 요청" | "예약 취소"
  >,
  ReservationConfig
> = {
  "수업 완료": {
    style: "bg-brand-primary-500 hover:bg-brand-primary-600",
    content: (reservationContent) => reservationContent.memberInfo.name,
    ptStatus: () => "PT 완료",
  },
  "예약 확정": {
    style: "bg-brand-primary-500 hover:bg-brand-primary-600",
    content: (reservationContent) => reservationContent.memberInfo.name,
    ptStatus: ({ totalSession, remainingSession }) =>
      `${remainingSession?.padStart(2, "0")}/${totalSession}`,
  },
  "예약 대기": {
    style: "bg-brand-secondary-500 hover:bg-brand-secondary-600",
    content: () => "대기",
    ptStatus: ({ reservationContents }) => `${reservationContents?.length}명`,
  },
  "예약 불가": {
    style: "bg-background-sub2 hover:bg-background-sub3",
    content: () => "예약\n불가",
    ptStatus: () => "",
  },
};
