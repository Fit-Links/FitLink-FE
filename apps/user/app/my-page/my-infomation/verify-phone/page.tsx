"use client";

import { Button } from "@ui/components/Button";
import Header from "@ui/components/Header";
import { useRouter } from "next/navigation";
import React from "react";

export default function VerifyPhone() {
  const router = useRouter();

  const handleClickBack = () => {
    router.push("/my-page/my-infomation");
  };

  return (
    <main className="flex h-screen w-full flex-col items-center pb-[5.063rem]">
      <Header>
        <Header.Left>
          <Header.Back onClick={handleClickBack} />
        </Header.Left>
        <Header.Title content="휴대폰 인증" />
      </Header>
      <section className="relative h-full w-full">
        {/* //TODO - 
        // href 'sms:<email>:body?<token>' 형식으로 변경 */}
        <a>
          <Button className="absolute bottom-0 h-[3.375rem] w-full">휴대폰 변경</Button>
        </a>
      </section>
    </main>
  );
}
