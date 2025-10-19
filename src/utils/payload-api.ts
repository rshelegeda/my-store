// src/utils/payload-api.ts

import { getPayload } from 'payload'
import config from '@/payload.config'
import { PageContent } from '../payload-types'

/**
 * Получает весь контент из глобальной коллекции 'page-content'.
 * Использует прямой доступ к Payload CMS и возвращает строго типизированный объект.
 */
export async function getPageContent(): Promise<PageContent> {
  // 🌟 Используем PageContent напрямую
  const payloadConfig = await config
  const initializedPayload = await getPayload({ config: payloadConfig })

  // Получаем данные, явно указывая depth: 1 для resolution медиа-полей
  const data = await initializedPayload.findGlobal({
    slug: 'page-content',
    depth: 1,
  } as any)

  // Явно приводим результат к строгому типу PageContent
  return data as PageContent
}
