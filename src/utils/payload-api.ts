// src/utils/payload-api.ts

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getPageContent() {
  const payloadConfig = await config
  const initializedPayload = await getPayload({ config: payloadConfig })

  const data = await initializedPayload.findGlobal({
    slug: 'page-content',
  } as any)

  // Возвращает объект { contactPhone: '...', contactEmail: '...', ... }
  return data
}
