import { Viewport } from "next";

import "./global.css";
import PWAManifestLinks from "@user/PWAManifestLinks";

import Providers from "@user/components/Providers";

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
    <html lang="ko">
      <head>
        <PWAManifestLinks />
      </head>
      <body className="bg-background-primary text-text-primary md:max-w-mobile relative box-content flex h-screen min-h-screen w-full flex-col md:mx-auto md:overflow-x-hidden md:shadow-lg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
