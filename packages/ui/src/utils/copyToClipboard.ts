export const copyToClipboard = async (text: string) => {
  if (typeof navigator === "undefined") return false;

  try {
    await navigator.clipboard.writeText(text);

    return true;
  } catch {
    alert("클립보드 복사에 실패했습니다. 수동으로 복사해주세요.");

    return false;
  }
};
