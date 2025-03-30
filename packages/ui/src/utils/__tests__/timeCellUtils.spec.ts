/* eslint-disable no-magic-numbers */
import { splitTimeCellByAMPM, TimeCell } from "@ui/utils/timeCellUtils";

describe("splitTimeCellByAMPM", () => {
  it("자정과 정오를 기준으로 time cell을 AM, PM으로 분류한다", () => {
    const timeCells: TimeCell[] = [
      { dayOfWeek: "MONDAY", time: "09:00", disabled: false },
      { dayOfWeek: "TUESDAY", time: "12:30", disabled: false },
      { dayOfWeek: "WEDNESDAY", time: "15:00", disabled: true },
      { dayOfWeek: "THURSDAY", time: "05:00", disabled: false },
      { dayOfWeek: "FRIDAY", time: "23:59", disabled: false },
    ];

    const { am, pm } = splitTimeCellByAMPM(timeCells);

    expect(am).toHaveLength(2);
    expect(am).toEqual(
      expect.arrayContaining([
        { dayOfWeek: "MONDAY", time: "09:00", disabled: false },
        { dayOfWeek: "THURSDAY", time: "05:00", disabled: false },
      ]),
    );

    expect(pm).toHaveLength(3);
    expect(pm).toEqual(
      expect.arrayContaining([
        { dayOfWeek: "TUESDAY", time: "12:30", disabled: false },
        { dayOfWeek: "WEDNESDAY", time: "15:00", disabled: true },
        { dayOfWeek: "FRIDAY", time: "23:59", disabled: false },
      ]),
    );
  });

  it("자정(00:00)과 정오(12:00)에 대한 엣지 케이스를 제대로 처리해야 한다", () => {
    const timeCells: TimeCell[] = [
      { dayOfWeek: "MONDAY", time: "00:00", disabled: false },
      { dayOfWeek: "TUESDAY", time: "12:00", disabled: false },
      { dayOfWeek: "WEDNESDAY", time: "00:01", disabled: false },
      { dayOfWeek: "THURSDAY", time: "12:01", disabled: false },
    ];

    const { am, pm } = splitTimeCellByAMPM(timeCells);

    expect(am).toEqual(
      expect.arrayContaining([
        { dayOfWeek: "MONDAY", time: "00:00", disabled: false },
        { dayOfWeek: "WEDNESDAY", time: "00:01", disabled: false },
      ]),
    );

    expect(pm).toEqual(
      expect.arrayContaining([
        { dayOfWeek: "TUESDAY", time: "12:00", disabled: false },
        { dayOfWeek: "THURSDAY", time: "12:01", disabled: false },
      ]),
    );
  });

  it("입력된 Time Cell이 없을 경우 빈 배열을 반환한다", () => {
    const timeCells: TimeCell[] = [];

    const { am, pm } = splitTimeCellByAMPM(timeCells);

    expect(am).toEqual([]);
    expect(pm).toEqual([]);
  });
});
