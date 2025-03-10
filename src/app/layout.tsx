import Header from "@/components/header/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full px-8 flex flex-col items-center justify-center">
        <Header />
        <div className="max-w-[1440px] w-full pt-40">
          {children}
        </div>
      </body>
    </html>
  );
}
