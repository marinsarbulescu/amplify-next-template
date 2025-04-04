import './globals.css';
import './app.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthWrapper from './AuthWrapper';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stock Portfolio Manager",
  description: "Manage your stock portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </body>
    </html>
  );
}