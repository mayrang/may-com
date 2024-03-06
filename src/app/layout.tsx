import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MSWComponent from "./_component/MSWComponent";
import AuthProvider from "./_component/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "무슨 일이 일어나고 있나요? / May",
  description: "로그인을 하고 May.com을 탐험해보세요!",
};

type Props = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MSWComponent />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
