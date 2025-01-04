import * as React from "react";

import { cn } from "../lib/utils";

type TextProps = React.HTMLAttributes<HTMLSpanElement> & {
  className?: string;
};

function Title1({ className, ...props }: TextProps) {
  return <span className={cn("text-title-1 text-text-primary", className)}>{props.children}</span>;
}

function Title2({ className, ...props }: TextProps) {
  return <span className={cn("text-title-2 text-text-primary", className)}>{props.children}</span>;
}

function Headline1({ className, ...props }: TextProps) {
  return (
    <span className={cn("text-headline-1 text-text-primary", className)}>{props.children}</span>
  );
}

function Subhead1({ className, ...props }: TextProps) {
  return (
    <span className={cn("text-subhead-1 text-text-primary", className)}>{props.children}</span>
  );
}

function Subhead2({ className, ...props }: TextProps) {
  return (
    <span className={cn("text-subhead-2 text-text-primary", className)}>{props.children}</span>
  );
}

function Body1({ className, ...props }: TextProps) {
  return <span className={cn("text-body-1 text-text-primary", className)}>{props.children}</span>;
}

function Body2({ className, ...props }: TextProps) {
  return <span className={cn("text-body-2 text-text-primary", className)}>{props.children}</span>;
}
function Body3({ className, ...props }: TextProps) {
  return <span className={cn("text-body-3 text-text-primary", className)}>{props.children}</span>;
}
function Body4({ className, ...props }: TextProps) {
  return <span className={cn("text-body-4 text-text-primary", className)}>{props.children}</span>;
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
