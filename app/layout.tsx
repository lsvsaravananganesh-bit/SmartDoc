import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartDoc — Document Automation",
  description: "Turn spreadsheets into personalized documents, PDFs and email campaigns.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
