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

export default function Popup({ title, description, negative, positive, children }: PopupProps) {
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
          <DialogDescription>
            {description
              ?.split("\\n")
              .map((line) => <p key={`popup_description_${line}`}>{line}</p>)}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {negative && (
            <DialogClose asChild>
              <Button variant="dark" onClick={negative.callback}>
                {negative.label}
              </Button>
            </DialogClose>
          )}
          {positive && (
            <DialogClose asChild>
              <Button onClick={positive.callback}>{positive.label}</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
