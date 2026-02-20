import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orca CLI Reference",
  description:
    "Coordinated agent run harness. Breaks down a goal into a task graph and executes it end-to-end via a persistent Codex session.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
