import { useRef } from "react";

import { Button } from "../Button";

export default function PhoneVerificationButton() {
  const verificationRef = useRef<HTMLAnchorElement>(null);

  const handleClickMoveToVerification = () => {
    if (!verificationRef.current) return;

    // TODO
    // 토큰 받아와서 HyperTextReference 에 적용
    // verificationRef.current.href = "sms:tpdlqj0514@gmail.com?body=TEST TOKEN";

    verificationRef.current?.click();
  };

  return (
    <section className="flex flex-1 flex-col justify-end pb-[2.125rem]">
      <a ref={verificationRef} className="hidden" />
      <Button
        className="text-headline  h-[3.375rem] w-full"
        onClick={handleClickMoveToVerification}
      >
        인증 메시지 보내기
      </Button>
    </section>
  );
}
