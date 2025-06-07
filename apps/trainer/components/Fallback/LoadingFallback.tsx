// components/LoadingFallback.tsx
import Image from "next/image";
import React from "react";

function LoadingFallback() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-4 p-2">
      <div className="animate-wobble">
        <Image
          src="/splash_screens/web_splash_icon.avif"
          alt="loading-fallback"
          width={200}
          height={200}
        />
      </div>
    </section>
  );
}

export default LoadingFallback;
