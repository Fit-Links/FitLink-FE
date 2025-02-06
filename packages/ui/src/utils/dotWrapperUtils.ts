const STARTING_INDEX = 0;
const MAX_NOTIFICATION_LENGTH = 1;

export const parseNotification = (notification: string) => {
  if (notification.length === MAX_NOTIFICATION_LENGTH) return notification;

  return notification.slice(STARTING_INDEX, MAX_NOTIFICATION_LENGTH);
};
