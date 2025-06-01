import ConnectTrainerSheet from "./ConnectTrainerSheet";
import ReservationCancelSheet from "./ReservationCancelSheet";
import ReservationChangeSheet from "./ReservationChangeSheet";
import SessionCompleteSheet from "./SessionCompleteSheet";

type CommonSheetProps = {
  notificationId: number;
  open: boolean;
  onChangeOpen: (open: boolean) => void;
};

const SheetRenderer = {
  "트레이너 연동": (commonProps: CommonSheetProps) => <ConnectTrainerSheet {...commonProps} />,
  "트레이너 연동 해제": () => null,
  "예약 요청": () => null,
  "예약 변경": (commonProps: CommonSheetProps, eventDateDescription: string) => (
    <ReservationChangeSheet {...commonProps} eventDateDescription={eventDateDescription} />
  ),
  "예약 취소": (commonProps: CommonSheetProps, eventDateDescription: string) => (
    <ReservationCancelSheet {...commonProps} eventDateDescription={eventDateDescription} />
  ),
  세션: (commonProps: CommonSheetProps, eventDateDescription: string) => (
    <SessionCompleteSheet {...commonProps} eventDate={eventDateDescription} />
  ),
};

export default SheetRenderer;
