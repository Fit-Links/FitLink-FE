import { useEffect, RefObject } from "react";

interface useOutsideClickProps {
  ref: RefObject<HTMLElement>;
  callback: () => void;
}

export const useOutsideClick = ({ ref, callback }: useOutsideClickProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
