// src/app/(frontend)/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import './globals.css'
import { getPageContent } from '../../utils/payload-api'
import ClientVisitorTracker from './components/ClientVisitorTracker'
import Script from 'next/script'

// Шрифты
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap', // <--- Обязательно добавьте это! 13/02/2026
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap', // <--- Обязательно добавьте это! 13/02/2026
})

// Метаданные
// Оставить только базовые метаданные
export const metadata: Metadata = {
  icons: {
    icon: '/favicon.png',
  },
  // НЕ добавлять title и description здесь
}

const GA_MEASUREMENT_ID = 'G-4ZTMC3WVYE'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let content: any = {}
  try {
    content = await getPageContent()
  } catch (error) {
    console.error('Ошибка при загрузке глобального контента в layout:', error)
    content = {}
  }

  const phone = content.contactPhone || '+380 (00) 000-00-00'
  const email = content.contactEmail || 'contact@example.com'
  const counter = content.visitorCount || 0

  return (
    <html lang="uk" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Google Search Console verification */}
        <meta
          name="google-site-verification"
          content="OSV1cKj-XC82eDe2c2ilyONO4gJcurq1SD15cRj0t60"
        />
      </head>

      <body>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer phone={phone} email={email} counter={counter} />
        <ClientVisitorTracker />

        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              // strategy="afterInteractive" 13/02/2026 - изменено на lazyOnload для оптимизации загрузки
              strategy="lazyOnload"
            />
            <Script
              id="google-analytics-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                    cookie_domain: '.applecidervinegar.com.ua'
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}
