import type { Metadata } from 'next'
import { Fraunces, Nunito } from 'next/font/google'
import Script from 'next/script'
import '../globals.css'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

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
  title: 'Shri Shri 1008 Devansh Maharaj Ponga Pandit — Your numbers. Your nature.',
  description:
    'Discover your personal Lo Shu Grid numerology reading from your date of birth. A traditional Chinese self-reflection tool.',
  keywords: [
    'lo shu grid',
    'numerology',
    'ponga pandit',
    'shri shri 1008 devansh maharaj',
    'chinese numerology',
    'date of birth reading',
    'self reflection',
  ],
  openGraph: {
    title: 'Shri Shri 1008 Devansh Maharaj Ponga Pandit — Your numbers. Your nature.',
    description: 'Discover your personal Lo Shu Grid reading.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shri Shri 1008 Devansh Maharaj Ponga Pandit — Your numbers. Your nature.',
  },
  robots: { index: true, follow: true },
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${fraunces.variable} ${nunito.variable}`}>
      <body className="font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Script src="https://js.puter.com/v2/" strategy="beforeInteractive" />
      </body>
    </html>
  )
}
