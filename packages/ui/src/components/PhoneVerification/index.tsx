"use client";

import { useRef, useState } from "react";

import { Button } from "../Button";
import PhoneVerificationGuide from "./PhoneVerificationGuide";
import PhoneVerificationImage from "./PhoneVerificationImage";
import PhoneVerificationNotice from "./PhoneVerificationNotice";
import { Dialog, DialogContent } from "../Dialog";
import QRCodeGenerator from "../QRCodeGenerator";
import { Text } from "../Text";

type PhoneVerificationProps = {
  onClick: () => void;
  verificationToken?: string;
};

const generateSnsBody = (token?: string) => {
  return `[Fitlink]%0A${token}`;
};
function PhoneVerification({ onClick, verificationToken }: PhoneVerificationProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isQrCodeDialogOpen, setIsQrCodeDialogOpen] = useState(false);

  const handleButtonClick = () => {
    onClick();

    if (isDesktopCheck()) {
      setIsQrCodeDialogOpen(true);

      return;
    }

    linkRef.current?.click();
  };

  /** TODO: Utils로 추후 분리 */
  const isDesktopCheck = () => {
    if (typeof navigator !== "undefined") {
      const userAgent = navigator.userAgent.toLowerCase();

      const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);

      return !isMobile;
    }
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
      <Dialog open={isQrCodeDialogOpen} onOpenChange={setIsQrCodeDialogOpen}>
        <DialogContent className="p-10">
          <div className="flex items-center justify-center gap-20">
            <div className="flex flex-col items-center justify-center gap-4">
              <Text.Subhead1 className="font-bold">안드로이드</Text.Subhead1>
              <QRCodeGenerator
                value={`sms:${encodeURIComponent("verification@fitlink.biz")}?body=${encodeURIComponent(generateSnsBody(verificationToken))}`}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <Text.Subhead1 className="font-bold">아이폰</Text.Subhead1>
              <QRCodeGenerator
                value={`sms:verification@fitlink.biz&body=${generateSnsBody(verificationToken)}`}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

export default PhoneVerification;
