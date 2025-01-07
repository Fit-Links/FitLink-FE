/* eslint-disable no-magic-numbers */
import { renderHook, act } from "@testing-library/react";

import { useCallbackRef } from "../useCallbackRef";
import { useControllableState } from "../useControllableState";

describe("useCallbackRef 훅 테스트", () => {
  test("동일한 함수 참조를 유지하면서 최신 콜백을 호출해야 한다", () => {
    const firstCallback = jest.fn();
    const secondCallback = jest.fn();

    const { result, rerender } = renderHook(({ cb }) => useCallbackRef(cb), {
      initialProps: { cb: firstCallback },
    });

    const initialRef = result.current;

    act(() => {
      result.current(123);
    });

    rerender({ cb: secondCallback });

    act(() => {
      result.current(456);
    });

    expect(result.current).toBe(initialRef);
    expect(firstCallback).toHaveBeenCalledWith(123);
    expect(secondCallback).toHaveBeenCalledWith(456);
  });
});

describe("useControllableState 훅 테스트", () => {
  describe("제어 모드", () => {
    test("제공된 prop 값을 사용하고 변경 시 onChange를 호출해야 한다", () => {
      const handleChange = jest.fn();
      const initialValue = "initial";
      const newValue = "updated";

      const { result } = renderHook(() =>
        useControllableState({
          prop: initialValue,
          onChange: handleChange,
        }),
      );

      act(() => {
        result.current[1](newValue);
      });

      expect(result.current[0]).toBe(initialValue);
      expect(handleChange).toHaveBeenCalledWith(newValue);
    });
  });

  describe("비제어 모드", () => {
    test("내부 상태를 관리하고 변경사항을 추적해야 한다", () => {
      const handleChange = jest.fn();
      const defaultValue = "default";
      const newValue = "changed";

      const { result } = renderHook(() =>
        useControllableState({
          defaultProp: defaultValue,
          onChange: handleChange,
        }),
      );

      expect(result.current[0]).toBe(defaultValue);

      act(() => {
        result.current[1](newValue);
      });

      expect(result.current[0]).toBe(newValue);
      expect(handleChange).toHaveBeenCalledWith(newValue);
    });

    test("함수형 업데이트가 올바르게 동작해야 한다", () => {
      const initialValue = { count: 0 };

      const { result } = renderHook(() => useControllableState({ defaultProp: initialValue }));

      act(() => {
        result.current[1]((prev) => ({
          count: prev!.count + 1,
        }));
      });

      expect(result.current[0]).toEqual({ count: 1 });
    });
  });
});
