import { NextResponse } from 'next/server'

// Используем переменную окружения для URL Payload
const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL
// ВАЖНО: Ключ API нужен, если ваш Payload требует авторизации для обновления globals
const API_KEY = process.env.PAYLOAD_API_KEY || ''

/**
 * Обрабатывает запрос GET для увеличения счетчика просмотров в глобальном контенте Payload CMS.
 * При каждом вызове инкрементирует 'visitorCount' на 1.
 */
export async function GET(request: Request) {
  try {
    // 1. Получаем текущее значение глобального контента
    // Используем 'no-store', чтобы гарантировать получение актуальных данных счетчика
    const contentRes = await fetch(`${PAYLOAD_URL}/api/globals/page-content`, {
      method: 'GET',
      cache: 'no-store',
    })

    if (!contentRes.ok) {
      console.error('API: Failed to fetch current global content.', contentRes.status)
      return NextResponse.json(
        { success: false, message: 'Failed to fetch global content' },
        { status: 500 },
      )
    }

    const currentContent = await contentRes.json()
    // Используем 0, если поле еще не существует
    const currentCount = currentContent.visitorCount || 0
    const newCount = currentCount + 1

    // 2. Обновляем глобальный контент (инкремент visitorCount)
    const updateRes = await fetch(`${PAYLOAD_URL}/api/globals/page-content`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Если ваш Payload защищен, раскомментируйте эту строку:
        // 'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        visitorCount: newCount,
      }),
      cache: 'no-store',
    })

    if (!updateRes.ok) {
      console.error('API: Failed to update visitor count.', updateRes.status)
      return NextResponse.json(
        { success: false, message: 'Failed to update count' },
        { status: 500 },
      )
    }

    console.log(`Visitor count incremented to: ${newCount}`)
    return NextResponse.json({ success: true, newCount })
  } catch (error) {
    console.error('API: Error in visitor tracking:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
