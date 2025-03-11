import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full flex flex-col items-center justify-center gap-6">
        <Header />
        <div className="max-w-[1440px] w-full pt-32">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
