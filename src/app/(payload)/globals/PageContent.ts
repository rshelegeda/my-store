// src/payload/globals/PageContent.ts
// Для хранения глобальных переменных (Описания, контакты и т.д.)

import { GlobalConfig } from 'payload'

export const PageContent: GlobalConfig = {
  slug: 'page-content',
  label: 'Контент Страниц и Контакты',
  // ... access
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

    // --- ПОЛЯ ДЛЯ СЧЕТЧИКА ПОСЕЩЕНИЙ ---
    {
      name: 'visitorCount',
      label: 'Счетчик уникальных посетителей',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true, // Запрещаем ручное редактирование через админку
      },
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
