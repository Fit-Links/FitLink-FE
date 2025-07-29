import ConnectTrainerSheet from "./ConnectTrainerSheet";
import ReservationCancelSheet from "./ReservationCancelSheet";
import ReservationChangeSheet from "./ReservationChangeSheet";

type CommonSheetProps = {
  notificationId: number;
  open: boolean;
  onChangeOpen: (open: boolean) => void;
};

const SheetRenderer = {
  "트레이너 연동": (commonProps: CommonSheetProps) => <ConnectTrainerSheet {...commonProps} />,
  "트레이너 연동 해제": () => null,
  "예약 요청": () => null,
  "예약 변경": (
    commonProps: CommonSheetProps,
    eventInfo: {
      eventDate: string;
    },
  ) => <ReservationChangeSheet {...commonProps} eventDateDescription={eventInfo.eventDate} />,
  "예약 취소": (
    commonProps: CommonSheetProps,
    eventInfo: {
      eventDate: string;
      cancelReason?: string;
    },
  ) => (
    <ReservationCancelSheet
      {...commonProps}
      eventDateDescription={eventInfo.eventDate}
      cancelReason={eventInfo.cancelReason || ""}
    />
  ),
  세션: () => null,

  // TODO: [2025.07.27] v1 API hotfix 대응하기 위해 '세션' Sheet 사용 보류
  // 세션: (
  //   commonProps: CommonSheetProps,
  //   eventInfo: {
  //     eventDate: string;
  //   },
  // ) => <SessionCompleteSheet {...commonProps} eventDate={eventInfo.eventDate} />,
};

export default SheetRenderer;
