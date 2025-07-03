import React from "react";

export default function PhoneVerificationGuide() {
  return (
    <div className="text-body-1 mt-[1.875rem] flex w-full flex-col gap-[1.875rem]  px-[1.875rem]">
      <p>① 하단 [인증 메시지 보내기] 눌러주세요.</p>
      <div className="gap-1">
        <p>② 메시지 작성 창에서 인증 메시지가 자동으로 입력되어 있어요.</p>
        <p className="text-body-3 text-text-sub2">
          * <span className="text-brand-primary-300">안드로이드 기기</span> 인 경우, 인증 메시지를{" "}
          <span className="text-brand-primary-300">클립보드에 복사하여 메신저로 이동</span>합니다.
        </p>
      </div>

      <p>
        ③ 인증 메시지를 그대로{" "}
        <span className="text-brand-primary-300">verification@fitlink.biz</span>로 보내주세요.
      </p>
    </div>
  );
}
