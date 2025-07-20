"use client";

import { useQuery } from "@tanstack/react-query";
import PhoneVerification from "@ui/components/PhoneVerification";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { authQueries } from "@user/queries/auth";

import { UserVerificationStatus } from "@user/services/types/auth.dto";

const REFETCH_INTERVAL = 5000;
const BUTTON_AVAILABILITY_INTERVAL = 10000;

function SnsVerificationPage() {
  const router = useRouter();

  const [hasClicked, setHasClicked] = useState(false);
  const [isWaitingVerification, setIsWaitingVerification] = useState(false);

  const userStatusRef = useRef<UserVerificationStatus | null>(null);

  const handleClick = () => {
    setHasClicked(true);
    setIsWaitingVerification(true);
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

    if (status === "REQUIRED_REGISTER") router.push("/register");
  }

  useEffect(() => {
    if (!hasClicked) return;

    const intervalId = setInterval(() => {
      if (userStatusRef.current === "REQUIRED_SMS" && isWaitingVerification) {
        setIsWaitingVerification(false);
      }
    }, BUTTON_AVAILABILITY_INTERVAL);

    return () => clearInterval(intervalId);
  }, [hasClicked]);

  return (
    <PhoneVerification
      isWaitingVerification={isWaitingVerification}
      onClick={handleClick}
      verificationToken={
        tokenStatus === "success" && tokenData.success
          ? tokenData?.data.verificationToken
          : undefined
      }
    />
  );
}

export default SnsVerificationPage;
