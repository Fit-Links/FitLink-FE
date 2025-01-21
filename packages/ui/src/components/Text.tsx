import * as React from "react";

import { cn } from "../lib/utils";

type TextProps = React.HTMLAttributes<HTMLSpanElement> & {
  className?: string;
};

function Title1({ className, ...props }: TextProps) {
  return <p className={cn("text-title-1 text-text-primary", className)}>{props.children}</p>;
}

function Title2({ className, ...props }: TextProps) {
  return <p className={cn("text-title-2 text-text-primary", className)}>{props.children}</p>;
}

function Headline1({ className, ...props }: TextProps) {
  return <p className={cn("text-headline-1 text-text-primary", className)}>{props.children}</p>;
}

function Subhead1({ className, ...props }: TextProps) {
  return <p className={cn("text-subhead-1 text-text-primary", className)}>{props.children}</p>;
}

function Subhead2({ className, ...props }: TextProps) {
  return <p className={cn("text-subhead-2 text-text-primary", className)}>{props.children}</p>;
}

function Body1({ className, ...props }: TextProps) {
  return <p className={cn("text-body-1 text-text-primary", className)}>{props.children}</p>;
}

function Body2({ className, ...props }: TextProps) {
  return <p className={cn("text-body-2 text-text-primary", className)}>{props.children}</p>;
}
function Body3({ className, ...props }: TextProps) {
  return <p className={cn("text-body-3 text-text-primary", className)}>{props.children}</p>;
}
function Body4({ className, ...props }: TextProps) {
  return <p className={cn("text-body-4 text-text-primary", className)}>{props.children}</p>;
}

export const Text = Object.assign(Title1, {
  Title1: Title1,
  Title2: Title2,
  Headline1: Headline1,
  Subhead1: Subhead1,
  Subhead2: Subhead2,
  Body1: Body1,
  Body2: Body2,
  Body3: Body3,
  Body4: Body4,
});
