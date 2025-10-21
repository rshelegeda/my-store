// Этот компонент должен быть клиентским, так как он использует или содержит клиентский компонент ImageCarousel
'use client'

import Image from 'next/image'
import styles from './Gallery.module.css'
import { montserratAlternates } from '@/app/(frontend)/fonts'

// Импортируем компонент Карусели
import ImageCarousel from './ImageCarousel'

// 1. ИМПОРТ ТИПОВ
import type { GalleryImage, Media } from '../../../../payload-types' // Проверьте путь!

// 2. ОБНОВЛЕННЫЙ ИНТЕРФЕЙС PROP-ов
interface GalleryProps {
  // Используйте тип, который вы получаете из page.tsx
  images: (GalleryImage & { image: Media })[]
}

// 3. ОБНОВЛЕНИЕ КОМПОНЕНТА ДЛЯ ИСПОЛЬЗОВАНИЯ СЕТКИ И КАРУСЕЛИ
export default function Gallery({ images }: GalleryProps) {
  return (
    <section className={styles.gallerySection}>
      {' '}
      <div className="pageTitle">
        <h1 className={montserratAlternates.className}>Наша галерея</h1>{' '}
      </div>
      <div className={styles.carouselBlock}>
        <ImageCarousel images={images} />
      </div>
    </section>
  )
}
