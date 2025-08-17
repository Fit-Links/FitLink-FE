import Icon from "@ui/components/Icon";
import React from "react";

function ConnectionFallback() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="bg-brand-primary-500 flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-full">
        <Icon name="ShieldAlert" size="xl" />
      </div>
      <p className="text-title-3">트레이너와 연동 후 이용하실 수 있습니다</p>
    </section>
  );
}

export default ConnectionFallback;
