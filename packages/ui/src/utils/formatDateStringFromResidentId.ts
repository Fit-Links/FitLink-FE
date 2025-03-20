/* eslint-disable no-magic-numbers */

export function formatDateStringFromResidentId(id?: string) {
  try {
    if (id === undefined) return id;
    if (!/^[0-9]{7}$/.test(id)) {
      throw new Error("Invalid input: Must be a 7-digit numeric string.");
    }

    const yy = parseInt(id.slice(0, 2), 10);
    const mm = id.slice(2, 4);
    const dd = id.slice(4, 6);
    const genderCode = parseInt(id[6], 10);
    let century = "";

    if ([9, 0].includes(genderCode)) {
      century = "18";
    } else if ([1, 2, 5, 6].includes(genderCode)) {
      century = "19";
    } else if ([3, 4, 7, 8].includes(genderCode)) {
      century = "20";
    } else {
      throw new Error("Invalid gender code.");
    }

    return `${century}${yy}-${mm}-${dd}`;
  } catch {
    return "INVALID_STRING_TO_PASS_TO_VALIDATION";
  }
}
