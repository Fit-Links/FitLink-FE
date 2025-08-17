/* eslint-disable no-magic-numbers */
import { currentYearWithMonth, isWeekend } from "@ui/utils/DayPickerUtils";

describe("날짜 유틸리티 함수 테스트", () => {
  describe("currentYearWithMonth 함수는", () => {
    it("한 자리 월을 앞에 0을 붙여서 포맷팅해야 한다", () => {
      const testDate = new Date(2024, 0, 1);
      expect(currentYearWithMonth(testDate)).toBe("2024. 01");

      const testDate2 = new Date(2024, 8, 1);
      expect(currentYearWithMonth(testDate2)).toBe("2024. 09");
    });

    it("두 자리 월은 그대로 표시해야 한다", () => {
      const testDate = new Date(2024, 9, 1);
      expect(currentYearWithMonth(testDate)).toBe("2024. 10");

      const testDate2 = new Date(2024, 11, 1);
      expect(currentYearWithMonth(testDate2)).toBe("2024. 12");
    });

    it("연도가 다른 경우도 올바르게 처리해야 한다", () => {
      const testDate = new Date(2023, 0, 1);
      expect(currentYearWithMonth(testDate)).toBe("2023. 01");

      const testDate2 = new Date(2025, 11, 1);
      expect(currentYearWithMonth(testDate2)).toBe("2025. 12");
    });

    it("다양한 방식으로 생성된 Date 객체를 처리할 수 있어야 한다", () => {
      const testDate = new Date("2024-01-15");
      expect(currentYearWithMonth(testDate)).toBe("2024. 01");

      const testDate2 = new Date(2024, 0, 15);
      expect(currentYearWithMonth(testDate2)).toBe("2024. 01");
    });
  });

  describe("isWeekend 함수는", () => {
    it("토요일을 주말로 인식해야 한다", () => {
      const saturday = new Date(2024, 0, 6);
      expect(isWeekend(saturday)).toBe(true);
    });

    it("일요일을 주말로 인식해야 한다", () => {
      const sunday = new Date(2024, 0, 7);
      expect(isWeekend(sunday)).toBe(true);
    });

    it("평일은 주말로 인식하지 않아야 한다", () => {
      const weekdays = [
        new Date(2024, 0, 1),
        new Date(2024, 0, 2),
        new Date(2024, 0, 3),
        new Date(2024, 0, 4),
        new Date(2024, 0, 5),
      ];

      weekdays.forEach((date) => {
        expect(isWeekend(date)).toBe(false);
      });
    });

    it("월과 연도가 바뀌는 경우도 올바르게 처리해야 한다", () => {
      const newYearsSunday = new Date(2024, 0, 7);
      expect(isWeekend(newYearsSunday)).toBe(true);

      const lastDayOfYear = new Date(2024, 11, 31);
      expect(isWeekend(lastDayOfYear)).toBe(false);
    });
  });
});
