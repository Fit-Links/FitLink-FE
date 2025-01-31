import { createContext } from "react";

type InputWithIconContext = {
  id: string;
};

const InputWithIconContext = createContext<InputWithIconContext | null>(null);

export default InputWithIconContext;
