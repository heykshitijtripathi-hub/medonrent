import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MedOnRent — Peer-to-Peer Medical Equipment Rental Marketplace",
  description: "Care in Circulation — Why Buy When You Can Rent? Rent sanitized oxygen concentrators, motorized ICU beds, and electric wheelchairs directly from verified families nearby with 100% escrow protection.",
  icons: {
    icon: "/assets/medonrent-app-icon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/assets/medonrent-app-icon.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F8FAFC] text-[#0B192C] selection:bg-[#007791] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
