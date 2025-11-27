import type { Metadata } from "next"
import localFont from "next/font/local"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// Google Inter
const inter = Inter({ subsets: ["latin"] })

// Local JetBrains Mono
const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Regular.woff2",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "GameHost Panel - Premium Game Server Hosting",
  description: "Deploy your game servers in seconds with our powerful hosting platform.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.className} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
