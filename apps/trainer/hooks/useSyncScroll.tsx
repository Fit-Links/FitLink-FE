import { useEffect } from "react";

export default function useSyncScroll(
  sourceRef: React.RefObject<HTMLElement>,
  targetRef: React.RefObject<HTMLElement>,
) {
  const syncScroll = (source: HTMLElement, target: HTMLElement) => {
    target.scrollTop = source.scrollTop;
  };

  const handleTargetRefScroll = () => {
    if (targetRef.current && sourceRef.current) {
      syncScroll(targetRef.current, sourceRef.current);
    }
  };

  const handleSourceRefScroll = () => {
    if (targetRef.current && sourceRef.current) {
      syncScroll(sourceRef.current, targetRef.current);
    }
  };

  useEffect(() => {
    const targetComponent = targetRef.current;
    const sourceComponent = sourceRef.current;

    if (targetComponent && sourceComponent) {
      targetComponent.addEventListener("scroll", handleTargetRefScroll);
      sourceComponent.addEventListener("scroll", handleSourceRefScroll);
    }

    return () => {
      if (targetComponent && sourceComponent) {
        targetComponent.removeEventListener("scroll", handleTargetRefScroll);
        sourceComponent.removeEventListener("scroll", handleSourceRefScroll);
      }
    };
  }, [sourceRef, targetRef]);
}
