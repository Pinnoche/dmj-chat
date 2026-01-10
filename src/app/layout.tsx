import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tradeoninsideroption.com"),

  title: {
    default: "DMJ's DegenXpert | AI Chat Interface",
    template: "%s | DMJ's DegenXpert",
  },

  description:
    "A chat interface developed by DMJ for seamless interactions between users and several AI Agent models.",

  alternates: {
    canonical: "https://degenxpert.xyz",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "DMJ's DegenXpert | AI Chat Interface",
    description:
      "A chat interface developed by DMJ for seamless interactions between users and several AI Agent models.",
    url: "https://degenxpert.xyz",
    images: [
      {
        url: "https://degenxpert.xyz/og-image2.png",
        width: 1200,
        height: 630,
        alt: "DegenXpert - AI Chat Interface",
      },
    ],
    siteName: "DegenXpert",
    type: "website",
  },

  // icons: {
  //   icon: "/icon.png",
  //   shortcut: "/favicon.ico",
  //   apple: "/apple-icon.png",
  // },

  // twitter: {
  //   card: "summary_large_image",
  //   site: "@insideroption25",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary font-sans`}
      >
        <Analytics />
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
