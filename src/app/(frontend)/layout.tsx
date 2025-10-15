// src/app/(frontend)/layout.tsx

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google' // Если шрифты установлены
import './styles.css' // Ваши глобальные стили
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import './globals.css'
// ВНИМАНИЕ: Удаляем импорт 'next/script', так как мы используем нативные <script> теги

import { getPageContent } from '../../utils/payload-api'
import ClientVisitorTracker from './components/ClientVisitorTracker'

// --- НАЧАЛО: ИНТЕГРАЦИЯ GOOGLE ANALYTICS 4 ---

// ИДЕНТИФИКАТОР ИЗМЕРЕНИЯ
const GA_MEASUREMENT_ID = 'G-4ZTMC3WVYE'

// --- КОНЕЦ: ИНТЕГРАЦИЯ GOOGLE ANALYTICS 4 ---

// Шрифты
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Метаданные
export const metadata: Metadata = {
  title: 'Натуральний яблучний оцет', // Обновим тайтл
  description:
    'Натуральний яблучний крафтовий оцет ручного виробництва. Купити з доставкою по Україні — 100% органічний продукт без консервантів.',
}

// Утилита для проверки окружения
const isProduction = process.env.NODE_ENV === 'production'
// Оставляем isProduction только для информации, не используем в GA4,
// чтобы гарантировать его загрузку при любом сценарии деплоя.

// 1. Делаем функцию асинхронной
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // 2. Получаем глобальные данные
  let content: any = {}
  try {
    content = await getPageContent() // // !!! ГЛАВНЫЙ ШАГ ОТЛАДКИ !!!
    // console.log('--- Payload Global Content Received ---')
    // console.log(JSON.stringify(content, null, 2))
    // console.log('---------------------------------------')
  } catch (error) {
    console.error('Ошибка при загрузке глобального контента в layout:', error)
  } // 3. Извлекаем нужные простые надписи с заглушками

  const phone = content.contactPhone || '+380 (00) 000-00-00'
  const email = content.contactEmail || 'contact@example.com'
  const slogan = content.headerSlogan || 'Натуральні продукти'

  const counter = content.visitorCount || 0

  // console.log(counter)

  // ВАЖНО: Тег GSC должен быть жестко закодирован в <head>
  // Этот код был удален, чтобы избежать дублирования в JSX.

  return (
    <html lang="uk" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* <title>{metadata.title as string}</title>
        <meta name="description" content={metadata.description as string} /> */}

        {/* Тег верификации Google Search Console (GSC) */}
        <meta
          name="google-site-verification"
          content="OSV1cKj-XC82eDe2c2ilyONO4gJcurq1SD15cRj0t60"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: 'Натуральний яблучний оцет.',
              image: 'https://applecidervinegar.com.ua/4651048.jpg',
              description:
                'Натуральний крафтовий яблучний оцет ручного виробництва. Это натуральный крафтовый яблочный уксус, продукт высокого качества от украинского производителя.',
              brand: {
                '@type': 'Brand',
                name: 'Apple Cider Vinegar UA',
              },
              offers: {
                '@type': 'Offer',
                priceCurrency: 'UAH',
                price: '230',
                availability: 'https://schema.org/InStock',
                url: 'https://applecidervinegar.com.ua/',
              },
            }),
          }}
        />
      </head>

      {/* !!! ИНТЕГРАЦИЯ GA4 (УСПЕШНЫЙ МЕТОД: нативные скрипты) !!!
        Убрано условие && isProduction, чтобы гарантировать загрузку тега.
      */}
      {GA_MEASUREMENT_ID && ( // Загружаем всегда, если есть ID
        <>
          {/* 1. Загрузка основного скрипта Google Tag Manager */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />

          {/* 2. Инициализация и настройка gtag.js */}
          <script
            id="google-analytics-init"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                // Инициализация GA4 с явным указанием домена для куки
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                  cookie_domain: '.applecidervinegar.com.ua' 
                });
              `,
            }}
          />
        </>
      )}

      <body>
        {/* 4. Передаем данные в Header */}
        <Header />
        <main className="flex-grow">{children}</main> {/* 5. Передаем данные в Footer */}
        <Footer phone={phone} email={email} counter={counter} />
        <ClientVisitorTracker></ClientVisitorTracker>
      </body>
    </html>
  )
}
