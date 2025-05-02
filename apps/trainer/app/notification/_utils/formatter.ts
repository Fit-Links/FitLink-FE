const PAD_LENGTH = 2;
const PAD_STRING = "0";

export const formatSessionData = (remainingCount: number, totalCount: number) => {
  return `${String(remainingCount).padStart(PAD_LENGTH, PAD_STRING)}/${String(totalCount).padStart(PAD_LENGTH, PAD_STRING)}`;
};
