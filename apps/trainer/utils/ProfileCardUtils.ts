/* eslint-disable no-magic-numbers */
export const formatToMeridiem = (time: string) => {
  try {
    if (!/^\d{1,2}:\d{2}$/.test(time)) {
      throw new Error(`Invalid time format: "${time}" (Expected "HH:mm")`);
    }

    const [hour] = time.split(":").map(Number);

    if (hour < 0 || hour > 23 || isNaN(hour)) {
      throw new Error(`Invalid hour value: "${hour}" (Expected 0-23)`);
    }

    if (hour < 12) return `오전 ${hour === 0 ? hour + 12 : hour}시`;
    else return `오후 ${hour === 12 ? hour : hour - 12}시`;
  } catch (error) {
    console.error(error);
  }
};
