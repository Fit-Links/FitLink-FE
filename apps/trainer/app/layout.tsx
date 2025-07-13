import { cn } from "@ui/lib/utils";
import { Viewport } from "next";
import localFont from "next/font/local";

import "./global.css";
import Providers from "@trainer/components/Providers";

import PWAManifestLinks from "../components/PWAManifestLinks";

const pretendard = localFont({
  src: "../static/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={cn(
        "bg-background-primary text-text-primary flex h-full flex-col",
        pretendard.variable,
      )}
    >
      <head>
        <PWAManifestLinks />
      </head>
      <body className={cn("m-0 flex-1", pretendard.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
