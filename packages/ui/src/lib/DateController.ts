/* eslint-disable no-magic-numbers */

const DateController = (date: string | Date) => {
  const targetDate = typeof date === "string" ? new Date(date) : date;
  const currentDate = new Date();

  const isToday = () =>
    targetDate.getMonth() === currentDate.getMonth() &&
    targetDate.getDate() === currentDate.getDate();
  const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];

  const toServiceFormat = () => {
    const month = targetDate.getMonth() + 1;
    const parsedDate = targetDate.getDate();
    const hours = targetDate.getHours();
    const minutes = targetDate.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";

    const dayOfWeek = DAYS_OF_WEEK[targetDate.getDay()];
    const formattedMMDD = isToday() ? "오늘" : `${month}. ${parsedDate} (${dayOfWeek})`;
    const formattedHH = hours % 12 || 12;

    let serviceFormat = `${formattedMMDD} ${ampm} ${formattedHH}시`;
    if (minutes) serviceFormat += ` ${minutes}분`;

    return {
      untilDate: formattedMMDD,
      untilMinutes: serviceFormat,
    };
  };

  const toFormatKoreanDayOfWeek = () => {
    const dayOfTheweek = targetDate.getDay();

    switch (dayOfTheweek) {
      case 0: {
        return "일";
      }
      case 1: {
        return "월";
      }
      case 2: {
        return "화";
      }
      case 3: {
        return "수";
      }
      case 4: {
        return "목";
      }
      case 5: {
        return "금";
      }
      case 6: {
        return "토";
      }
    }
  };

  return {
    // 메서드 체이닝을 지원합니다
    validate: () => {
      try {
        if (typeof date === "string") {
          // YYYY-MM-DDTHH:mm 형식인지 검사
          const [year, month, rest] = date.split("-");
          const day = rest.slice(0, 2);
          const hours = rest.slice(3, 2);
          const minutes = rest.slice(6, 2);
          const values = [year, month, day, hours, minutes];

          if (values.some((value) => value === undefined)) return undefined;
          if (values.some((value) => isNaN(Number(value)))) return undefined;

          return DateController(date);
        }

        if (date instanceof Date && !isNaN(date.getTime())) return DateController(date);

        return undefined;
      } catch (e) {
        return undefined;
      }
    },
    // 메서드 체이닝을 지원하지 않습니다
    toRelative: () => {
      const differenceInMilliseconds = Number(currentDate) - Number(targetDate);

      const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
      const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
      const differenceInHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));

      if (!isToday()) return toServiceFormat().untilDate;
      if (differenceInSeconds < 60) return "방금 전";
      if (differenceInMinutes < 60) return `${differenceInMinutes}분 전`;

      return `${differenceInHours}시간 전`;
    },
    // 메서드 체이닝을 지원하지 않습니다
    toAbsolute: () => {
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth() + 1;
      const day = targetDate.getDate();
      const hours = targetDate.getHours();
      const minutes = targetDate.getMinutes();

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    },
    // 메서드 체이닝을 지원하지 않습니다
    toServiceFormat,
    // 메서드 체이닝을 지원하지 않습니다
    toFormatDateTimeWithDay: () => {
      const month = targetDate.getMonth() + 1;
      const day = targetDate.getDate();
      const hour = targetDate.getHours();
      const minute = targetDate.getMinutes();

      return `${month}. ${day} (${toFormatKoreanDayOfWeek()}) ${hour}:${minute}`;
    },
    // 메서드 체이닝을 지원하지 않습니다
    toFormatKoreanDayOfWeek,
  };
};

export default DateController;
