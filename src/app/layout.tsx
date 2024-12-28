import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

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
  title: "MICRODEFT",
  description: "Frontend Internship Program",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav
          style={{
            display: "flex",
            gap: "4rem",
            padding: "1rem",
            backgroundColor: "#f8f9fa",
            borderBottom: "1px solid #dee2e6",
            fontWeight: "bold",
          }}
        >
          <Link href="/">Home</Link>|<Link href="/login">Login</Link>|
          <Link href="/register">Register</Link>|
          <Link href="/courses/add">Add Courses</Link>|
          <Link href="/courses">All Courses</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
