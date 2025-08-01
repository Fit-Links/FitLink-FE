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
      className={`${pretendard.variable} bg-background-primary text-text-primary font-pretendard flex h-full flex-col`}
    >
      <head>
        <PWAManifestLinks />
      </head>
      <body className={"font-pretendard m-0 flex-1"}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
