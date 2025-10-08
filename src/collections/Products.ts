// Products.ts

import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  // Название, которое будет видно в админке и в API URL
  slug: 'products',
  // Настройки, как это будет отображаться в админке
  labels: {
    singular: 'Товар',
    plural: 'Товари',
  },
  admin: {
    // Используем 'defaultColumns' для указания полей в списке
    defaultColumns: [
      'sortOrder', // Наше новое поле
      'title', // Название товара
      'price',
      'showOnHomepage', // Чекбокс для главной страницы
      'updatedAt', // Время последнего обновления
    ],
  },

  access: {
    // Разрешаем всем читать товары через API
    read: () => true,
  },
  fields: [
    {
      name: 'sortOrder',
      label: 'Порядок сортировки (Sort Order)',
      type: 'number',
      required: false, // Можно сделать необязательным
      admin: {
        position: 'sidebar', // Удобно разместить в сайдбаре
        description: 'Введите число для определения порядка: меньшее число = выше в списке.',
      },
      // Дополнительное поле для индексации
      index: true,
    },

    {
      name: 'title',
      label: 'Назва товару',
      type: 'text',
      required: true,
    },
    // --- НОВОЕ ПОЛЕ: Краткое описание для карточки ---
    {
      name: 'subtitle',
      label: 'Короткий опис (для картки в каталозі)',
      type: 'text',
      admin: {
        description: 'Краткая подпись, которая отобразится в ProductBlock под заголовком.',
      },
    },
    {
      name: 'slug',
      label: 'URL-слаг',
      type: 'text',
      admin: {
        // Заполняется автоматически на основе названия
        description: 'Викорустовується для створення URL адреси товару.',
      },
      // Поставьте `unique: true`, чтобы не было двух одинаковых слагов
      unique: true,
    },
    {
      name: 'description',
      label: 'Опис',
      type: 'text', // Удобный редактор WYSIWYG
    },
    {
      name: 'price',
      label: 'Ціна (грн)',
      type: 'number', // Оставляем 'number' по вашему уточнению
      required: true,
      min: 0,
    },
    // --- НОВОЕ ПОЛЕ: Цвет информационного блока ---
    {
      name: 'blockColor',
      label: 'Колір блоку інформації (HEX-код)',
      type: 'text', // Тип 'text' для хранения HEX-кода, например, #f8a616
      admin: {
        description: 'HEX-код для фонового цвета информационного блока на карточке товара.',
      },
    },
    {
      name: 'images',
      label: 'Фотографії товару',
      type: 'array',
      // Максимальное количество фотографий
      maxRows: 5,
      fields: [
        {
          name: 'image',
          label: 'Зображення',
          type: 'upload',
          // Связываем с коллекцией Media
          relationTo: 'media',
          required: true,
        },
      ],
    },
    // --- НОВОЕ ПОЛЕ: Фоновое изображение для ProductBlock (Leaves) ---
    {
      name: 'leaves',
      label: 'Фоновый элемент (Листва/Узор)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Изображение для стилизации фона, которое будет передано в пропс "leaves" в ProductBlock.',
      },
    },
    // Дополнительное поле для фильтрации на главной странице (как мы обсуждали)
    {
      name: 'showOnHomepage',
      label: 'Дозволити на головній сторінці',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar', // Размещаем в боковой панели
      },
    },
  ],
}
