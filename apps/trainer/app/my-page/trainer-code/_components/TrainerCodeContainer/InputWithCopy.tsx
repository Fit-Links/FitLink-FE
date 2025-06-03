"use client";

import Icon from "@ui/components/Icon";
import { Input } from "@ui/components/Input";
import React, { ComponentProps, useRef, useState } from "react";

type CodeInputProps = ComponentProps<"input">;
const TRAINER_CODE_MAX_LENGTH = 6;

export default function InputWithCopy({ ...props }: CodeInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [copied, setCopied] = useState(false);

  const handleClickCopy = () => {
    if (inputRef.current) {
      setCopied(true);
      navigator.clipboard.writeText(inputRef.current.value);
    }
  };

  return (
    <section className="mt-[3.75rem] flex h-full w-full flex-col items-center justify-center gap-2">
      <div className="relative" onClick={handleClickCopy}>
        <Input
          ref={inputRef}
          className="bg-background-sub2 relative h-[3.75rem] w-[14.25rem] text-center  text-[2rem] tracking-[0.4rem]"
          maxLength={TRAINER_CODE_MAX_LENGTH}
          value={props.value}
          readOnly={true}
          {...props}
        />

        <Icon
          name="Copy"
          size="lg"
          className="text-text-sub2 absolute  -right-10 top-1/2 w-[1.563rem] -translate-y-1/2  cursor-pointer "
        />
      </div>
      {copied && (
        <p className="text-brand-primary-500 text-body-1 mt-[2rem]">클립보드에 복사되었습니다.</p>
      )}
    </section>
  );
}
