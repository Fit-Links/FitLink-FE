import { NotificationInfo } from "@5unwan/core/api/types/common";

import { NotificationStatus } from "../_types";

const handleNotificationFilter =
  (status: NotificationStatus) => (notification: NotificationInfo) => {
    if (status === "all") return true;
    else if (status === "pending") return !notification.isProcessed;
    else if (status === "complete") return notification.isProcessed;

    return true;
  };

export default handleNotificationFilter;
