import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stitchera — AI-Powered Tailoring Platform",
  description: "Book tailoring services, connect with expert tailors, and get AI-powered body type analysis. Premium tailoring at your doorstep.",
  keywords: ["tailoring", "stitching", "AI", "fashion", "booking"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-slate-950 text-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
