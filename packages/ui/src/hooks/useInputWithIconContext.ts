import { useContext } from "react";

import InputWithIconContext from "../components/InputWithIcon/context";

const useInputWithIconContext = () => {
  const context = useContext(InputWithIconContext);

  if (!context) {
    throw new Error(`InputWithIcon Components must be used within a InputWithIcon component`);
  }

  return context;
};

export default useInputWithIconContext;
