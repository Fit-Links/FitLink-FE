"use client";

import React from "react";

import HeaderProvider from "@user/components/Providers/HeaderProvider";

import { commonLayoutContents } from "@user/constants/styles";

import VerificationPhoneContainer from "./_components/VerificationPhoneContainer";

// const REFETCH_INTERVAL = 5000;

const MOCK_TOKEN = "1234567890";

export default function VerifyPhone() {
  // const router = useRouter();

  // const [hasClicked, setHasClicked] = useState(false);

  const handleClick = () => {
    //   setHasClicked(true);
  };

  // if (statusData && statusData.data) {
  //   const { status } = statusData.data;

  //   TODO: 휴대폰 변경 요청 상태 또한 필요로 되어 보임
  //   // REGISTER가 아닌 휴대폰 변경 요청 상태 또한 필요로 되어 보임

  //   router.back();
  // }

  return (
    <HeaderProvider title="휴대폰 인증" back>
      <main className={commonLayoutContents}>
        <VerificationPhoneContainer onClick={handleClick} verificationToken={MOCK_TOKEN} />
      </main>
    </HeaderProvider>
  );
}
