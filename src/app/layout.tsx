import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap', axes: ['SOFT', 'opsz'] })

export const metadata: Metadata = {
  title: 'GreenWeb Institute · Precision Agriculture Platform',
  metadataBase: new URL('https://www.greenweb.institute'),
  openGraph: {
    title: 'GreenWeb Institute · Precision Agriculture Platform',
    description: 'Satellite field health maps, AI crop disease detection, farm records and a direct marketplace for farmers.',
    url: 'https://www.greenweb.institute',
    siteName: 'GreenWeb Institute',
    type: 'website',
  },
  description: 'Smart farm management, AI disease detection, GIS mapping, and marketplace for modern farmers worldwide.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22><rect width=%2232%22 height=%2232%22 rx=%228%22 fill=%22%23184a2d%22/><path d=%22M16 25V13M16 17c-4 0-6-3-6-6 4 0 6 3 6 6Zm0 3c4 0 6-3 6-6-4 0-6 3-6 6Z%22 stroke=%22%23e2b85a%22 stroke-width=%222%22 fill=%22none%22 stroke-linecap=%22round%22/></svg>'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col bg-field-bg font-sans">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}