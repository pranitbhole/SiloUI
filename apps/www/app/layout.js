import { Geist_Mono, Syne } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono-var" });
const syne = Syne({ subsets: ["latin"], variable: "--font-sans-var", weight: ["400","500","600","700","800"] });

export const metadata = {
  title: "SiloUI – Animated React Components",
  description: "Copy-paste animated React components. Built for modern interfaces.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} ${syne.variable}`}>{children}</body>
    </html>
  );
}