import { FixedReservation } from "@5unwan/core/api/types/common";

import { getKoreanDate } from "@user/utils/date";

const PAD_LENGTH = 2;

const MINUTES_PER_SESSION = 50;

export const formatDateTimeToKorean = (dateString: string): string => {
  const date = getKoreanDate(dateString);

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
