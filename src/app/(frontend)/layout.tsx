//layout.tsx

// app/(frontend)/layout.tsx (ОСНОВНОЙ ШАБЛОН САЙТА)

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google' // Если шрифты установлены
import './styles.css' // Ваши глобальные стили
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import './globals.css'

import { getPageContent } from '../../utils/payload-api'

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
  title: 'Payload E-commerce Store', // Обновим тайтл
  description: 'Наш интернет-магазин, созданный на Next.js и Payload CMS.',
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
    content = await getPageContent()
    // !!! ГЛАВНЫЙ ШАГ ОТЛАДКИ !!!
    console.log('--- Payload Global Content Received ---')
    console.log(JSON.stringify(content, null, 2))
    console.log('---------------------------------------')
  } catch (error) {
    console.error('Ошибка при загрузке глобального контента в layout:', error)
  }

  // 3. Извлекаем нужные простые надписи
  const phone = content.contactPhone || 'Ошибка данных'
  const email = content.contactEmail || 'Ошибка данных'
  const slogan = content.headerSlogan || 'Ошибка данных'

  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {/* 4. Передаем данные в Header */}
        <Header />
        <main className="flex-grow">{children}</main>
        {/* 5. Передаем данные в Footer */}
        <Footer />
      </body>
    </html>
  )
}
