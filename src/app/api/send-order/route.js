import { NextResponse } from 'next/server'

// Получаем переменные окружения, которые хранят токен и ID чата
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID
const CHAT_ID_2 = process.env.TELEGRAM_CHAT_ID_2
const CHAT_ID_3 = process.env.TELEGRAM_CHAT_ID_3

/**
 * Экранирует специальные символы MarkdownV2
 * @param {string} text
 */
const escapeMarkdown = (text) => (text || '').replace(/([\_*\[\]()~`>#+\-=|{}.!])/g, '\\$1')

/**
 * Форматирует данные заказа в сообщение Telegram (использует MarkdownV2)
 * @param {object} orderData - Данные заказа
 * @returns {string} Отформатированное сообщение
 */
function formatOrderMessage(orderData) {
  // Форматируем список товаров
  let itemsList = ''
  if (orderData.items && orderData.items.length > 0) {
    itemsList = orderData.items
      .map((item) => {
        const title = escapeMarkdown(item.title || 'Товар без названия')
        const quantity = item.quantity || 1
        const price = item.price || 0
        return `— ${title} \\(${quantity} шт\\.\\) ціна: ${escapeMarkdown(String(price))} грн`
      })
      .join('\n')
  } else {
    itemsList = escapeMarkdown('Список порожній')
  }

  // Общая сумма
  const totalPrice = orderData.totalPrice ? escapeMarkdown(String(orderData.totalPrice)) : 'Н/Д'

  // Собираем сообщение
  const message = `
*НОВИЙ ЗАКАЗ В МАГАЗИНІ\\!* 🛒

*Контакти клієнта:*
Ім'я: ${escapeMarkdown(orderData.name || 'Н/Д')}
Телефон: ${escapeMarkdown(orderData.phone || 'Н/Д')}
Адреса, Нова пошта: ${escapeMarkdown(orderData.address || 'Н/Д')}

*Склад замовлення:*
${itemsList}

*СУМА:* ${totalPrice} грн\\.
*Коментар: *${escapeMarkdown(orderData.comment || 'Відсутній')}
  `
  return message
}

/**
 * Отправляет форматированное сообщение в один указанный чат
 * @param {string} chatId - ID чата Telegram
 * @param {string} message - Сообщение, отформатированное в MarkdownV2
 * @returns {Promise<boolean>} Успешно ли отправлено сообщение
 */
async function sendTelegramMessage(chatId, message) {
  if (!chatId) {
    return false
  }

  const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

  try {
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'MarkdownV2',
      }),
    })

    const data = await response.json()

    if (!response.ok || !data.ok) {
      console.error(`Telegram API error for chat ${chatId}:`, data)
      return false
    }

    console.log(`Order successfully sent to chat ${chatId}.`)
    return true
  } catch (error) {
    console.error(`Error sending message to chat ${chatId}:`, error)
    return false
  }
}

export async function POST(request) {
  if (!BOT_TOKEN) {
    console.error('Telegram BOT_TOKEN is missing!')
    return NextResponse.json({ message: 'Telegram BOT_TOKEN is missing' }, { status: 500 })
  }

  // 1. Собираем все доступные ID чатов в массив
  const chatIds = [CHAT_ID, CHAT_ID_2, CHAT_ID_3].filter(Boolean)

  if (chatIds.length === 0) {
    console.error('No Telegram CHAT_IDs are configured!')
    return NextResponse.json({ message: 'No Telegram CHAT_IDs are configured' }, { status: 500 })
  }

  try {
    const orderData = await request.json()

    // Форматируем сообщение один раз
    const telegramMessage = formatOrderMessage(orderData)

    // 2. Отправляем сообщение параллельно во все чаты
    const sendPromises = chatIds.map((id) => sendTelegramMessage(id, telegramMessage))
    const results = await Promise.all(sendPromises)

    // 3. Проверяем результаты
    const successfulSends = results.filter((r) => r).length
    const failedChats = chatIds.filter((_, index) => !results[index])

    if (successfulSends === 0) {
      // Если не удалось отправить ни в один чат
      console.error('Failed to send order to ALL configured Telegram chats.')
      return NextResponse.json(
        { message: 'Failed to send to Telegram completely', failedChats: failedChats },
        { status: 500 },
      )
    }

    if (failedChats.length > 0) {
      // Если хотя бы в один чат отправлено успешно, но есть ошибки в других
      console.warn(
        `Order successfully sent to ${successfulSends} chats, but failed for: ${failedChats.join(', ')}`,
      )
      // Возвращаем 200 OK, так как заказ доставлен хотя бы одному получателю
      return NextResponse.json({
        message: 'Order sent successfully, but with partial failures',
        failedChats: failedChats,
      })
    }

    // Успешная отправка во все чаты
    return NextResponse.json({ message: 'Order sent to all Telegram chats successfully' })
  } catch (error) {
    console.error('Processing order or JSON parsing error:', error)
    return NextResponse.json(
      { message: 'Internal Server Error during processing' },
      { status: 500 },
    )
  }
}
