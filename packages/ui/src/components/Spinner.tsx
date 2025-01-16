"use client";

import { cva, VariantProps } from "class-variance-authority";
import { useEffect, useRef } from "react";

import { cn } from "../lib/utils";

const ROTATION_SPEED: number = 100;
const ROTATION_DEGREE: number = 45;
const OPACITY_STEPS: Readonly<Array<string>> = [
  "1",
  "0.87",
  "0.75",
  "0.63",
  "0.51",
  "0.39",
  "0.27",
  "0.15",
];
const OPACITY_STEP: number = 1;

const SPINNER_KEYS: Readonly<Array<string>> = [
  "spinner-spin-0",
  "spinner-spin-1",
  "spinner-spin-2",
  "spinner-spin-3",
  "spinner-spin-4",
  "spinner-spin-5",
  "spinner-spin-6",
  "spinner-spin-7",
];

const spinnerVariants = cva("bg-text-sub2 absolute h-[10px] w-[4px] rounded-lg", {
  variants: {
    size: {
      small: "h-[7px] w-[3px]",
      middle: "h-[10px] w-[4px]",
    },
  },
  defaultVariants: {
    size: "small",
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  loading?: boolean;
  className?: string;
}

export default function Spinner({ size, loading, className }: Readonly<SpinnerProps>) {
  const spinnerRefs = useRef<HTMLSpanElement[] | null[]>([]);

  useEffect(() => {
    const intervalIds = spinnerRefs.current.map((ref, index) => {
      let opacityIndex: number = index;

      return setInterval(() => {
        if (ref) {
          ref.style.opacity = `${OPACITY_STEPS[opacityIndex]}`;
          opacityIndex = (opacityIndex + OPACITY_STEP) % OPACITY_STEPS.length;
        }
      }, ROTATION_SPEED);
    });

    return () => {
      intervalIds.forEach(clearInterval);
    };
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <div className="relative flex h-fit w-fit items-center justify-center">
      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={SPINNER_KEYS[index]}
          ref={(el) => (spinnerRefs.current[index] = el)}
          className={cn(spinnerVariants({ size }), className)}
          style={{
            transform: `rotate(${index * -ROTATION_DEGREE}deg) ${size === "small" ? "translateY(-8px)" : "translateY(-10px)"}`,
            opacity: `${OPACITY_STEPS[index]}`,
          }}
        />
      ))}
    </div>
  );
}
