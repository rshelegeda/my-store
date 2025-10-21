import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import styles from './ImageCarousel.module.css'

// Импорт типов, как и в исходном компоненте Gallery.tsx
import type { GalleryImage, Media } from '../../../../payload-types'

// Константа для интервала автоматического переключения (5 секунд)
const AUTOPLAY_INTERVAL = 5000

interface ImageCarouselProps {
  // Используем ту же структуру данных, что и в Gallery
  images: (GalleryImage & { image: Media })[]
}

/**
 * Клиентский компонент, отображающий изображения в виде простой карусели,
 * с поддержкой автопрокрутки и свайпов.
 */
export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  // Состояние для отслеживания начальной точки касания (для свайпов)
  const [touchStart, setTouchStart] = useState(0)

  // Ref для контейнера, чтобы отслеживать события мыши/касания
  const carouselRef = useRef<HTMLDivElement>(null)

  // Фильтруем некорректные данные, чтобы избежать ошибок
  const validImages = images.filter(
    (item) => item.image && typeof item.image === 'object' && item.image.url,
  ) as (GalleryImage & { image: Media })[]

  const totalImages = validImages.length

  if (totalImages === 0) {
    return <div className={styles.empty}>Галерея не содержит изображений.</div>
  }

  // --- ЛОГИКА ПЕРЕКЛЮЧЕНИЯ СЛАЙДОВ ---

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalImages - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalImages - 1 ? 0 : prevIndex + 1))
  }

  // --- AUTOPLAY: Автоматическое переключение слайдов ---
  //   useEffect(() => {
  //     // Устанавливаем таймер для переключения на следующий слайд
  //     const timer = setInterval(() => {
  //       // Автоматически переключаемся только если пользователь не навел курсор на карусель
  //       if (carouselRef.current && !carouselRef.current.matches(':hover')) {
  //         goToNext()
  //       }
  //     }, AUTOPLAY_INTERVAL)

  //     // Очистка таймера при размонтировании компонента
  //     return () => clearInterval(timer)
  //   }, [totalImages]) // Зависимости: чтобы пересчитать интервал при изменении количества изображений

  // --- ОБРАБОТКА СВАЙПОВ ---
  const handleTouchStart = (e: React.TouchEvent) => {
    // Сохраняем начальную позицию X при первом касании
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    // Предотвращаем прокрутку страницы при горизонтальном свайпе,
    // чтобы свайп работал только для карусели
    e.stopPropagation()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Получаем конечную позицию X
    const touchEnd = e.changedTouches[0].clientX
    // Определяем разницу
    const difference = touchStart - touchEnd

    // Если свайп влево (разница положительная) и достаточно длинный
    if (difference > 50) {
      goToNext()
    }
    // Если свайп вправо (разница отрицательная) и достаточно длинный
    else if (difference < -50) {
      goToPrevious()
    }
  }

  // Получаем текущее изображение
  const currentImageItem = validImages[currentIndex]

  // 🛑 НОВАЯ ПРОВЕРКА ДЛЯ ИЗБЕЖАНИЯ ОШИБКИ TYPESCRIPT (TS2322)
  if (!currentImageItem.image.url) {
    // Это должно быть невозможно после фильтрации, но это необходимо для удовлетворения TypeScript
    return <div className={styles.empty}>Ошибка: URL текущего изображения отсутствует.</div>
  }
  // -------------------------------------------------------------

  return (
    <div
      className={styles.carouselContainer}
      ref={carouselRef}
      // Добавляем обработчики для свайпов
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* -------------------- БЛОК ИЗОБРАЖЕНИЯ -------------------- */}
      <div className={styles.carouselImageWrapper}>
        <Image
          // ⚠️ Теперь TypeScript уверен, что currentImageItem.image.url - это string
          src={currentImageItem.image.url}
          alt={
            currentImageItem.altText ||
            currentImageItem.image.alt ||
            `Галерея фото ${currentIndex + 1}`
          }
          fill
          sizes="(max-width: 768px) 90vw, 60vw"
          style={{ objectFit: 'cover' }}
          className={styles.img}
          // Добавляем атрибут key для принудительного перемонтирования/обновления
          // Это можно использовать для более сложной CSS-анимации, но пока оставим для простоты
          key={currentIndex}
        />
        {/* Отображение текста подписи, если он есть */}
      </div>

      {/* -------------------- ЭЛЕМЕНТЫ УПРАВЛЕНИЯ -------------------- */}

      {/* Кнопки Навигации */}
      <button
        onClick={goToPrevious}
        className={`${styles.navButton} ${styles.prevButton}`}
        aria-label="Предыдущее изображение"
      >
        &#10094;
      </button>

      <button
        onClick={goToNext}
        className={`${styles.navButton} ${styles.nextButton}`}
        aria-label="Следующее изображение"
      >
        &#10095;
      </button>

      {/* Индикаторы (Точки) */}
      <div className={styles.dotsContainer}>
        {validImages.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Перейти к изображению ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
