"use client";

import React from "react";

import VerificationPhoneContainer from "./_components/VerificationPhoneContainer";
import Header from "../../_components/Header";

// const REFETCH_INTERVAL = 5000;

const MOCK_TOKEN = "1234567890";

export default function VerifyPhone() {
  // const navigation = useRouter();

  // const [hasClicked, setHasClicked] = useState(false);

  const handleClick = () => {
    //   setHasClicked(true);
  };

  // const { data: tokenData, isPending: isTokenPending } = useQuery(authQueries.snsToken());

  // const { data: statusData } = useQuery({
  //   ...authQueries.status(),
  //   enabled: hasClicked,
  //   refetchInterval: (query) => {
  //     return REFETCH_INTERVAL;
  //   },
  // });

  // if (statusData && statusData.data) {
  //   const { status } = statusData.data;

  //   TODO: 휴대폰 변경 요청 상태 또한 필요로 되어 보임
  //   // REGISTER가 아닌 휴대폰 변경 요청 상태 또한 필요로 되어 보임

  //   navigation.back();
  // }

  return (
    <main className="flex h-screen w-full flex-col items-center justify-between">
      <Header title="휴대폰 인증" />
      <VerificationPhoneContainer onClick={handleClick} verificationToken={MOCK_TOKEN} />
    </main>
  );
}
