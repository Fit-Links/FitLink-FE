/* eslint-disable no-magic-numbers */
export function parseKoreanDateString(dateStr: string | null) {
  if (dateStr === null) throw new Error("Invalid date string format");
  // 현재 연도 사용 (필요시 인자로 받게 변경 가능)
  const currentYear = new Date().getFullYear();

  // 월, 일 추출
  const match = dateStr
    .replace(/[()\s]/g, "") // 괄호와 공백 제거
    .replace("오전", "AM")
    .replace("오후", "PM")
    .match(/(\d{2})\.(\d{2})[^\d]*(AM|PM)(\d{1,2})시/); // 정규식 매칭

  if (!match) {
    throw new Error("Invalid date string format");
  }

  const [monthStr, dayStr, meridiem, hourStr] = match.slice(1); // 첫 번째는 전체 match이므로 제외

  // 숫자 변환
  const month = parseInt(monthStr, 10) - 1; // JS는 0-based month
  const day = parseInt(dayStr, 10);
  let hour = parseInt(hourStr, 10);

  if (meridiem === "PM" && hour !== 12) {
    hour += 12;
  } else if (meridiem === "AM" && hour === 12) {
    hour = 0;
  }

  // Date 객체 생성
  return new Date(currentYear, month, day, hour);
}
