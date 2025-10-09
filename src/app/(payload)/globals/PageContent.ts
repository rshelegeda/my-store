// src/payload/globals/PageContent.ts
// Для хранения глобальных переменных (Описания, контакты и т.д.)

import { GlobalConfig } from 'payload'

export const PageContent: GlobalConfig = {
  slug: 'page-content',
  label: 'Контент Страниц и Контакты',
  access: {
    read: () => true, // Разрешает любому (включая наш API) ЧТЕНИЕ счетчика
    update: () => true, // Разрешает любому (включая наш API) ОБНОВЛЕНИЕ счетчика
  },
  fields: [
    {
      name: 'contactPhone',
      label: 'Номер телефона (шапка/футер)',
      type: 'text',
    },
    {
      name: 'contactEmail',
      label: 'Email для связи',
      type: 'email',
    },

    {
      name: 'visitIps',
      label: 'Логи посещений по IP (для защиты от накрутки)',
      type: 'array',
      localized: false, // Это технические данные, локализация не нужна
      admin: {
        description:
          'Массив IP-адресов с временем последнего посещения. Записи старше 1 часа будут удаляться при помощи Route Handler Next.js.',
        readOnly: true, // Запрещаем ручное редактирование
      },
      fields: [
        {
          name: 'ip',
          label: 'IP-адрес',
          type: 'text',
        },
        {
          name: 'time',
          label: 'Время последнего посещения (Timestamp)',
          type: 'number',
        },
      ],
    },
    // --- КОНЕЦ ПОЛЕЙ ДЛЯ СЧЕТЧИКА ---

    // Если вы использовали 'headerSlogan', убедитесь, что он тоже здесь
    // {
    //   name: 'headerSlogan',
    //   label: 'Слоган в шапке',
    //   type: 'text',
    // },
    // ... (добавьте другие простые поля, если нужно)
  ],
}
