import { createContext } from "react";

type InputWithLabelContext = {
  id: string;
  error?: boolean;
};

const InputWithLabelContext = createContext<InputWithLabelContext | null>(null);

export default InputWithLabelContext;
