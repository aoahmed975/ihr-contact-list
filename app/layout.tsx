import type React from "react"
import type { Metadata } from "next"
import { Source_Sans_3 } from "next/font/google"
import "./globals.css"

// Initialize the Source Sans 3 font (updated version of Source Sans Pro)
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-source-sans",
})

export const metadata: Metadata = {
  title: "HR Contacts List - University of Illinois Urbana-Champaign",
  description: "Find contact information for HR personnel across departments, colleges, and administrative units.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} font-sans`}>{children}</body>
    </html>
  )
}
