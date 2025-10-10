import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config' // Путь к вашему конфигурационному файлу Payload CMS

/**
 * Обрабатывает запрос GET для увеличения счетчика просмотров в глобальном контенте Payload CMS.
 * Использует прямой доступ к Payload CMS (getPayload) для максимальной надежности,
 * избегая внешних HTTP-запросов (fetch) и проблем с PAYLOAD_URL/CORS.
 */
export async function GET(request: Request) {
  try {
    // Инициализация Payload CMS (как в серверных компонентах)
    const payload = await getPayload({ config })

    // 1. Получаем текущее значение глобального контента
    // Используем findGlobal для получения актуального объекта
    const currentContent = await payload.findGlobal({
      slug: 'page-content',
    })

    // Используем 0, если поле еще не существует
    const currentCount = currentContent.visitorCount || 0
    const newCount = currentCount + 1

    // 2. Обновляем глобальный контент (инкремент visitorCount)
    // Используем updateGlobal для обновления
    await payload.updateGlobal({
      slug: 'page-content',
      data: {
        visitorCount: newCount,
      },
    })

    console.log(`[Payload API] Visitor count successfully incremented to: ${newCount}`)
    return NextResponse.json({ success: true, newCount })
  } catch (error) {
    // Теперь ошибка будет приходить от Payload CMS/MongoDB
    console.error('API: Fatal Error in visitor tracking (Payload Client):', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error during Payload operation' },
      { status: 500 },
    )
  }
}
