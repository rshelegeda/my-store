// 'use client' - Обязателен для использования хуков и useEffect
'use client'

import { useEffect } from 'react'

/**
 * Компонент-трекер, вызывающий серверный API для инкремента счетчика
 * при загрузке страницы. Используется только на клиенте.
 */
export default function ClientVisitorTracker() {
  useEffect(() => {
    // Вызов API происходит только один раз, при монтировании компонента (загрузке страницы)
    const trackVisit = async () => {
      try {
        // Вызываем наш простой API-маршрут для инкремента visitorCount
        await fetch('/api/track-visit', {
          method: 'GET',
          // Не кэшируем запрос, чтобы он всегда доходил до сервера
          cache: 'no-store',
        })
        // console.log('Счетчик посещений успешно увеличен.');
      } catch (error) {
        console.error('Ошибка при инкременте счетчика посещений:', error)
      }
    }

    trackVisit()
  }, [])

  // Компонент ничего не рендерит
  return null
}
