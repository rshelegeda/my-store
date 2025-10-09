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
    // Если вы использовали 'headerSlogan', убедитесь, что он тоже здесь
    // {
    //   name: 'headerSlogan',
    //   label: 'Слоган в шапке',
    //   type: 'text',
    // },
    // ... (добавьте другие простые поля, если нужно)
  ],
}
