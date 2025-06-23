export const parseEventDateFromContent = (content: string) => {
  return content.split("날짜: ")[1];
};

export const parseMessageFromContent = (content: string) => {
  return content.split("날짜: ")[0];
};

export const parseContent = (content: string) => {
  const [messageRaw, eventDateRaw, otherRaw] = content.split("\n");
  const message = messageRaw ? messageRaw.trim() : messageRaw;
  const eventDate = eventDateRaw ? eventDateRaw.trim().split("날짜: ")[1] : eventDateRaw;
  const other = otherRaw ? otherRaw.trim() : otherRaw;

  return {
    message,
    eventDate,
    other,
  };
};
