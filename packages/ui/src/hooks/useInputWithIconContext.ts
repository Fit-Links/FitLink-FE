import { useContext } from "react";

import InputWithIconContext from "components/InputWithIcon/context";

const useInputWithIconContext = (componentName: string) => {
  const context = useContext(InputWithIconContext);

  if (!context) {
    throw new Error(`${componentName} must be used within a InputWithIcon component`);
  }

  return context;
};

export default useInputWithIconContext;
