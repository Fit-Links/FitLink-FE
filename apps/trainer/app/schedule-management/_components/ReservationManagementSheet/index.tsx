import { ReservationStatus } from "@5unwan/core/api/types/common";

import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

import ReservationNotAllowedCancelSheet from "./ReservationNotAllowedCancelSheet";
import ReservationOutcomeSheet from "./ReservationOutcomeSheet";
import ReservationPendingSheet from "./ReservationPendingSheet";

type CommonSheetProps = {
  open: boolean;
  onChangeOpen: (open: boolean) => void;
  selectedDate: Date;
};

type ReservationSheetRenderer = (
  commonProps: CommonSheetProps,
  reservationContent: ModifiedReservationListItem[],
) => JSX.Element;

export const SheetAdapter: Record<
  Exclude<ReservationStatus, "휴무일" | "예약 취소 요청" | "예약 변경 요청" | "예약 취소">,
  ReservationSheetRenderer
> = {
  "예약 불가": (commonProps) => <ReservationNotAllowedCancelSheet {...commonProps} />,
  "예약 확정": (commonProps, reservationContent) => (
    <ReservationOutcomeSheet
      {...commonProps}
      memberInformation={reservationContent[0]}
      reservationStatus="예약 확정"
    />
  ),
  "수업 완료": (commonProps, reservationContent) => (
    <ReservationOutcomeSheet
      {...commonProps}
      memberInformation={reservationContent[0]}
      reservationStatus="수업 완료"
    />
  ),
  "예약 대기": (commonProps, reservationContent) => (
    <ReservationPendingSheet {...commonProps} memberInformations={reservationContent} />
  ),
};
