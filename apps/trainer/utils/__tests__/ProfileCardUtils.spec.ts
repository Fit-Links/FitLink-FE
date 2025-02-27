import { formatToMeridiem } from "@trainer/utils/ProfileCardUtils";

describe("formatToMeridiem", () => {
  it("00:00은 오전 12시로 포맷되어야 한다", () => {
    expect(formatToMeridiem("00:00")).toBe("오전 12시");
  });

  it("01:00은 오전 1시로 포맷되어야 한다", () => {
    expect(formatToMeridiem("01:00")).toBe("오전 1시");
  });

  it("12:00은 오후 12시로 포맷되어야 한다", () => {
    expect(formatToMeridiem("12:00")).toBe("오후 12시");
  });

  it("15:30은 오후 3시로 포맷되어야 한다", () => {
    expect(formatToMeridiem("15:30")).toBe("오후 3시");
  });

  it("23:59는 오후 11시로 포맷되어야 한다", () => {
    expect(formatToMeridiem("23:59")).toBe("오후 11시");
  });

  it("잘못된 시간 형식에는 에러가 발생해야 한다", () => {
    expect(() => formatToMeridiem("25:00")).toThrow('Invalid hour value: "25" (Expected 0-23)');
    expect(() => formatToMeridiem("12:60")).toThrow('Invalid minute value: "60" (Expected 0-59)');
    expect(() => formatToMeridiem("0600")).toThrow(
      'Invalid time format: "0600" (Expected "HH:mm")',
    );
  });
});
