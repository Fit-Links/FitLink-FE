"use client";

import { ComponentProps, forwardRef } from "react";

import { Button } from "../Button";

type PhoneVerificationButtonProps = ComponentProps<"button">;

export const PhoneVerificationButton = forwardRef<HTMLAnchorElement, PhoneVerificationButtonProps>(
  (props, ref) => {
    return (
      <section className="relative w-full flex-1 flex-col justify-center">
        <a ref={ref} className="hidden" aria-label="verification-link" />
        <Button
          className="text-headline absolute  bottom-[2.125rem] h-[3.375rem] w-full"
          onClick={props.onClick}
        >
          인증 메시지 보내기
        </Button>
      </section>
    );
  },
);

PhoneVerificationButton.displayName = "PhoneVerificationButton";
