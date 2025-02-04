"use client";

import { ChevronDown } from "lucide-react";
import React, {
  useRef,
  useEffect,
  ReactNode,
  forwardRef,
  ReactElement,
  HTMLAttributes,
} from "react";

import DropdownContext from "./context";
import useControllableState from "../../hooks/useControllableState";
import useDropdownContext from "../../hooks/useDropdownContext";
import { cn } from "../../lib/utils";

type DropdownProps = {
  open?: boolean;
  onChangeOpen?: (isOpen: boolean) => void;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
};
type DropdownTriggerProps =
  | (HTMLAttributes<HTMLButtonElement> & {
      asChild: true;
      className?: string;
      children: ReactElement;
    })
  | (HTMLAttributes<HTMLButtonElement> & {
      asChild?: false;
      className?: string;
      children: ReactNode;
    });
type DropdownContentProps = HTMLAttributes<HTMLDivElement> &
  Pick<DropdownProps, "children" | "className">;
type DropdownItemProps = HTMLAttributes<HTMLDivElement> &
  Pick<DropdownProps, "children" | "className"> & {
    onClick?: () => void;
  };
type DropdownSeparatorProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

function Dropdown({ open, onChangeOpen, defaultOpen, className, children }: DropdownProps) {
  const [isOpen = false, setIsOpen] = useControllableState({
    prop: open,
    onChange: onChangeOpen,
    defaultProp: defaultOpen,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    setIsOpen(nextOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Node;

      if (isOpen && containerRef.current && !containerRef.current.contains(target)) {
        handleOpenChange(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <DropdownContext.Provider
      value={{
        open: isOpen,
        onChangeOpen: handleOpenChange,
        triggerWidth: containerRef.current?.offsetWidth,
      }}
    >
      <div
        ref={containerRef}
        className={cn("text-text-primary box-border w-[10.4375rem] bg-transparent p-1", className)}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ children, className, asChild = false, ...props }, ref) => {
    const { open, onChangeOpen } = useDropdownContext();

    const handleClick = () => {
      onChangeOpen?.(!open);
    };

    if (asChild) {
      return React.cloneElement(React.Children.only(children as ReactElement), {
        onClick: handleClick,
        "aria-expanded": open,
        "aria-haspopup": true,
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          "flex w-full items-center justify-between bg-transparent py-1 pr-1 text-left focus:outline-none",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          size={20}
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>
    );
  },
);

DropdownTrigger.displayName = "DropdownTrigger";

const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, className, ...props }, ref) => {
    const { open } = useDropdownContext();

    return (
      <div
        ref={ref}
        className={cn(
          "text-text-primary overflow-hidden bg-transparent transition-all duration-300 ease-in-out", // 애니메이션을 위한 클래스 추가
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DropdownContent.displayName = "DropdownContent";

const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ children, className, ...props }, ref) => {
    useDropdownContext();

    return (
      <div
        ref={ref}
        className={cn("flex  items-center py-1 pl-0 pr-1 text-sm opacity-60", className)}
        role="menuitem"
        tabIndex={-1}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DropdownItem.displayName = "DropdownItem";

const DropdownSeparator = forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  ({ className, ...props }, ref) => {
    useDropdownContext();

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn("bg-background-sub3 my-1 h-px", className)}
        {...props}
      />
    );
  },
);

DropdownSeparator.displayName = "DropdownSeparator";

export { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator };
