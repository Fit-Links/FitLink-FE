import React from "react";

import { cn } from "@ui/lib/utils";

import useControllableState from "@ui/hooks/useControllableState";

import { Button } from "./Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./Dialog";

type PopupButton = {
  label: string;
  callback: () => void;
};

type PopupProps = {
  prop?: boolean;
  onChange?: () => void;
  defaultProp?: boolean;
  title: string;
  description?: string;
  negative?: PopupButton;
  positive?: PopupButton;
  children: React.ReactNode;
};

function Popup({
  prop,
  onChange,
  defaultProp,
  title,
  description,
  negative,
  positive,
  children,
}: PopupProps) {
  const [open = false, setOpen] = useControllableState({
    prop: prop,
    onChange: onChange,
    defaultProp: defaultProp,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {title.split("\\n").map((line) => (
              <p key={`popup_title_${line}`}>{line}</p>
            ))}
          </DialogTitle>
        </DialogHeader>

        <DialogDescription>
          {description?.split("\\n").map((line) => <p key={`popup_description_${line}`}>{line}</p>)}
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            {negative && (
              <Button variant="secondary" onClick={negative.callback}>
                {negative.label}
              </Button>
            )}
          </DialogClose>
          <DialogClose asChild>
            {positive && <Button onClick={positive.callback}>{positive.label}</Button>}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface PopupTriggerProps {
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
}
function PopupTrigger({ asChild = false, children, className }: PopupTriggerProps) {
  return (
    <DialogTrigger asChild={asChild} className={cn("w-full", className)}>
      {children}
    </DialogTrigger>
  );
}

export { Popup, type PopupProps, PopupTrigger };
