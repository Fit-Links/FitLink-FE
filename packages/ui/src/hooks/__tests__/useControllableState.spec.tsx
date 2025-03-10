/* eslint-disable no-magic-numbers */
import { renderHook, act } from "@testing-library/react";

import useControllableState from "@ui/hooks/useControllableState";

describe("useControllableState 훅 테스트", () => {
  describe("제어 모드", () => {
    it("제공된 prop 값을 사용하고 변경 시 onChange를 호출해야 한다", () => {
      const handleChange = jest.fn();
      const INITIAL_VALUE = "initial";
      const NEW_VALUE = "updated";

      const { result } = renderHook(() =>
        useControllableState({
          prop: INITIAL_VALUE,
          onChange: handleChange,
        }),
      );

      act(() => {
        result.current[1](NEW_VALUE);
      });

      expect(result.current[0]).toBe(INITIAL_VALUE);
      expect(handleChange).toHaveBeenCalledWith(NEW_VALUE);
    });
  });

  describe("비제어 모드", () => {
    it("내부 상태를 관리하고 변경사항을 추적해야 한다", () => {
      const handleChange = jest.fn();
      const DEFAULT_VALUE = "default";
      const NEW_VALUE = "changed";

      const { result } = renderHook(() =>
        useControllableState({
          defaultProp: DEFAULT_VALUE,
          onChange: handleChange,
        }),
      );

      expect(result.current[0]).toBe(DEFAULT_VALUE);

      act(() => {
        result.current[1](NEW_VALUE);
      });

      expect(result.current[0]).toBe(NEW_VALUE);
      expect(handleChange).toHaveBeenCalledWith(NEW_VALUE);
    });

    it("함수형 업데이트가 올바르게 동작해야 한다", () => {
      const INITIAL_VALUE = { count: 0 };

      const { result } = renderHook(() => useControllableState({ defaultProp: INITIAL_VALUE }));

      act(() => {
        result.current[1]((prev) => ({
          count: prev!.count + 1,
        }));
      });

      expect(result.current[0]).toEqual({ count: 1 });
    });
  });
});
