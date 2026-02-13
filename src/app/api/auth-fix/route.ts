import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
  try {
    const payload = await getPayload({ config: await config })

    // Обновляем именно вашего пользователя
    await payload.update({
      collection: 'users',
      where: {
        email: { equals: 'rshelegeda@ukr.net' },
      },
      data: {
        password: 'AdminPassword2026!',
        loginAttempts: 0,
        sessions: [], // Очищаем старые сессии
      },
    })

    return new Response('Пароль обновлен на: AdminPassword2026! Попробуйте войти через Инкогнито.')
  } catch (err: any) {
    return new Response(`Ошибка доступа к БД: ${err.message}`)
  }
}
