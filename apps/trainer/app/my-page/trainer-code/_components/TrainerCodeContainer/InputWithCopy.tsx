"use client";

import { Input } from "@ui/components/Input";
import { Copy } from "lucide-react";
import React, { ComponentProps, useRef } from "react";

type CodeInputProps = ComponentProps<"input">;
const TRAINER_CODE_MAX_LENGTH = 5;

export default function InputWithCopy({ ...props }: CodeInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
    }
  };

  return (
    <section className="mt-[3.75rem] flex w-full items-center justify-center gap-2">
      <Input
        ref={inputRef}
        className="bg-background-sub2 h-[3.75rem] w-[14.25rem] text-center text-[2.5rem]  tracking-[0.625rem]"
        maxLength={TRAINER_CODE_MAX_LENGTH}
        value={props.value}
        readOnly={true}
        {...props}
      />
      <Copy className="text-text-sub2 w-[1.563rem]" onClick={handleClickCopy} />
    </section>
  );
}
