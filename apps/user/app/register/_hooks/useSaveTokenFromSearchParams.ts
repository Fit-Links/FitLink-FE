import { setLocalStorage } from "@5unwan/core/utils/localStorage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@user/constants/token";

export const useSaveTokenFromSearchParams = () => {
  const isInitializedRef = React.useRef(false);
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    if (isInitializedRef.current) return;

    isInitializedRef.current = true;

    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    setLocalStorage(ACCESS_TOKEN_KEY, accessToken);
    setLocalStorage(REFRESH_TOKEN_KEY, refreshToken);

    router.replace(pathname);
  }, []);
};
