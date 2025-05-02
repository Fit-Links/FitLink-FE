export const parseEventDateFromContent = (content: string) => {
  return content.split("날짜: ")[1];
};

export const parseMessageFromContent = (content: string) => {
  return content.split("날짜: ")[0];
};
