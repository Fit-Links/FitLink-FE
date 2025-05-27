import { InfiniteData } from "@tanstack/react-query";

import { GetNotificationApiResponse } from "@trainer/services/types/notification.dto";

import { NotificationStatus } from "../_types";
import handleNotificationFilter from "./handleNotificationFilter";

const INITIAL_VALUE = 0;

const createFilteredNotificationCount = (
  data: InfiniteData<GetNotificationApiResponse, unknown>,
  status: NotificationStatus,
) =>
  data.pages.reduce(
    (acc, cur) => acc + cur.data.content.filter(handleNotificationFilter(status)).length,
    INITIAL_VALUE,
  );

export default createFilteredNotificationCount;
