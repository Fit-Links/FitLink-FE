import Providers from "@trainer/components/Providers";
import "./global.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-background-primary text-text-primary md:border-background-sub2 md:max-w-mobile relative box-content h-screen w-full md:mx-auto md:overflow-hidden md:border md:shadow-lg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
