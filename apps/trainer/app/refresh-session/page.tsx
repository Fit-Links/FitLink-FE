// app/refresh-token/page.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { saveReissuedTokens } from "@trainer/services/auth";

export default function RefreshSessionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  useEffect(() => {
    const refresh = async () => {
      try {
        const {
          data: { success },
        } = await saveReissuedTokens();

        if (success) router.replace(next);
        else router.replace("/login");
      } catch (err) {
        router.replace("/login");
      }
    };
    refresh();
  }, []);

  return <p>Refreshing session...</p>;
}
