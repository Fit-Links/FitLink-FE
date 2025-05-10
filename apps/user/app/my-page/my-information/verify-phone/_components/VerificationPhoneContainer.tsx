import { Button } from "@ui/components/Button";
import PhoneVerificationGuide from "@ui/components/PhoneVerification/PhoneVerificationGuide";
import PhoneVerificationImage from "@ui/components/PhoneVerification/PhoneVerificationImage";
import PhoneVerificationNotice from "@ui/components/PhoneVerification/PhoneVerificationNotice";
import React, { useRef } from "react";

type VerificationPhoneContainerProps = Readonly<{
  onClick: () => void;
  verificationToken?: string;
}>;

const generateSnsBody = (token?: string) => {
  return `[Fitlink]\n${token}`;
};

export default function VerificationPhoneContainer({
  onClick,
  verificationToken,
}: VerificationPhoneContainerProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleButtonClick = () => {
    console.log("click");
    linkRef.current?.setAttribute(
      "href",
      `sms:verification@fitlink.biz?body=${generateSnsBody(verificationToken)}`,
    );
    linkRef.current?.click();

    onClick();
  };

  return (
    <section className="flex h-full w-full flex-col items-center">
      <PhoneVerificationGuide />
      <PhoneVerificationNotice />
      <PhoneVerificationImage />

      <div className="relative w-full flex-1 flex-col justify-center">
        <Button
          size="xl"
          className="text-headline absolute bottom-[2.125rem] w-full"
          onClick={handleButtonClick}
          disabled={!verificationToken}
        >
          인증 메시지 보내기
        </Button>
        <a
          ref={linkRef}
          href={`sms:verification@fitlink.biz?body=${generateSnsBody(verificationToken)}`}
          className="hidden"
          aria-label="verification-link"
        />
      </div>
    </section>
  );
}
