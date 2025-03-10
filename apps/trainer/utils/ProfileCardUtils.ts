/* eslint-disable no-magic-numbers */
export const formatToMeridiem = (time: string) => {
  if (!/^\d{1,2}:\d{2}$/.test(time)) {
    throw new Error(`Invalid time format: "${time}" (Expected "HH:mm")`);
  }

  const [hour, minute] = time.split(":").map(Number);

  if (hour < 0 || hour > 23) {
    throw new Error(`Invalid hour value: "${hour}" (Expected 0-23)`);
  }

  // 분 범위 체크
  if (minute < 0 || minute > 59) {
    throw new Error(`Invalid minute value: "${minute}" (Expected 0-59)`);
  }

  if (hour < 12) return `오전 ${hour === 0 ? hour + 12 : hour}시`;
  else return `오후 ${hour === 12 ? hour : hour - 12}시`;
};
