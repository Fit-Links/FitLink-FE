"use client";

import { useRef, useState } from "react";

import { Button } from "../Button";
import PhoneVerificationGuide from "./PhoneVerificationGuide";
import PhoneVerificationImage from "./PhoneVerificationImage";
import PhoneVerificationNotice from "./PhoneVerificationNotice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../Dialog";
import QRCodeGenerator from "../QRCodeGenerator";
import { Text } from "../Text";
import VerificationInfoDialog from "./VerificationInfoDialog";
import BrandSpinner from "../BrandSpinner";

type PhoneVerificationProps = {
  onClick: () => void;
  verificationToken?: string;
  isWaitingVerification: boolean;
};

/** TODO: Utils로 추후 분리 */
const isDesktopCheck = () => {
  if (typeof navigator !== "undefined") {
    const userAgent = navigator.userAgent.toLowerCase();

    const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);

    return !isMobile;
  }
};
const isAndroidCheck = () => {
  if (typeof navigator !== "undefined") {
    const userAgent = navigator.userAgent.toLowerCase();

    const isAndroid = /android/i.test(userAgent);

    return isAndroid;
  }
};

const generateSnsBody = (type: "link" | "clipboard", token?: string) => {
  return `[Fitlink]${type === "clipboard" ? "\n" : "%0A"}${token}`;
};

function PhoneVerification({
  onClick,
  verificationToken,
  isWaitingVerification,
}: PhoneVerificationProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isQrCodeDialogOpen, setIsQrCodeDialogOpen] = useState(false);
  const [isVerificationInfoDialogOpen, setIsVerificationInfoDialogOpen] = useState(false);

  const handleAndroidClick = async () => {
    window.location.href = `sms:`;
  };

  const handleButtonClick = () => {
    onClick();

    if (isDesktopCheck()) {
      setIsQrCodeDialogOpen(true);

      return;
    }

    if (isAndroidCheck()) {
      handleAndroidClick();
    } else linkRef.current?.click();
  };

  return (
    <>
      <section className="mb-4">
        <PhoneVerificationGuide />
        <PhoneVerificationImage />
        <PhoneVerificationNotice />
      </section>
      <div className="flex w-full flex-col items-center gap-4">
        <Button
          size="md"
          corners={"pill"}
          variant={"negative"}
          iconLeft="CircleHelp"
          className="shink-0 min-h-[2.5rem]"
          onClick={() => {
            setIsVerificationInfoDialogOpen(true);
          }}
        >
          인증 메시지 확인하기
        </Button>
        <Button
          size="xl"
          className="text-headline shirink-0 min-h-[3.375rem] w-full"
          onClick={handleButtonClick}
          disabled={!verificationToken || isWaitingVerification}
        >
          {isWaitingVerification ? <BrandSpinner /> : "인증 메시지 보내기"}
        </Button>
      </div>

      <a
        ref={linkRef}
        href={`sms:verification@fitlink.biz&body=${generateSnsBody("link", verificationToken)}`}
        className="hidden"
        aria-label="verification-link"
      />
      <Dialog open={isQrCodeDialogOpen} onOpenChange={setIsQrCodeDialogOpen}>
        <DialogContent className="p-10">
          <DialogHeader>
            <DialogTitle>인증 메세지 전송</DialogTitle>
            <DialogDescription>
              모바일 기기로 QR 코드를 스캔하여 인증 메세지를 전송해주세요
            </DialogDescription>
          </DialogHeader>
          <div className="mt-10 flex items-center justify-center gap-20">
            <div className="bg-background-sub4 flex flex-col items-center justify-center gap-4 rounded-3xl  p-4 pt-1">
              <Text.Subhead1 className="font-bold">Android</Text.Subhead1>
              <div className="rounded-lg bg-white p-4">
                <QRCodeGenerator
                  value={`sms:${encodeURIComponent("verification@fitlink.biz")}?body=${encodeURIComponent(generateSnsBody("link", verificationToken))}`}
                />
              </div>
            </div>
            <div className="bg-background-sub4 flex flex-col items-center justify-center gap-4 rounded-3xl  p-4 pt-1">
              <Text.Subhead1 className="font-bold">IOS</Text.Subhead1>
              <div className="rounded-lg bg-white p-4">
                <QRCodeGenerator
                  value={`sms:verification@fitlink.biz&body=${generateSnsBody("link", verificationToken)}`}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <VerificationInfoDialog
        open={isVerificationInfoDialogOpen}
        onOpenChange={setIsVerificationInfoDialogOpen}
        verificationMessage={generateSnsBody("clipboard", verificationToken)}
      />
    </>
  );
}

export default PhoneVerification;
