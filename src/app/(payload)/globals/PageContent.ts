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
      name: 'visitorCount',
      label: 'Счетчик просмотров страниц',
      type: 'number',
      defaultValue: 0,
      admin: {
        // Разрешаем только чтение в админке, чтобы избежать случайного изменения
        readOnly: true,
      },
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
