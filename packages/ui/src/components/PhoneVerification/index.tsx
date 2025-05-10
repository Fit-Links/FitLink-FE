"use client";

import { useRef } from "react";

import { Button } from "../Button";
import PhoneVerificationGuide from "./PhoneVerificationGuide";
import PhoneVerificationImage from "./PhoneVerificationImage";
import PhoneVerificationNotice from "./PhoneVerificationNotice";

type PhoneVerificationProps = {
  onClick: () => void;
  verificationToken?: string;
};

const generateSnsBody = (token?: string) => {
  return `[Fitlink]%0A${token}`;
};
function PhoneVerification({ onClick, verificationToken }: PhoneVerificationProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const handleButtonClick = () => {
    linkRef.current?.click();
    onClick();
  };

  return (
    <main className="flex h-full w-full flex-col items-center">
      <PhoneVerificationGuide />
      <PhoneVerificationImage />
      <PhoneVerificationNotice />
      <Button
        size="xl"
        className="text-headline w-full"
        onClick={handleButtonClick}
        disabled={!verificationToken}
      >
        인증 메시지 보내기
      </Button>
      <a
        ref={linkRef}
        href={`sms:verification@fitlink.biz&body=${generateSnsBody(verificationToken)}`}
        className="hidden"
        aria-label="verification-link"
      />
    </main>
  );
}

export default PhoneVerification;
