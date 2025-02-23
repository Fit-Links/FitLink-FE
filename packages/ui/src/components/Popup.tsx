import React from "react";

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
  title: string;
  description?: string;
  negative?: PopupButton;
  positive?: PopupButton;
  children: React.ReactNode;
};

function Popup({ title, description, negative, positive, children }: PopupProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {title.split("\\n").map((line) => (
              <p key={`popup_title_${line}`}>{line}</p>
            ))}
          </DialogTitle>
          {description && (
            <DialogDescription>
              {description
                ?.split("\\n")
                .map((line) => <p key={`popup_description_${line}`}>{line}</p>)}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            {negative && (
              <Button variant="dark" onClick={negative.callback}>
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

export { Popup, type PopupProps };
