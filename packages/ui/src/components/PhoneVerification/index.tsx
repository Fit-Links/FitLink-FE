"use client";

import { DialogTitle } from "@mui/material";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Check, Clipboard } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "../Button";
import PhoneVerificationGuide from "./PhoneVerificationGuide";
import PhoneVerificationImage from "./PhoneVerificationImage";
import PhoneVerificationNotice from "./PhoneVerificationNotice";
import { Dialog, DialogContent, DialogHeader } from "../Dialog";
import QRCodeGenerator from "../QRCodeGenerator";
import { Text } from "../Text";

type PhoneVerificationProps = {
  onClick: () => void;
  verificationToken?: string;
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
const formatToHTML = (message: string) => {
  const [header, content] = message.split("\n");

  return (
    <>
      {header}
      <br />
      {content}
    </>
  );
};
const copyToClipboard = async (text: string) => {
  if (typeof navigator === "undefined") return false;

  try {
    await navigator.clipboard.writeText(text);

    return true;
  } catch {
    alert("클립보드 복사에 실패했습니다. 수동으로 복사해주세요.");

    return false;
  }
};

function PhoneVerification({ onClick, verificationToken }: PhoneVerificationProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isQrCodeDialogOpen, setIsQrCodeDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleAndroidClick = async (token: string) => {
    const isCopied = await copyToClipboard(generateSnsBody("clipboard", token));
    if (!isCopied) return;

    window.location.href = `sms:`;
  };

  const handleButtonClick = () => {
    onClick();

    if (isDesktopCheck()) {
      setIsQrCodeDialogOpen(true);

      return;
    }

    if (isAndroidCheck()) {
      if (verificationToken) {
        handleAndroidClick(verificationToken);
      }
    } else linkRef.current?.click();
  };

  return (
    <main className="flex h-full w-full flex-col items-center">
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
            setIsMessageDialogOpen(true);
          }}
        >
          인증 메시지 확인하기
        </Button>
        <Button
          size="xl"
          className="text-headline shirink-0 min-h-[3.375rem] w-full"
          onClick={handleButtonClick}
          disabled={!verificationToken}
        >
          인증 메시지 보내기
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
      <Dialog
        open={isMessageDialogOpen}
        onOpenChange={(open) => {
          setIsMessageDialogOpen(open);
          setIsCopied(false);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>인증 메시지 확인</DialogTitle>
            <DialogDescription className="text-center">
              <span className="text-brand-primary-300">문자</span>로{" "}
              <span className="text-brand-primary-300 ">verification@fitlink.biz</span> 에게 인증
              메시지를 전송해주세요
            </DialogDescription>
          </DialogHeader>

          <div className="bg-background-sub3 mt-8 flex items-center justify-between rounded-lg p-2 pl-4">
            <p>{formatToHTML(generateSnsBody("clipboard", verificationToken))}</p>
            <Button
              variant={"outline"}
              className="h-10 w-10"
              onClick={async () => {
                if (isCopied) return;
                const copySuccessful = await copyToClipboard(
                  generateSnsBody("clipboard", verificationToken),
                );

                if (copySuccessful) setIsCopied(true);
              }}
            >
              {!isCopied ? <Clipboard /> : <Check />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

export default PhoneVerification;
