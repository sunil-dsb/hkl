import type { Metadata } from "next";
import { Outfit, Inter, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const hklCentra = localFont({
  src: "../../public/fonts/HKLCentra.woff2",
  variable: "--font-hkl-centra",
  weight: "100 900",
});

const hkl = localFont({
  src: "../../public/fonts/HKL.woff2",
  variable: "--font-hkl",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HKL - Humility Kindness Love",
  description: "The HKL movement helps us recognize our true beauty and encourages us to live with Humility, Kindness & Love. Let’s make our homes, our communities, and the world truly beautiful places.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hkl.variable} ${hklCentra.variable} ${outfit.variable} ${playfair.variable} antialiased ${inter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
