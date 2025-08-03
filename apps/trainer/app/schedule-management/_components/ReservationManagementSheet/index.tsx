import { ReservationStatus } from "@5unwan/core/api/types/common";
import { isPast, parseISO } from "date-fns";

import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

import ReservationChangeRequestBottomSheet from "./ReservationChangeRequestBottomSheet";
import ReservationControlSheet from "./ReservationControlSheet";
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

const isReservationPast = (reservation: ModifiedReservationListItem): boolean => {
  const reservationDateStr = reservation.reservationDates[0];

  const reservationDate = parseISO(reservationDateStr);

  return isPast(reservationDate);
};

export const SheetAdapter: Record<
  Exclude<ReservationStatus, "휴무일" | "예약 취소 요청" | "예약 취소" | "예약 거절">,
  ReservationSheetRenderer
> = {
  "예약 불가 설정": (commonProps, reservationContent) => (
    <ReservationNotAllowedCancelSheet
      {...commonProps}
      reservationId={reservationContent[0].reservationId}
    />
  ),
  "예약 확정": (commonProps, reservationContent) => {
    return isReservationPast(reservationContent[0]) ? (
      <ReservationOutcomeSheet
        {...commonProps}
        memberInformation={reservationContent[0]}
        reservationStatus="예약 확정"
      />
    ) : (
      <ReservationControlSheet
        {...commonProps}
        memberInformation={reservationContent[0]}
        reservationStatus="예약 확정"
      />
    );
  },
  "예약 종료": (commonProps, reservationContent) => (
    <ReservationOutcomeSheet
      {...commonProps}
      memberInformation={reservationContent[0]}
      reservationStatus="예약 종료"
    />
  ),
  "예약 대기": (commonProps, reservationContent) => (
    <ReservationPendingSheet {...commonProps} memberInformations={reservationContent} />
  ),
  "고정 예약": (commonProps, reservationContent) => {
    return isReservationPast(reservationContent[0]) ? (
      <ReservationOutcomeSheet
        {...commonProps}
        memberInformation={reservationContent[0]}
        reservationStatus="고정 예약"
      />
    ) : (
      <ReservationControlSheet
        {...commonProps}
        memberInformation={reservationContent[0]}
        reservationStatus="고정 예약"
      />
    );
  },
  "예약 취소 거절": (commonProps, reservationContent) => {
    return isReservationPast(reservationContent[0]) ? (
      <ReservationOutcomeSheet
        {...commonProps}
        memberInformation={reservationContent[0]}
        reservationStatus="예약 확정"
      />
    ) : (
      <ReservationControlSheet
        {...commonProps}
        memberInformation={reservationContent[0]}
        reservationStatus="예약 확정"
      />
    );
  },
  "예약 변경 거절": (commonProps, reservationContent) => {
    return isReservationPast(reservationContent[0]) ? (
      <ReservationOutcomeSheet
        {...commonProps}
        memberInformation={reservationContent[0]}
        reservationStatus="예약 확정"
      />
    ) : (
      <ReservationControlSheet
        {...commonProps}
        memberInformation={reservationContent[0]}
        reservationStatus="예약 확정"
      />
    );
  },
  "예약 변경 요청": (commonProps, reservationContent) => (
    <ReservationChangeRequestBottomSheet
      {...commonProps}
      memberInformation={reservationContent[0]}
    />
  ),
};
