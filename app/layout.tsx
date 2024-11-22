import type { Metadata } from "next";
import { GeistSans } from "geist-font/sans";
import { GeistMono } from "geist-font/mono";
import "./globals.css";
import { cn } from "@/utils";

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
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "flex flex-col min-h-screen"
        )}
      >
        {children}
      </body>
    </html>
  );
}
