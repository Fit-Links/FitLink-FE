import * as React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T | undefined,
): T {
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  });

  return React.useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
}
