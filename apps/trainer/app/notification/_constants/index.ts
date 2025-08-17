export const notificationMap = Object.freeze({
  all: Object.freeze({
    type: "전체",
    queryType: "ALL",
  }),
  connect: Object.freeze({
    type: "트레이너 연동",
    queryType: "CONNECT",
  }),
  disconnect: Object.freeze({
    type: "트레이너 연동 해제",
    queryType: "DISCONNECT",
  }),
  reservation: Object.freeze({
    type: "예약 요청",
    queryType: "RESERVATION_REQUEST",
  }),
  "reservation-cancel": Object.freeze({
    type: "예약 취소",
    queryType: "RESERVATION_CANCEL",
  }),
  "reservation-change": Object.freeze({
    type: "예약 변경",
    queryType: "RESERVATION_CHANGE",
  }),
  session: Object.freeze({
    type: "세션",
    queryType: "SESSION",
  }),
});
