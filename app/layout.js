import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/Components/Navbar";
import { Footer } from "@/Components/Footer";
import SessionWrapper from "@/Components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ProlanceHub",
  description: "Freelancing platform for professionals"
};

export default function RootLayout({ children }) {
  return (
    <>
      <SessionWrapper>
      <html lang="en">
        <head> 
            <meta name="google-site-verification" content="N8drBAWPKvOWEnZVG183gkRmH7ODxfUHlgmvRI8hd8M" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
        >
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
      </SessionWrapper>
    </>
  );
}
