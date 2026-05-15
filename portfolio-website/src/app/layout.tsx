import { Inter } from "next/font/google"
import { Spectral } from "next/font/google"
import { Libre_Baskerville } from "next/font/google"
import { Space_Mono } from "next/font/google"
import { Funnel_Sans } from "next/font/google"
import { Bitter } from "next/font/google"
import { Instrument_Serif } from "next/font/google"
import { Inter_Tight } from "next/font/google"
import { Funnel_Display } from "next/font/google"
import { CustomCursor } from "@/components/custom-cursor"
import { FaviconController } from "@/components/favicon-controller"
import { getSiteSettings } from "@/lib/sanity"
import type { Metadata } from "next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-spectral"
})
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-libre-baskerville"
})
const libreBaskervilleRegular = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-libre-baskerville-regular"
})
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono"
})
const funnelSans = Funnel_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-funnel-sans"
})
const bitter = Bitter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-bitter"
})
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif"
})
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-inter-tight"
})
const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-funnel-display"
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const title = settings?.ogTitle || "Siddharth Kothiyal - Design Portfolio"
  const images = settings?.ogImageUrl ? [{ url: settings.ogImageUrl, width: 1200, height: 630 }] : []

  return {
    title,
    openGraph: {
      title,
      url: "https://www.sidkoths.com",
      siteName: "Siddharth Kothiyal Portfolio",
      locale: "en_US",
      type: "website",
      ...(images.length && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      ...(images.length && { images }),
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${spectral.variable} ${libreBaskerville.variable} ${libreBaskervilleRegular.variable} ${spaceMono.variable} ${funnelSans.variable} ${bitter.variable} ${instrumentSerif.variable} ${interTight.variable} ${funnelDisplay.variable}`} suppressHydrationWarning>
        <CustomCursor />
        <FaviconController />
        {children}
      </body>
    </html>
  )
}