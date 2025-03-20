import { Viewport } from "next";

import "./global.css";
import FooterProvider from "@user/components/FooterProvider";

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
      <body className="bg-background-primary text-text-primary md:border-background-sub2 md:max-w-mobile relative box-content h-screen min-h-screen w-full md:mx-auto md:overflow-x-hidden md:border md:shadow-lg">
        <FooterProvider>{children}</FooterProvider>
      </body>
    </html>
  );
}
