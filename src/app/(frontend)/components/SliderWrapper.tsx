import React from 'react'
import Slider from '@/app/(frontend)/components/Slider'
import { getPageContent } from '@/utils/payload-api'
import type { Media } from '../../../payload-types'

/**
 * Обертка для Slider (Server Component)
 * Отвечает за загрузку динамических данных из Payload CMS (URL изображения для плаката).
 */
export default async function SliderWrapper() {
  let dynamicPosterPath: string | undefined = undefined
  const defaultPoster = '/about-us-2.jpg' // Замените на путь к вашей статической заглушке

  try {
    const pageContent = await getPageContent()

    // 1. Проверяем, что поле mainHeroImage не пустое и не является строкой (ID)
    if (pageContent.mainHeroImage && typeof pageContent.mainHeroImage !== 'string') {
      // 2. Поскольку мы использовали depth: 1, mainHeroImage - это полный объект Media
      const media = pageContent.mainHeroImage as Media

      // 3. Извлекаем URL, если он существует
      if (media.url) {
        dynamicPosterPath = media.url
      }
    }
  } catch (error) {
    console.error('Ошибка при загрузке динамического плаката из Payload:', error)
    // В случае ошибки оставляем dynamicPosterPath undefined, и будет использована заглушка
  }

  // Передаем полученный (или undefined) путь клиентскому компоненту Slider
  return <Slider dynamicPosterPath={dynamicPosterPath || defaultPoster} />
}
