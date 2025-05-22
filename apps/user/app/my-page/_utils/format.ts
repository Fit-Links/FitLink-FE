import { FixedReservation } from "@5unwan/core/api/types/common";

const PAD_LENGTH = 2;

const MINUTES_PER_SESSION = 50;
export const getFormattedPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");
};

export const formatDateTimeToKorean = (dateString: string): string => {
  const date = new Date(dateString);

  // 요일 매핑 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[date.getDay()];

  const hours = String(date.getHours()).padStart(PAD_LENGTH, "0");
  const minutes = String(date.getMinutes()).padStart(PAD_LENGTH, "0");

  return `${weekday} ${hours} : ${minutes} - ${hours} : ${Number(minutes) + MINUTES_PER_SESSION}`;
};

export const getISOToKoreanTime = (reservations: FixedReservation[]) => {
  return reservations.map((reservation) => ({
    ...reservation,
    formattedDateTime: formatDateTimeToKorean(reservation.reservationDateTime),
  }));
};

/**
 * 같은 요일과 시간을 가진 예약을 하나로 합치는 함수
 * @param reservations 예약 데이터 배열
 * @returns 중복이 제거된 예약 데이터 배열
 */
export const getUniqueTimeReservations = (reservations: FixedReservation[]): FixedReservation[] => {
  const uniqueMap = new Map<string, FixedReservation>();

  reservations.forEach((reservation) => {
    const formattedTime = formatDateTimeToKorean(reservation.reservationDateTime);
    if (!uniqueMap.has(formattedTime)) {
      uniqueMap.set(formattedTime, reservation);
    }
  });

  return Array.from(uniqueMap.values());
};
