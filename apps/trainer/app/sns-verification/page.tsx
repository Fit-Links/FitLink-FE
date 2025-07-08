"use client";

import { useQuery } from "@tanstack/react-query";
import PhoneVerification from "@ui/components/PhoneVerification";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { authQueries } from "@trainer/queries/auth";

import RouteInstance from "@trainer/constants/route";
import { commonLayoutContents } from "@trainer/constants/styles";

const REFETCH_INTERVAL = 5000;

function SnsVerificationPage() {
  const router = useRouter();

  const [hasClicked, setHasClicked] = useState(false);

  const handleClick = () => {
    setHasClicked(true);
  };

  const { data: tokenData, status: tokenStatus } = useQuery(authQueries.snsToken());
  //TODO: token 요청이 실패할 경우 정책 구현

  const { data: statusData } = useQuery({
    ...authQueries.status(),
    enabled: hasClicked,
    refetchInterval: (query) => {
      if (query.state.data?.data) {
        const { status } = query.state.data.data;
        if (status === "REQUIRED_REGISTER") return false;
      }

      return REFETCH_INTERVAL;
    },
  });

  if (statusData && statusData.data) {
    const { status } = statusData.data;

    if (status === "REQUIRED_REGISTER") router.push(RouteInstance.register());
  }

  return (
    <main className={commonLayoutContents}>
      <PhoneVerification
        onClick={handleClick}
        verificationToken={
          tokenStatus === "success" && tokenData.success
            ? tokenData?.data.verificationToken
            : undefined
        }
      />
    </main>
  );
}

export default SnsVerificationPage;
