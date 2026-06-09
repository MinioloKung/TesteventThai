import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const prompt = Prompt({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'thai'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TestDashboard — User Management",
  description: "A clean, high-end user management console powered by ReqRes API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`h-full ${prompt.variable}`}>
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
