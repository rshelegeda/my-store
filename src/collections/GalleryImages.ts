// src/collections/GalleryImages.ts

import { CollectionConfig } from 'payload'

export const GalleryImages: CollectionConfig = {
  // Название коллекции, которое будет использоваться в API и админке
  slug: 'gallery-images',
  labels: {
    singular: 'Галерея',
    plural: 'Галерея',
  },
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
        description: 'Введить число для визначення порядку: меньше число = вишче у списку.',
      },
      // УДАЛИТЕ СТРОКУ НИЖЕ, ОНА НЕ НУЖНА И ВЫЗЫВАЕТ ОШИБКУ ТИПИЗАЦИИ:
      // saveToDatabase: true, // <-- Эту строку нужно удалить
      required: false,
    },
    {
      name: 'image',
      label: 'Зображення',
      type: 'upload', // Тип "upload" для связи с коллекцией Media
      relationTo: 'media', // Ссылка на вашу коллекцию Media
      required: true,
    },
    {
      name: 'altText',
      label: 'Альтернативний текст (для SEO)',
      type: 'text',
      required: false,
    },
    {
      // Поле, определяющее, будет ли изображение "высоким" (tallImage)
      name: 'isTall',
      label: 'Зробить зображення високим (Tall Image)',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  // Добавляем хук для автоматической сортировки при запросе
  defaultSort: 'sortOrder',
}
