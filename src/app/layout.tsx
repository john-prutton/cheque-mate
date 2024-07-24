import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const font = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ChequeMate",
  description: "Split bills with friends quickly"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
