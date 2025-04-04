import { DIGIT_LENGTH } from "@user/constants/count";

export const getFormattedPTCount = (remainingCount: number, totalCount: number): string => {
  const formattedRemaining = remainingCount.toString().padStart(DIGIT_LENGTH, "0");
  const formattedTotal = totalCount.toString().padStart(DIGIT_LENGTH, "0");

  return `${formattedRemaining}/${formattedTotal}`;
};
