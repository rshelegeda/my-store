// fonts.js - ОПТИМИЗИРОВАННАЯ ВЕРСИЯ

import { Sofia_Sans } from 'next/font/google'
import { Montserrat_Alternates } from 'next/font/google'

// Разделяем шрифты по весам
export const montserratAlternatesBold = Montserrat_Alternates({
  weight: '700', // ← ТОЛЬКО bold для LCP
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: false,
})

export const montserratAlternatesRegular = Montserrat_Alternates({
  weight: '500',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: false, // ← БЕЗ предзагрузки
})

// Sofia Sans тоже отключите preload если не в LCP
export const sofiaSans = Sofia_Sans({
  weight: '900',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: false, // ← БЕЗ предзагрузки
})
