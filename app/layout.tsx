import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orca CLI Reference",
  description: "Orca's machine-readable agent-lane CLI contract and operator reference.",
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
