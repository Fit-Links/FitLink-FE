"use client";

import Icon from "@ui/components/Icon";
import { Input } from "@ui/components/Input";
import React, { ComponentProps, useRef } from "react";
import { toast } from "sonner";

type CodeInputProps = ComponentProps<"input">;
const TRAINER_CODE_MAX_LENGTH = 6;

export default function InputWithCopy({ ...props }: CodeInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickCopy = () => {
    if (inputRef.current) {
      navigator.clipboard
        .writeText(inputRef.current.value)
        .then(() => {
          toast.success("클립보드에 복사되었습니다.");
        })
        .catch(() => {
          toast.error("클립보드에 복사에 실패했습니다.");
        });
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
    </section>
  );
}
