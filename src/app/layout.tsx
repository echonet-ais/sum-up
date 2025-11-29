import type { Metadata } from "next";
import "pretendard/dist/web/static/pretendard.css";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "SumUp",
  description: "Vibe Coding Hackathon Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased bg-[var(--background)] text-[var(--text-strong)]">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
