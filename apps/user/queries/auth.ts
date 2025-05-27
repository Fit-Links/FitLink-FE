import { queryOptions } from "@tanstack/react-query";

import {
  getSnsVerificationToken,
  getUserVerificationStatus,
  reissueToken,
} from "@user/services/auth";

export const authBaseKeys = {
  all: () => ["auth"] as const,
};

export const authQueries = {
  status: () =>
    queryOptions({
      queryKey: [...authBaseKeys.all(), "status"],
      queryFn: getUserVerificationStatus,
    }),
  snsToken: () =>
    queryOptions({
      queryKey: [...authBaseKeys.all(), "snsToken"],
      queryFn: getSnsVerificationToken,
    }),
  reissueToken: (refreshToken: string) =>
    queryOptions({
      queryKey: [...authBaseKeys.all(), "reissueToken", refreshToken],
      queryFn: () => reissueToken({ refreshToken }),
    }),
};
