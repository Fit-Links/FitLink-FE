/* eslint-disable no-magic-numbers */
import { renderHook, act } from "@testing-library/react";

import { useCallbackRef } from "../useCallbackRef";

describe("useCallbackRef", () => {
  test("콜백이 변경되어도 동일한 함수 참조를 유지하면서 최신 콜백을 실행해야 한다", () => {
    const firstCallback = jest.fn();
    const secondCallback = jest.fn();

    const { result, rerender } = renderHook(({ cb }) => useCallbackRef(cb), {
      initialProps: { cb: firstCallback },
    });

    const initialFunction = result.current;

    act(() => {
      result.current(1, 2, 3);
    });

    expect(firstCallback).toHaveBeenCalledWith(1, 2, 3);
    expect(firstCallback).toHaveBeenCalledTimes(1);

    rerender({ cb: secondCallback });

    expect(result.current).toBe(initialFunction);

    act(() => {
      result.current(4, 5, 6);
    });

    expect(secondCallback).toHaveBeenCalledWith(4, 5, 6);
    expect(secondCallback).toHaveBeenCalledTimes(1);

    expect(firstCallback).toHaveBeenCalledTimes(1);
  });

  test("undefined 콜백이 전달되어도 에러가 발생하지 않아야 한다", () => {
    const { result } = renderHook(() => useCallbackRef(undefined));

    act(() => {
      expect(() => {
        result.current("test");
      }).not.toThrow();
    });
  });
});
