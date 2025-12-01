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
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
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

        {/* ОБНОВЛЕННЫЙ Schema.org с LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              // 1. WebSite (оставить как есть)
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Apple Cider Vinegar UA',
                url: 'https://applecidervinegar.com.ua/',
                description:
                  'Натуральний яблучний оцет ручного виробництва. Купити крафтовий оцет з доставкою по Україні.',
                publisher: {
                  '@type': 'Organization',
                  name: 'Apple Cider Vinegar UA',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://applecidervinegar.com.ua/logo-new.png',
                    width: 150,
                    height: 150,
                  },
                },
                // ДОБАВИТЬ: potentialAction для поиска по сайту
                potentialAction: {
                  '@type': 'SearchAction',
                  target: {
                    '@type': 'EntryPoint',
                    urlTemplate: 'https://applecidervinegar.com.ua/search?q={search_term_string}',
                  },
                  'query-input': 'required name=search_term_string',
                },
              },
              // 2. LocalBusiness (улучшить)
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: 'Крафтова оцетарня',
                image: 'https://applecidervinegar.com.ua/logo-new.png',
                '@id': 'https://applecidervinegar.com.ua',
                url: 'https://applecidervinegar.com.ua',
                telephone: phone,
                email: email,
                address: {
                  '@type': 'PostalAddress',
                  addressCountry: 'UA',
                  addressRegion: 'Київська область',
                  addressLocality: 'Україна',
                  // ДОБАВИТЬ: уточнить адрес если есть
                  // streetAddress: 'вул. Прикладна, 123'
                },
                description: 'Виробництво натурального яблучного оцту ручної роботи',
                priceRange: '₴',
                openingHours: 'Mo-Su 09:00-18:00',
                // ДОБАВИТЬ: геолокацию
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: '50.4501',
                  longitude: '30.5234',
                },
                // ДОБАВИТЬ: отзывы если есть
                // aggregateRating: {
                //   '@type': 'AggregateRating',
                //   ratingValue: '4.8',
                //   reviewCount: '42'
                // }
              },
            ]),
          }}
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
              strategy="afterInteractive"
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
