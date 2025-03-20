import React from "react";

import { Button } from "../Button";

// TODO: 휴대폰 인증 로직 구현 완료 후 수정
type PhoneNumberStepProps = {
  onNext: (phoneNumber: string) => void;
};
function PhoneNumberStep({ onNext }: PhoneNumberStepProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <Button onClick={() => onNext("010-9999-9999")} className="w-full">
        다음
      </Button>
    </div>
  );
}

export default PhoneNumberStep;
