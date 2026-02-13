// src/utils/payload-api.ts

import { getPayload } from 'payload'
import config from '@/payload.config'
import { PageContent } from '../payload-types'
import { unstable_cache } from 'next/cache'

export const getPageContent = unstable_cache(
  async (): Promise<PageContent> => {
    const payloadConfig = await config
    const initializedPayload = await getPayload({ config: payloadConfig })

    const data = await initializedPayload.findGlobal({
      slug: 'page-content',
      depth: 1,
    } as any)

    return data as PageContent
  },
  ['global-page-content'], // Уникальный ключ
  {
    revalidate: 360, // Данные обновляются раз 6 минут (360 секунд)
    tags: ['page-content'],
  },
)

// 13 02 2026
// import { getPayload } from 'payload'
// import config from '@/payload.config'
// import { PageContent } from '../payload-types'

// /**
//  * Получает весь контент из глобальной коллекции 'page-content'.
//  * Использует прямой доступ к Payload CMS и возвращает строго типизированный объект.
//  */
// export async function getPageContent(): Promise<PageContent> {
//   // 🌟 Используем PageContent напрямую
//   const payloadConfig = await config
//   const initializedPayload = await getPayload({ config: payloadConfig })

//   // Получаем данные, явно указывая depth: 1 для resolution медиа-полей
//   const data = await initializedPayload.findGlobal({
//     slug: 'page-content',
//     depth: 1,
//   } as any)

//   // Явно приводим результат к строгому типу PageContent
//   return data as PageContent
// }
