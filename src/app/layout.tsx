import "./globals.css";

export const metadata = {
  title: "Coin Flip Game",
  description: "Mô phỏng trò chơi tung đồng xu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="relative text-gray-900 ">
        <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-white/30 via-slate-100/20 to-blue-100/10 backdrop-blur-3xl" />
        {/* <ThemeProvider> */}
        {children}

        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
