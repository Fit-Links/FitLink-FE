import { createContext } from "react";

type DropdownContext = {
  open?: boolean;
  onChangeOpen?: (isOpen: boolean) => void;
  triggerWidth?: number;
};

const DropdownContext = createContext<DropdownContext | null>(null);

export default DropdownContext;
