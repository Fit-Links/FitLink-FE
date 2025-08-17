import { parseKoreanDateString } from "./parseKoreanDateString";

export const parseToChangeDate = (eventDateDescription: string) => {
  const splittedString = eventDateDescription.split(" -> ");
  // eslint-disable-next-line no-magic-numbers
  if (splittedString.length !== 2) throw new Error("변경 날짜가 유효하지 않습니다");

  const [, toChangeDateString] = splittedString;

  const toChangeDate = parseKoreanDateString(toChangeDateString);

  if (!toChangeDate) throw new Error("변경 날짜가 유효하지 않습니다");

  return toChangeDate;
};
