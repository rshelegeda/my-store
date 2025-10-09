// ProductsList.tsx

import { montserratAlternates } from '@/app/(frontend)/fonts'
import ProductBlock from './ProductBlock'
import { getPayload } from 'payload'
import config from './../../../../src/payload.config'
import { Payload } from 'payload'
import { Product } from '@/payload-types'
import styles from './ProductsList.module.css'

// Удалена константа PAYLOAD_BASE_URL — она больше не нужна, т.к. Payload
// уже генерирует полный URL на сервере.

/**
 * Серверный Компонент для отображения списка товаров.
 */
export default async function ProductsList() {
  let products: Product[] = []
  let payload: Payload | null = null

  // 1. Инициализация Payload и получение данных
  try {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
    const productsData = await payload.find({
      collection: 'products',
      where: {
        showOnHomepage: {
          equals: true,
        },
      },
      sort: 'sortOrder',
      limit: 100,
      depth: 2,
    })

    products = productsData.docs as Product[]
  } catch (error) {
    console.error('Ошибка при получении списка товаров из Payload CMS:', error)
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

  return (
    <div className={styles.productsContainer}>
      <div className={styles.pageTitle}>
        <p className={styles.subtitle}>АСОРТИМЕНТ СМАКІВ</p>
        <h1 className={montserratAlternates.className}>ОБЕРИ СВІЙ УЛЮБЛЕНИЙ СМАК</h1>
      </div>

      <div className={styles.productsGrid}>
        {products.map((product) => {
          const firstImage = product.images?.[0]?.image

          // ИСПРАВЛЕНИЕ: Передаем ЧИСТЫЙ URL, который уже сгенерировал Payload (с полным префиксом)
          const imageUrl =
            typeof firstImage === 'object' && firstImage?.url
              ? firstImage.url // <-- УДАЛЕНО: ${PAYLOAD_BASE_URL}
              : '/placeholder-image.png'

          const leavesUrl =
            typeof product.leaves === 'object' && product.leaves?.url
              ? product.leaves.url // <-- УДАЛЕНО: ${PAYLOAD_BASE_URL}
              : '/apple-front-opti.png'

          const safeSlug = product.slug ?? product.id.toString()
          const safeSubtitle = product.subtitle ?? ''
          const safeBlockColor = product.blockColor ?? '#f8a616'

          return (
            <ProductBlock
              key={safeSlug}
              id={product.id as string}
              title={product.title}
              subtitle={safeSubtitle}
              image={imageUrl}
              leaves={leavesUrl}
              price={product.price}
              blockColor={safeBlockColor}
              slug={safeSlug}
            />
          )
        })}
      </div>
    </div>
  )
}
