// src/collections/GalleryImages.ts

import { CollectionConfig } from 'payload'

export const GalleryImages: CollectionConfig = {
  // Название коллекции, которое будет использоваться в API и админке
  slug: 'gallery-images',
  // Разрешаем только чтение, чтобы избежать прямого доступа к API
  access: {
    read: () => true,
    delete: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
  },
  // Включите драфты, если планируете модерацию, но для простоты опустим
  // versions: {
  //   drafts: true,
  // },
  fields: [
    {
      name: 'sortOrder',
      label: 'Порядок сортировки',
      type: 'number',
      admin: {
        description: 'Введите число для определения порядка: меньшее число = выше в списке.',
      },
      // УДАЛИТЕ СТРОКУ НИЖЕ, ОНА НЕ НУЖНА И ВЫЗЫВАЕТ ОШИБКУ ТИПИЗАЦИИ:
      // saveToDatabase: true, // <-- Эту строку нужно удалить
      required: false,
    },
    {
      name: 'image',
      label: 'Изображение',
      type: 'upload', // Тип "upload" для связи с коллекцией Media
      relationTo: 'media', // Ссылка на вашу коллекцию Media
      required: true,
    },
    {
      name: 'altText',
      label: 'Альтернативный текст (для SEO)',
      type: 'text',
      required: false,
    },
    {
      // Поле, определяющее, будет ли изображение "высоким" (tallImage)
      name: 'isTall',
      label: 'Сделать изображение высоким (Tall Image)',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  // Добавляем хук для автоматической сортировки при запросе
  defaultSort: 'sortOrder',
}
