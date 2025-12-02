// fonts.js - ОПТИМИЗИРОВАННАЯ ВЕРСИЯ

import { Sofia_Sans } from 'next/font/google'
import { Montserrat_Alternates } from 'next/font/google'

// 1. Sofia Sans - отключаем предзагрузку если не используется в LCP
export const sofiaSans = Sofia_Sans({
  weight: '900',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: false, // ← КРИТИЧЕСКИ ВАЖНО
})

// 2. Montserrat Alternates - разделяем на критические и некритические
// КРИТИЧЕСКИЙ шрифт для LCP (только bold 700)
export const montserratAlternatesBold = Montserrat_Alternates({
  weight: '700',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: true, // ← ТОЛЬКО ЭТОТ предзагружаем
})

// НЕКРИТИЧЕСКИЕ веса (без предзагрузки)
export const montserratAlternatesRegular = Montserrat_Alternates({
  weight: '500',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: false, // ← БЕЗ предзагрузки
})

export const montserratAlternatesSemiBold = Montserrat_Alternates({
  weight: '600',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: false, // ← БЕЗ предзагрузки
})

export const montserratAlternatesBlack = Montserrat_Alternates({
  weight: '900',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: false, // ← БЕЗ предзагрузки
})

// Экспортируем с правильными именами
export const montserratAlternates = Montserrat_Alternates({
  weight: ['500', '600', '700', '900'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})
