"use client";

import { useQuery } from "@tanstack/react-query";
import PhoneVerification from "@ui/components/PhoneVerification";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { authQueries } from "@user/queries/auth";

const REFETCH_INTERVAL = 5000;

function SnsVerificationPage() {
  const navigation = useRouter();

  const [hasClicked, setHasClicked] = useState(false);

  const handleClick = () => {
    setHasClicked(true);
  };

  const { data: tokenData, isPending: isTokenDataPending } = useQuery(authQueries.snsToken());

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

    if (status === "REQUIRED_REGISTER") navigation.push("/register");
  }

  return (
    <PhoneVerification
      onClick={handleClick}
      verificationToken={!isTokenDataPending ? tokenData?.data.verificationToken : undefined}
    />
  );
}

export default SnsVerificationPage;
