// src/app/api/send-order/route.js
import { NextResponse } from 'next/server'

// Получаем переменные окружения, которые хранят токен и ID чата
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

// Функция для форматирования данных заказа в сообщение Telegram (использует MarkdownV2)
function formatOrderMessage(orderData) {
  // Экранируем специальные символы MarkdownV2
  const escapeMarkdown = (text) => text.replace(/([\_*\[\]()~`>#+\-=|{}.!])/g, '\\$1')

  // Форматируем список товаров
  let itemsList = ''
  if (orderData.items && orderData.items.length > 0) {
    itemsList = orderData.items
      .map((item) => {
        const title = escapeMarkdown(item.title || 'Товар без названия')
        const quantity = item.quantity || 1
        const price = item.price || 0
        return `— ${title} \\(${quantity} шт\\.\\) @ ${escapeMarkdown(String(price))}`
      })
      .join('\n')
  } else {
    itemsList = 'Список порожній'
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
*Коментар: *${orderData.comment}
  `
  return message
}

export async function POST(request) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Telegram API keys missing!')
    return NextResponse.json({ message: 'Telegram API keys missing' }, { status: 500 })
  }

  try {
    const orderData = await request.json()

    // Форматируем сообщение
    const telegramMessage = formatOrderMessage(orderData)

    // API-эндпоинт Telegram для отправки сообщения
    const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage,
        parse_mode: 'MarkdownV2', // Используем Markdown V2 для надежного форматирования
      }),
    })

    const data = await response.json()

    if (!response.ok || !data.ok) {
      console.error('Telegram API error:', data)
      return NextResponse.json(
        { message: 'Failed to send to Telegram', details: data },
        { status: 500 },
      )
    }

    return NextResponse.json({ message: 'Order sent to Telegram successfully' })
  } catch (error) {
    console.error('Processing order error:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
