import { NextResponse, NextRequest } from 'next/server'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL
// Установлено 1 час (3600000 миллисекунд).
const COOLDOWN_MILLIS = 1 * 60 * 60 * 1000
const COOLDOWN_HOURS = 1

/**
 * Описываем ожидаемый формат объекта IP-лога, который должен храниться в Payload CMS.
 * Убедитесь, что в схеме вашей глобальной переменной Payload есть поле
 * 'visitIps' типа Array с вложенными полями 'ip' (Text) и 'time' (Number).
 */
interface VisitLog {
  ip: string
  time: number // Unix timestamp времени последнего посещения
}

/**
 * Хендлер для отслеживания уникальных посещений по IP-адресу.
 * * Логика:
 * 1. Получает IP-адрес пользователя.
 * 2. Получает текущий массив логов и счетчик из Payload CMS.
 * 3. Фильтрует (очищает) массив, удаляя записи старше 1 часа.
 * 4. Проверяет, требуется ли инкремент счетчика для текущего IP.
 * 5. Отправляет PATCH-запрос с обновленным счетчиком и новым массивом логов.
 */
export async function GET(request: NextRequest) {
  // Получение IP-адреса пользователя (используем стандартный заголовок Next.js/Vercel)
  const forwardedFor = request.headers.get('x-forwarded-for')
  // ИСПРАВЛЕНО: Убран request.ip, так как он вызывает ошибку типизации в Next.js Route Handlers.
  // Полагаемся на x-forwarded-for как на самый надежный источник.
  const userIp = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown'

  const currentTime = Date.now()
  let currentCount = 0
  let currentLogs: VisitLog[] = []
  let shouldIncrement = false

  // --- ШАГ 1: Получаем текущее состояние (Счетчик и Массив логов) ---
  try {
    const fetchRes = await fetch(`${PAYLOAD_URL}/api/globals/page-content`, {
      method: 'GET',
      cache: 'no-store', // Обязательно без кеша для актуальности
    })

    if (!fetchRes.ok) {
      console.error(`Failed to fetch current visitor count. Status: ${fetchRes.status}`)
      return NextResponse.json(
        { message: 'Error fetching state.', incremented: false },
        { status: 500 },
      )
    }

    const currentData = await fetchRes.json()
    currentCount = Math.max(0, currentData.visitorCount || 0)
    // Массив может быть null или не существовать. JSON.parse() не требуется, так как Payload возвращает готовый объект.
    currentLogs = ((currentData.visitIps as VisitLog[]) || []).filter(
      (log) => log && log.ip && log.time,
    )
  } catch (error) {
    console.error('Error in visitor tracking: Fetching Payload data failed:', error)
    // Если произошла ошибка при получении данных, мы не инкрементируем счетчик
    return NextResponse.json(
      { message: 'Internal Server Error (Fetch).', incremented: false },
      { status: 500 },
    )
  }

  // --- ШАГ 2: Очистка устаревших записей (Удаляем всё старше 1 часа) ---
  // Мы сохраняем только те записи, для которых не прошел период охлаждения (т.е. они "свежие")
  const freshLogs = currentLogs.filter((log) => {
    return currentTime - log.time < COOLDOWN_MILLIS
  })

  // --- ШАГ 3: Проверка на период охлаждения (1 час) ---
  const existingLogIndex = freshLogs.findIndex((log) => log.ip === userIp)

  if (existingLogIndex === -1) {
    // IP не найден среди "свежих" записей.
    shouldIncrement = true

    // Добавляем новый лог в массив
    freshLogs.push({
      ip: userIp,
      time: currentTime,
    })
  }
  // Если IP найден, должно пройти менее 1 часа. shouldIncrement остается false.

  // --- ШАГ 4: Обновление Payload CMS ---
  if (!shouldIncrement) {
    // Счетчик не увеличивается, просто выходим
    return NextResponse.json({
      message: `IP is in cooldown period (Next increment after ${COOLDOWN_HOURS}h).`,
      incremented: false,
      ip: userIp,
    })
  }

  // Если инкремент нужен
  const newCount = currentCount + 1

  try {
    const updateRes = await fetch(`${PAYLOAD_URL}/api/globals/page-content`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // ВАЖНО: В реальном проекте здесь требуется аутентификация API
      },
      body: JSON.stringify({
        visitorCount: newCount,
        visitIps: freshLogs, // Отправляем очищенный и обновленный массив
      }),
      cache: 'no-store',
    })

    if (!updateRes.ok) {
      throw new Error(`Failed to update visitor count: ${updateRes.statusText}`)
    }

    return NextResponse.json({
      message: 'New unique IP visit tracked and counter incremented.',
      incremented: true,
      newCount,
      ip: userIp,
    })
  } catch (error) {
    console.error('Error in visitor tracking API: Update failed:', error)
    return NextResponse.json(
      { message: 'Internal Server Error (Update).', incremented: false },
      { status: 500 },
    )
  }
}
