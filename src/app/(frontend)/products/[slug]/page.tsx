// products/[slug]/page.tsx

import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { sofiaSans } from '../../fonts'
import styles from './ProductPage.module.css'

// Используем тот же базовый URL для Payload
const PAYLOAD_BASE_URL = 'http://localhost:3030'

// Тип для параметров, которые Next.js передает в динамический маршрут
type Props = {
  params: {
    slug: string
  }
}

// Server Component для отображения детальной страницы
export default async function ProductDetailPage({ params }: Props) {
  // ИСПРАВЛЕНИЕ: Деструктурируем slug из params.
  // Добавление "await" для гарантии асинхронного извлечения и устранения ошибки синхронизации Next.js.
  const { slug: productSlug } = await params // 1. Инициализация Payload

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let product: any = null // 2. Получение данных одного товара по SLUG

  try {
    const productData = await payload.find({
      collection: 'products',
      limit: 1,
      depth: 2,
      where: {
        // Ищем товар, у которого поле 'slug' совпадает с параметром из URL
        slug: {
          equals: productSlug,
        },
      },
    }) // Берем первый (и единственный) документ

    product = productData.docs[0]
  } catch (error) {
    console.error('Ошибка при получении детальной информации о товаре:', error) // Обработка ошибки
  } // Если товар не найден (404)

  if (!product) {
    return (
      <div className={styles.container}>
        {' '}
        <div className={styles.notFound}>
          <h1>Товар не знайдено</h1>{' '}
          <Link href="/" className={styles.backButton}>
            ← Назад до головної{' '}
          </Link>{' '}
        </div>{' '}
      </div>
    )
  }

  //   console.log(product)

  // 3. Подготовка данных для отображения
  // Безопасное формирование URL для основного изображения

  const relativeUrl = product?.images?.[0]?.image?.url
  const imageUrl = relativeUrl ? `${PAYLOAD_BASE_URL}${relativeUrl}` : null // Безопасное формирование URL для изображения лиcтвы

  const leavesRelativeUrl = product?.leaves?.url
  const leavesUrl = leavesRelativeUrl ? `${PAYLOAD_BASE_URL}${leavesRelativeUrl}` : null

  return (
    <div className={styles.container}>
      {' '}
      <Link href="/" className={styles.backButton}>
        ← Назад до головної{' '}
      </Link>{' '}
      <div className={styles.productContainer}>
        {' '}
        <div className={styles.imageSection}>
          {' '}
          <div className={styles.productBlock}>
            {/* Условный рендеринг лиcтвы: рендерим только если leavesUrl существует */}{' '}
            {leavesUrl && (
              <Image // Приведение типа (as string), так как в условии мы проверили, что это не null
                src={leavesUrl as string}
                alt={product.leaves.alt || 'Листва'}
                width={260}
                height={260}
                className={styles.leaves}
              />
            )}{' '}
            {imageUrl && (
              <Image
                src={imageUrl as string}
                alt={product.title}
                width={180}
                height={360}
                className={styles.bottle}
              />
            )}{' '}
            <div className={styles.infoBox} style={{ backgroundColor: product.blockColor }}>
              <h2>{product.title}</h2> <p>{product.price} грн.</p>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
        <div className={styles.infoSection}>
          <h1 className={`${styles.title} ${sofiaSans.className}`}>{product.title}</h1>
          <p className={styles.subtitle}>{product.subtitle}</p>{' '}
          <div className={styles.price}>{product.price} грн.</div>{' '}
          <div className={styles.description}>
            <h3>Опис</h3>
            <p>{product.description}</p>{' '}
          </div>{' '}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className={styles.buyButton}>Додати до кошика</button>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  )
}

// Функции Next.js для генерации статических маршрутов (SSR/SSG)
// Позволяет Next.js знать, какие страницы генерировать при сборке
export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const products = await payload.find({
    collection: 'products',
    limit: 100, // Получаем все товары для генерации маршрутов
    depth: 0,
  })

  return products.docs.map((product) => ({
    slug: product.slug,
  }))
}

// Задаем метаданные для конкретной страницы
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ИСПРАВЛЕНИЕ: Деструктурируем slug из params. Добавление "await" для устранения ошибки синхронизации.
  const { slug: productSlug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const productData = await payload.find({
    collection: 'products',
    limit: 1,
    where: { slug: { equals: productSlug } },
  })

  const product = productData.docs[0]

  if (!product) {
    return {
      title: 'Товар не найден',
    }
  }

  return {
    title: product.title,
    description: `Купить ${product.title} за ${product.price} грн.`,
  }
}
