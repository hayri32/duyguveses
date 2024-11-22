import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "English Learning Assistant",
  description: "Interactive English learning platform with pronunciation and speaking practice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
