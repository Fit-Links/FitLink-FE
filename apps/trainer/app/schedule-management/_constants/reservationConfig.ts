/* eslint-disable no-magic-numbers */
import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

// 예약 상태별 설정 객체
type ReservationConfig = {
  style: string;
  content: (reservationContent: ModifiedReservationListItem) => string | null;
  ptStatus: ({
    reservationContents,
  }: {
    reservationContents?: ModifiedReservationListItem[];
  }) => string;
};

// 예약 변경 요청 필터링 X
// 캘린더 페이지 진입할때마다 캐시 날리고 쿼리 다시 가져오기
export const RESERVATION_CONFIG: Record<
  Exclude<
    ModifiedReservationListItem["status"],
    "휴무일" | "예약 취소 요청" | "예약 취소" | "예약 거절"
  >,
  ReservationConfig
> = {
  "예약 종료": {
    style: "bg-brand-primary-500 md:hover:bg-brand-primary-600",
    content: (reservationContent) => reservationContent.memberInfo.name,
    ptStatus: () => "PT 완료",
  },
  "예약 확정": {
    style: "bg-brand-primary-500 md:hover:bg-brand-primary-600",
    content: (reservationContent) => reservationContent.memberInfo.name,
    ptStatus: ({ reservationContents }) => `${reservationContents?.[0].status}`,
  },
  "예약 대기": {
    style: "bg-brand-secondary-500 md:hover:bg-brand-secondary-600",
    content: () => "대기",
    ptStatus: ({ reservationContents }) => `${reservationContents?.length}명`,
  },
  "예약 불가 설정": {
    style: "bg-background-sub2 md:hover:bg-background-sub3",
    content: () => "예약\n불가",
    ptStatus: () => "",
  },
  "고정 예약": {
    style: "bg-brand-primary-500 md:hover:bg-brand-primary-600",
    content: (reservationContent) => reservationContent.memberInfo.name,
    ptStatus: () => "고정 예약",
  },
  "예약 취소 거절": {
    style: "bg-brand-primary-500 md:hover:bg-brand-primary-600",
    content: (reservationContent) => reservationContent.memberInfo.name,
    ptStatus: () => "예약 확정",
  },
  "예약 변경 거절": {
    style: "bg-brand-primary-500 md:hover:bg-brand-primary-600",
    content: (reservationContent) => reservationContent.memberInfo.name,
    ptStatus: () => "예약 확정",
  },
  "예약 변경 요청": {
    style: "bg-brand-primary-500 md:hover:bg-brand-primary-600",
    content: (reservationContent) => reservationContent.memberInfo.name,
    ptStatus: () => "예약 변경 요청",
  },
};
