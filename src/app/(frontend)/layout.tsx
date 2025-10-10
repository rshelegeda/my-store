// app/(frontend)/layout.tsx (ОСНОВНОЙ ШАБЛОН САЙТА)

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google' // Если шрифты установлены
import './styles.css' // Ваши глобальные стили
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import './globals.css'

import { getPageContent } from '../../utils/payload-api'
import ClientVisitorTracker from './components/ClientVisitorTracker'

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
  description: 'Виготовлення та продаж натуральих яблучних оцтів',
}

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
  const email = content.contactEmail || 'contact@example.com' // ВОССТАНОВЛЕНО: Слоган необходим для Header.tsx
  const slogan = content.headerSlogan || 'Натуральні продукти'

  const counter = content.visitorCount || 0

  // console.log(counter)

  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
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
