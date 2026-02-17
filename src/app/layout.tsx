import type { Metadata } from 'next'
import { Fraunces, Nunito } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '700', '900'],
  style: ['normal'],
  variable: '--font-fraunces',
  display: 'swap',
  preload: true,
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  style: ['normal'],
  variable: '--font-nunito',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Ponga Pandit — Your numbers. Your nature.',
  description:
    'Discover your personal Lo Shu Grid numerology reading from your date of birth. A traditional Chinese self-reflection tool.',
  keywords: [
    'lo shu grid',
    'numerology',
    'ponga pandit',
    'chinese numerology',
    'date of birth reading',
    'self reflection',
  ],
  openGraph: {
    title: 'Ponga Pandit — Your numbers. Your nature.',
    description: 'Discover your personal Lo Shu Grid reading.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ponga Pandit — Your numbers. Your nature.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${nunito.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
