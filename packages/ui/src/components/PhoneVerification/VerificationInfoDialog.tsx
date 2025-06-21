"use client";

import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

import { copyToClipboard } from "@ui/utils/copyToClipboard";

import { Button } from "../Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../Dialog";

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

const createClipboardClickHandler =
  (content: string, setIsCopied: (copied: boolean) => void) => async () => {
    const copySuccessful = await copyToClipboard(content);

    if (copySuccessful) setIsCopied(true);
  };

type VerificationInfoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  verificationMessage: string;
};

const ANIMATION_DURATION = 100;
const VERIFICATION_EMAIL = "verification@fitlink.biz";

function VerificationInfoDialog({
  open,
  onOpenChange,
  verificationMessage,
}: VerificationInfoDialogProps) {
  const [isContactCopied, setIsContactCopied] = useState(false);
  const [isContentCopied, setIsContentCopied] = useState(false);

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    // Dialog 닫힘 animation이 끝날 때까지 상태변화를 미룹니다
    setTimeout(() => setIsContactCopied(false), ANIMATION_DURATION);
    setTimeout(() => setIsContentCopied(false), ANIMATION_DURATION);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>인증 메시지 확인</DialogTitle>
          <DialogDescription className="text-center">
            <span className="text-brand-primary-300">문자</span>로{" "}
            <span className="text-brand-primary-300 ">{VERIFICATION_EMAIL}</span> 에게 인증 메시지를
            전송해주세요
          </DialogDescription>
        </DialogHeader>
        <label className="mt-4">
          <span className="text-body-2">받는 사람</span>
          <div className="bg-background-sub3 flex items-center justify-between rounded-lg p-2 pl-4">
            <p>{VERIFICATION_EMAIL}</p>
            <Button
              variant={"outline"}
              className="h-10 w-10"
              onClick={createClipboardClickHandler(VERIFICATION_EMAIL, setIsContactCopied)}
            >
              {!isContactCopied ? <Clipboard /> : <Check />}
            </Button>
          </div>
        </label>

        <label className="mt-4">
          <span className="text-body-2">인증 메시지</span>
          <div className="bg-background-sub3 flex items-center justify-between rounded-lg p-2 pl-4">
            <p>{formatToHTML(verificationMessage)}</p>
            <Button
              variant={"outline"}
              className="h-10 w-10"
              onClick={createClipboardClickHandler(verificationMessage, setIsContentCopied)}
            >
              {!isContentCopied ? <Clipboard /> : <Check />}
            </Button>
          </div>
        </label>
      </DialogContent>
    </Dialog>
  );
}

export default VerificationInfoDialog;
