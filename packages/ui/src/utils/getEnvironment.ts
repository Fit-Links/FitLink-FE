export const getEnvironment = () => {
  const ua = navigator.userAgent;

  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;

  if (isStandalone && isMobile) return "mobile-pwa";
  if (isStandalone) return "desktop-pwa";
  if (isMobile) return "mobile-web";

  return "desktop-web";
};
