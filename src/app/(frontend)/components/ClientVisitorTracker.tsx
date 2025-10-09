'use client'

import React, { useEffect } from 'react'

/**
 * ClientVisitorTracker
 * Этот компонент отвечает за отправку запроса на серверный API-маршрут /api/track-ip,
 * который выполняет всю логику проверки IP и инкремента счетчика в MongoDB (Payload CMS).
 * Запускается только один раз при монтировании компонента.
 */
export default function ClientVisitorTracker() {
  useEffect(() => {
    // Вызываем API-маршрут. Мы не ждем ответа, так как это фоновая задача.
    // Если произойдет ошибка, она будет обработана в консоли сервера Route Handler.
    fetch('/api/track-ip').catch((error) => {
      // Логируем ошибку только на клиенте, не ломая интерфейс
      console.error('Failed to call visitor tracking API:', error)
    })
  }, []) // Пустой массив зависимостей гарантирует, что эффект сработает только один раз.

  // Компонент ничего не рендерит, его цель — выполнить побочный эффект (вызов API).
  return null
}
