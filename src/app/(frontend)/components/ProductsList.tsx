import { sofiaSans } from '@/app/(frontend)/fonts'
import ProductBlock from './ProductBlock'
import { getPayload } from 'payload'
import config from './../../../../src/payload.config'
import { Payload } from 'payload'
import { Product } from '@/payload-types' // Предполагаем, что у вас есть тип Product

// Базовый URL для сборки полных URL изображений
const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3030' // Ваш Payload CMS

/**
 * Серверный Компонент для отображения списка товаров.
 * Получает данные напрямую из Payload CMS (MongoDB).
 */
export default async function ProductsList() {
  // Используем тип Product из сгенерированного файла
  let products: Product[] = []
  let payload: Payload | null = null

  // 1. Инициализация Payload и получение данных
  try {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })

    const productsData = await payload.find({
      collection: 'products',
      // Получаем все товары, которые отмечены для показа на главной странице
      where: {
        showOnHomepage: {
          equals: true,
        },
      },
      limit: 100, // Устанавливаем разумный лимит
      depth: 2, // Включаем связанные медиа-объекты (images, leaves) для получения URL
    })

    // 2. Обработка данных
    products = productsData.docs as Product[]
  } catch (error) {
    console.error('Ошибка при получении списка товаров из Payload CMS:', error)
    // Если база данных недоступна, список останется пустым, и мы покажем сообщение
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-700">На жаль, товари наразі відсутні.</h2>
        <p className="text-gray-500 mt-2">
          Перевірте підключення до бази даних або додайте товари в адмін-панелі Payload.
        </p>
      </div>
    )
  }

  //   console.log(products)

  return (
    <>
      <div className="pageTitle">
        <p className="subtitle">АСОРТИМЕНТ СМАКІВ</p>
        <h1 className={sofiaSans.className}>ОБЕРИ СВІЙ УЛЮБЛЕНИЙ СМАК</h1>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '40px', // Добавим немного пространства между блоками
          justifyItems: 'center',
          padding: '20px 0',
        }}
      >
        {products.map((product) => {
          // Поскольку Payload теперь возвращает нам сгенерированный тип (Product),
          // мы можем использовать его для более безопасной проверки.

          // Извлекаем URL изображения и фонового элемента, используя PAYLOAD_BASE_URL
          // Проверяем, что поле image существует и является объектом (а не ID)
          const firstImage = product.images?.[0]?.image

          const imageUrl =
            typeof firstImage === 'object' && firstImage?.url
              ? `${PAYLOAD_BASE_URL}${firstImage.url}`
              : '/placeholder-image.png' // Заглушка, если нет изображения

          // Проверяем, что поле leaves существует и является объектом (а не ID)
          const leavesUrl =
            typeof product.leaves === 'object' && product.leaves?.url
              ? `${PAYLOAD_BASE_URL}${product.leaves.url}`
              : '/apple-front-opti.png' // Заглушка

          // --- ИСПРАВЛЕНИЕ: Гарантируем, что slug, subtitle и blockColor являются строками ---
          const safeSlug = product.slug ?? product.id.toString()
          const safeSubtitle = product.subtitle ?? ''
          const safeBlockColor = product.blockColor ?? '#f8a616' // Запасной цвет

          return (
            <ProductBlock
              key={product.slug}
              id={product.id as string} // ID, который теперь является string
              title={product.title}
              subtitle={safeSubtitle}
              // Передаем полные, готовые URL
              image={imageUrl}
              leaves={leavesUrl}
              price={product.price}
              blockColor={safeBlockColor}
              slug={safeSlug} // Добавляем slug для навигации
            />
          )
        })}
      </div>
    </>
  )
}
